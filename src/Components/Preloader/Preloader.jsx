import { useEffect, useState } from "react";
import "./Preloader.css";

const GROW_TIME = 4500; // paudha poora bada hone ka time (ms)

const LEAF_A = "M0 0C10-20 38-22 50-6 38 10 12 12 0 0z";
const LEAF_B = "M0 0C12-24 44-26 58-8 44 12 14 14 0 0z";
const LEAF_TOP = "M0 0C12-22 40-24 54-6 40 12 12 12 0 0z";

export default function Preloader() {
  const [show, setShow] = useState(true); // har reload par dikhega
  const [out, setOut] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // preloader ke time scroll band
    let raf;
    const start = performance.now();
    const timers = [];

    const tick = (now) => {
      const p = Math.min(1, (now - start) / GROW_TIME);
      setPercent(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timers.push(setTimeout(() => setOut(true), 500)); 
        timers.push(
          setTimeout(() => {
            setShow(false);
            document.body.style.overflow = "";
          }, 1700)
        );
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`gt-pre ${out ? "gt-out" : ""}`}>
      <div className="gt-glow" />

      <svg className="gt-svg" viewBox="0 0 200 270" aria-hidden="true">
        <path
          className="gt-pot"
          d="M66 232h68l-8 32a6 6 0 0 1-6 4H80a6 6 0 0 1-6-4z"
          fill="#8b5e3c"
        />
        <rect className="gt-pot" x="60" y="224" width="80" height="10" rx="4" fill="#a8714a" />

        <path className="gt-stem" pathLength="150" d="M100 226C100 190 94 150 100 80" />

        <g transform="translate(100,200)">
          <path className="gt-leaf" style={{ animationDelay: "1.1s" }} d={LEAF_A} />
        </g>
        <g transform="translate(100,172) scale(-1,1)">
          <path className="gt-leaf gt-b" style={{ animationDelay: "1.7s" }} d={LEAF_A} />
        </g>
        <g transform="translate(98,146)">
          <path className="gt-leaf" style={{ animationDelay: "2.3s" }} d={LEAF_B} />
        </g>
        <g transform="translate(98,120) scale(-1,1)">
          <path className="gt-leaf gt-b" style={{ animationDelay: "2.85s" }} d={LEAF_B} />
        </g>
        <g transform="translate(100,98)">
          <path className="gt-leaf" style={{ animationDelay: "3.45s" }} d={LEAF_A} />
        </g>
        <g transform="translate(100,84) rotate(-90)">
          <path className="gt-leaf gt-b" style={{ animationDelay: "3.8s" }} d={LEAF_TOP} />
        </g>
      </svg>

      <div className="gt-brand">GREEN TECH</div>
      <div className="gt-tag">Grow Vertical. Live Green.</div>

      <div className="gt-meter">
        <div className="gt-track">
          <i style={{ width: `${percent}%` }} />
        </div>
        <span className="gt-pct">{percent}%</span>
      </div>
    </div>
  );
}

