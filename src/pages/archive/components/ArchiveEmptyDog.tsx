import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

export function ArchiveEmptyDog() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const currentSvg = svg;

    function handleMouseMove(event: MouseEvent) {
      const pupils = currentSvg.querySelectorAll<SVGElement>(".archive-dog-pupil");
      pupils.forEach((pupil) => {
        const pupilRect = pupil.getBoundingClientRect();
        const centerX = pupilRect.left + pupilRect.width / 2;
        const centerY = pupilRect.top + pupilRect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const distance = Math.hypot(dx, dy) || 1;
        const maxOffset = 2.5;
        const px = Math.max(-maxOffset, Math.min(maxOffset, (dx / distance) * maxOffset));
        const py = Math.max(-maxOffset, Math.min(maxOffset, (dy / distance) * maxOffset * 0.8));
        pupil.style.setProperty("--px", `${px}px`);
        pupil.style.setProperty("--py", `${py}px`);
      });
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  function handleClick() {
    setIsShaking(false);
    window.setTimeout(() => setIsShaking(true), 0);
    window.setTimeout(() => setIsShaking(false), 700);
  }

  return (
    <div className="archive-dog-stage" onClick={handleClick} role="presentation">
      <div className="archive-dog-halo" />
      {Array.from({ length: 4 }).map((_, index) => (
        <Sparkles className="archive-dog-sparkle" key={index} />
      ))}
      <div className="archive-dog-shadow" />
      <svg
        className={isShaking ? "archive-dog-svg shake" : "archive-dog-svg"}
        ref={svgRef}
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient cx="40%" cy="35%" id="archiveDogBodyGrad" r="75%">
            <stop offset="0%" stopColor="#ffd766" />
            <stop offset="55%" stopColor="#f5b842" />
            <stop offset="100%" stopColor="#c8800f" />
          </radialGradient>
          <radialGradient cx="38%" cy="32%" id="archiveDogHeadGrad" r="70%">
            <stop offset="0%" stopColor="#ffe084" />
            <stop offset="60%" stopColor="#f5b842" />
            <stop offset="100%" stopColor="#cc8a14" />
          </radialGradient>
          <radialGradient cx="40%" cy="20%" id="archiveDogEarGrad" r="90%">
            <stop offset="0%" stopColor="#f5b842" />
            <stop offset="100%" stopColor="#a86a08" />
          </radialGradient>
        </defs>
        <g className="archive-dog-tail" transform="translate(148, 155)">
          <path d="M 0 0 Q 8 -18 18 -28 Q 24 -34 28 -28 Q 30 -22 24 -18 Q 14 -10 6 4 Z" fill="url(#archiveDogBodyGrad)" stroke="#a86a08" strokeWidth="1" />
        </g>
        <ellipse cx="65" cy="180" fill="url(#archiveDogBodyGrad)" rx="22" ry="14" stroke="#a86a08" strokeWidth="1" />
        <ellipse cx="135" cy="180" fill="url(#archiveDogBodyGrad)" rx="22" ry="14" stroke="#a86a08" strokeWidth="1" />
        <path d="M 55 175 Q 45 130 60 100 Q 80 80 100 80 Q 120 80 140 100 Q 155 130 145 175 Q 130 195 100 195 Q 70 195 55 175 Z" fill="url(#archiveDogBodyGrad)" stroke="#a86a08" strokeWidth="1.2" />
        <g className="archive-dog-front-legs">
          <path d="M 80 150 Q 78 175 80 200 L 92 200 Q 94 175 92 150 Z" fill="url(#archiveDogBodyGrad)" stroke="#a86a08" strokeWidth="1" />
          <path d="M 108 150 Q 106 175 108 200 L 120 200 Q 122 175 120 150 Z" fill="url(#archiveDogBodyGrad)" stroke="#a86a08" strokeWidth="1" />
          <ellipse cx="86" cy="202" fill="#cc8a14" rx="9" ry="4" />
          <ellipse cx="114" cy="202" fill="#cc8a14" rx="9" ry="4" />
        </g>
        <path d="M 78 95 Q 100 105 122 95 L 122 102 Q 100 113 78 102 Z" fill="#d62828" stroke="#8a1818" strokeWidth="0.8" />
        <circle cx="100" cy="108" fill="#f5d442" r="4" stroke="#a87808" strokeWidth="0.6" />
        <g className="archive-dog-head">
          <g className="archive-dog-ear-left">
            <path d="M 55 55 Q 35 50 28 75 Q 28 95 42 100 Q 55 95 60 80 Z" fill="url(#archiveDogEarGrad)" stroke="#7a4a00" strokeWidth="1" />
          </g>
          <g className="archive-dog-ear-right">
            <path d="M 145 55 Q 165 50 172 75 Q 172 95 158 100 Q 145 95 140 80 Z" fill="url(#archiveDogEarGrad)" stroke="#7a4a00" strokeWidth="1" />
          </g>
          <ellipse cx="100" cy="70" fill="url(#archiveDogHeadGrad)" rx="42" ry="38" stroke="#a86a08" strokeWidth="1.2" />
          <ellipse cx="100" cy="88" fill="url(#archiveDogHeadGrad)" rx="22" ry="16" stroke="#a86a08" strokeWidth="0.8" />
          <ellipse cx="100" cy="80" fill="#1a1a1a" rx="7" ry="5.5" />
          <ellipse cx="98" cy="78" fill="#555" opacity="0.7" rx="2" ry="1.5" />
          <path d="M 100 88 Q 100 96 92 96 M 100 88 Q 100 96 108 96" fill="none" stroke="#3a1f00" strokeLinecap="round" strokeWidth="1.5" />
          <ellipse className="archive-dog-tongue" cx="100" cy="96" fill="#e85a7a" rx="5" ry="2.5" />
          <g>
            <ellipse cx="82" cy="62" fill="white" rx="8" ry="9" stroke="#1a1a1a" strokeWidth="1" />
            <ellipse className="archive-dog-pupil" cx="84" cy="64" fill="#1a1a1a" rx="4" ry="5" />
            <circle cx="86" cy="61" fill="white" r="1.5" />
            <rect className="archive-dog-lid" fill="url(#archiveDogHeadGrad)" height="0" width="18" x="73" y="52" />
          </g>
          <g>
            <ellipse cx="118" cy="62" fill="white" rx="8" ry="9" stroke="#1a1a1a" strokeWidth="1" />
            <ellipse className="archive-dog-pupil" cx="120" cy="64" fill="#1a1a1a" rx="4" ry="5" />
            <circle cx="122" cy="61" fill="white" r="1.5" />
            <rect className="archive-dog-lid archive-dog-lid-right" fill="url(#archiveDogHeadGrad)" height="0" width="18" x="109" y="52" />
          </g>
          <ellipse cx="80" cy="80" fill="#ff8b6b" opacity="0.35" rx="6" ry="3" />
          <ellipse cx="120" cy="80" fill="#ff8b6b" opacity="0.35" rx="6" ry="3" />
        </g>
      </svg>
    </div>
  );
}
