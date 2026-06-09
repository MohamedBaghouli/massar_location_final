process.env.DATABASE_URL ||= "file:./dev.db";

const { PrismaClient } = await import("@prisma/client");

const prisma = new PrismaClient();

const firstNames = [
  "Ahmed",
  "Sami",
  "Yassine",
  "Nour",
  "Mouna",
  "Leila",
  "Karim",
  "Amina",
  "Walid",
  "Salma",
];

const lastNames = [
  "Ben Ali",
  "Trabelsi",
  "Mansouri",
  "Jebali",
  "Karray",
  "Sassi",
  "Haddad",
  "Mejri",
  "Gharbi",
  "Ayari",
];

const addresses = [
  "Tunis",
  "Ariana",
  "Ben Arous",
  "La Marsa",
  "Sousse",
  "Monastir",
  "Sfax",
  "Nabeul",
  "Bizerte",
  "Hammamet",
];

const cars = [
  ["Renault", "Clio", "Essence", "Manuelle", 95],
  ["Peugeot", "208", "Essence", "Automatique", 110],
  ["Volkswagen", "Polo", "Diesel", "Manuelle", 120],
  ["Hyundai", "i20", "Essence", "Automatique", 115],
  ["Kia", "Picanto", "Essence", "Manuelle", 80],
  ["Toyota", "Yaris", "Hybride", "Automatique", 130],
  ["Dacia", "Sandero", "Essence", "Manuelle", 85],
  ["Seat", "Ibiza", "Diesel", "Manuelle", 105],
  ["Fiat", "Tipo", "Diesel", "Manuelle", 125],
  ["Citroen", "C3", "Essence", "Automatique", 105],
];

const seedNotePrefix = "[seed-demo]";

const pad = (value, size = 3) => String(value).padStart(size, "0");

