const mojibakeReplacements: Array<[RegExp, string]> = [
  [new RegExp("\u00c3\u00a9", "g"), "\u00e9"],
  [new RegExp("\u00c3\u00a8", "g"), "\u00e8"],
  [new RegExp("\u00c3\u00aa", "g"), "\u00ea"],
  [new RegExp("\u00c3\u00a0", "g"), "\u00e0"],
  [new RegExp("\u00c3\u00a2", "g"), "\u00e2"],
  [new RegExp("\u00c3\u00a7", "g"), "\u00e7"],
  [new RegExp("\u00c3\u00ae", "g"), "\u00ee"],
  [new RegExp("\u00c3\u00b4", "g"), "\u00f4"],
  [new RegExp("\u00c3\u0089", "g"), "\u00c9"],
  [new RegExp("\u00c2\u00b0", "g"), "\u00b0"],
  [new RegExp("\u00c2\u00b7", "g"), "\u00b7"],
  [new RegExp("\u00e2\u0080\u0099", "g"), "'"],
  [/fid\uFFFDles/g, "fid\u00e8les"],
  [/r\uFFFDguliers/g, "r\u00e9guliers"],
  [/\uFFFD forte/g, "\u00e0 forte"],
  [/\uFFFDlev\uFFFD/g, "\u00e9lev\u00e9"],
  [/Pr\uFFFDparer/g, "Pr\u00e9parer"],
  [/fid\uFFFDlit\uFFFD/g, "fid\u00e9lit\u00e9"],
  [/r\uFFFDcompenser/g, "r\u00e9compenser"],
  [/pr\uFFFDvue/g, "pr\u00e9vue"],
  [/disponibilit\uFFFD/g, "disponibilit\u00e9"],
  [/r\uFFFDservations/g, "r\u00e9servations"],
  [/v\uFFFDhicules/g, "v\u00e9hicules"],
  [/\uFFFDconomiques/g, "\u00e9conomiques"],
  [/pr\uFFFDvisions/g, "pr\u00e9visions"],
];

export function normalizeDisplayText(value: string) {
  return mojibakeReplacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
}