async function ensureColumn(table, column, definition) {
  const columns = await prisma.$queryRawUnsafe(`PRAGMA table_info("${table}")`);
  if (columns.some((item) => item.name === column)) {
    return;
  }

  await prisma.$executeRawUnsafe(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${definition}`);
}

async function ensureSeedSchema() {
  await ensureColumn("Client", "drivingLicenseDate", "TEXT");
  await ensureColumn("Client", "cinIssueDate", "TEXT");
  await ensureColumn("Client", "cinIssuePlace", "TEXT");
  await ensureColumn("Client", "birthDate", "TEXT");
  await ensureColumn("Client", "birthPlace", "TEXT");
  await ensureColumn("Client", "nationality", "TEXT");
  await ensureColumn("Client", "isActive", "BOOLEAN NOT NULL DEFAULT true");
  await ensureColumn("Client", "archived", "BOOLEAN DEFAULT 0");
  await ensureColumn("Client", "archivedAt", "TEXT");
  await ensureColumn("Client", "archivedReason", "TEXT");

  await ensureColumn("Car", "imageUrl", "TEXT");
  await ensureColumn("Car", "archived", "BOOLEAN DEFAULT 0");
  await ensureColumn("Car", "archivedAt", "TEXT");
  await ensureColumn("Car", "archivedReason", "TEXT");

  await ensureColumn("Reservation", "secondClientId", "INTEGER");
  await ensureColumn("Reservation", "archived", "BOOLEAN DEFAULT 0");
  await ensureColumn("Reservation", "archivedAt", "TEXT");
  await ensureColumn("Reservation", "archivedReason", "TEXT");

  await ensureColumn("Payment", "archived", "BOOLEAN DEFAULT 0");
  await ensureColumn("Payment", "archivedAt", "TEXT");
  await ensureColumn("Payment", "archivedReason", "TEXT");

  await ensureColumn("Contract", "archived", "BOOLEAN DEFAULT 0");
  await ensureColumn("Contract", "archivedAt", "TEXT");
  await ensureColumn("Contract", "archivedReason", "TEXT");
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function clientData(index) {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  const number = index + 1;

  return {
    fullName: `${firstName} ${lastName} ${pad(number)}`,
    phone: `+216 20 ${pad(number, 3)} ${pad(100 + number, 3)}`,
    cin: `12${pad(number, 6)}`,
    passportNumber: `P${pad(number, 7)}`,
    drivingLicense: `DL${pad(number, 7)}`,
    drivingLicenseDate: `20${10 + (index % 10)}-0${(index % 9) + 1}-15`,
    cinIssueDate: `20${12 + (index % 10)}-0${(index % 9) + 1}-10`,
    cinIssuePlace: addresses[index % addresses.length],
    birthDate: `${1975 + (index % 25)}-0${(index % 9) + 1}-12`,
    birthPlace: addresses[(index + 3) % addresses.length],
    nationality: "Tunisienne",
    address: `${12 + index} Rue Massar, ${addresses[index % addresses.length]}`,
    isActive: index % 17 !== 0,
    archived: false,
  };
}

function carData(index) {
  const [brand, model, fuelType, transmission, dailyPrice] = cars[index % cars.length];
  const number = index + 1;
  const isOngoing = index % 4 === 0;

  return {
    brand,
    model: `${model} ${2020 + (index % 5)}`,
    registrationNumber: `LM-${pad(number)}-TN`,
    year: 2018 + (index % 7),
    fuelType,
    transmission,
    dailyPrice,
    status: isOngoing ? "RENTED" : "AVAILABLE",
    mileage: 25_000 + index * 730,
    imageUrl: null,
    insuranceExpiryDate: addDays(new Date(), 180 + index),
    technicalVisitExpiryDate: addDays(new Date(), 120 + index),
    archived: false,
  };
}

function reservationData(index, clientId, carId, dailyPrice) {
  const number = index + 1;
  const pattern = index % 4;
  const startDate =
    pattern === 0 ? addDays(new Date(), -2) : pattern === 1 ? addDays(new Date(), 7 + index) : addDays(new Date(), -35 + index);
  const duration = 2 + (index % 6);
  const endDate = addDays(startDate, duration);
  const status = pattern === 0 ? "ONGOING" : pattern === 1 ? "RESERVED" : pattern === 2 ? "COMPLETED" : "EN_ATTENTE";

  return {
    clientId,
    secondClientId: null,
    carId,
    startDate,
    endDate,
    dailyPrice,
    totalPrice: dailyPrice * duration,
    depositAmount: Math.round(dailyPrice * 1.5),
    status,
    pickupMileage: status === "RESERVED" || status === "EN_ATTENTE" ? null : 25_000 + index * 730,
    returnMileage: status === "COMPLETED" ? 25_000 + index * 730 + duration * 140 : null,
    pickupFuelLevel: status === "RESERVED" || status === "EN_ATTENTE" ? null : "Plein",
    returnFuelLevel: status === "COMPLETED" ? "Demi" : null,
    notes: `${seedNotePrefix} Reservation demo ${pad(number)}`,
    archived: false,
  };
}

async function main() {
  await ensureSeedSchema();

  await prisma.reservation.deleteMany({
    where: {
      notes: {
        startsWith: seedNotePrefix,
      },
    },
  });

  let clientsCreatedOrUpdated = 0;
  let carsCreatedOrUpdated = 0;
  let reservationsCreated = 0;

  for (let index = 0; index < 100; index += 1) {
    const client = await prisma.client.upsert({
      where: { phone: clientData(index).phone },
      update: clientData(index),
      create: clientData(index),
    });
    clientsCreatedOrUpdated += 1;

    const carInput = carData(index);
    const car = await prisma.car.upsert({
      where: { registrationNumber: carInput.registrationNumber },
      update: carInput,
      create: carInput,
    });
    carsCreatedOrUpdated += 1;

    await prisma.reservation.create({
      data: reservationData(index, client.id, car.id, car.dailyPrice),
    });
    reservationsCreated += 1;
  }

  console.log(
    `Seed complete: ${clientsCreatedOrUpdated} clients, ${carsCreatedOrUpdated} voitures, ${reservationsCreated} reservations.`
  );
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
