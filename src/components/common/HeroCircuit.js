const CHIP = 64;
const H = CHIP / 2;
const PULSE = [
  'var(--hc-pulse-1)',
  'var(--hc-pulse-2)',
  'var(--hc-pulse-3)',
  'var(--hc-pulse-4)',
  'var(--hc-pulse-5)',
];
const OFFSETS = [-8, 0, 8];

const slots = [
  { x: 95, y: 100, path: (d) => `M${95 + d} ${100 + H} V${190 - d} H205` },
  { x: 415, y: 95, path: (d) => `M${415 + d} ${95 + H} V${190 + d} H315` },
  { x: 440, y: 300, path: (d) => `M${440 - H} ${300 + d} H${285 - d} V265` },
  { x: 95, y: 330, path: (d) => `M${95 + H} ${330 + d} H${235 + d} V265` },
  { x: 260, y: 45, path: (d) => `M${260 + d} ${45 + H} V155` },
];

function Pins({ cx, cy, size, count, long = 9 }) {
  const half = size / 2;
  const gap = size / (count + 1);
  const pins = [];
  for (let i = 1; i <= count; i += 1) {
    const o = -half + gap * i;
    pins.push(
      <path key={`t${i}`} d={`M${cx + o} ${cy - half} v-${long}`} />,
      <path key={`b${i}`} d={`M${cx + o} ${cy + half} v${long}`} />,
      <path key={`l${i}`} d={`M${cx - half} ${cy + o} h-${long}`} />,
      <path key={`r${i}`} d={`M${cx + half} ${cy + o} h${long}`} />
    );
  }
  return <g className="hc-pins">{pins}</g>;
}

export default function HeroCircuit({ chips = [] }) {
  const items = chips.slice(0, slots.length);

  return (
    <div className="hc" aria-hidden="true">
      <style>{`
        .hc {
          --hc-pulse-1: #5b5bff;
          --hc-pulse-2: #ff4d6d;
          --hc-pulse-3: #ffb703;
          --hc-pulse-4: #3ecbff;
          --hc-pulse-5: #ff8a3d;
          position: relative; width: 100%; max-width: 560px; margin: 0 auto;
        }
        html[data-theme="light"] .hc {
          --hc-pulse-1: #5443c4;
          --hc-pulse-2: #c52a55;
          --hc-pulse-3: #9a5a00;
          --hc-pulse-4: #056985;
          --hc-pulse-5: #b84a17;
        }
        .hc::before {
          content: ''; position: absolute; left: 50%; top: 50%; width: 60%; height: 60%;
          transform: translate(-50%, -50%); border-radius: 50%;
          background: var(--accent, #8b7cff); opacity: .13; filter: blur(70px);
          animation: hc-breathe 8s ease-in-out infinite;
        }
        .hc svg { position: relative; display: block; width: 100%; height: auto; overflow: visible; animation: hc-float 9s ease-in-out infinite; }
        .hc-pins path { fill: none; stroke: var(--text-muted, #8a8d9c); stroke-width: 2.2; stroke-linecap: round; opacity: .75; }
        .hc-trace { fill: none; stroke: var(--border, rgba(255,255,255,.14)); stroke-width: 1.2; }
        .hc-pulse {
          fill: none; stroke-width: 1.8; stroke-linecap: round;
          stroke-dasharray: 9 91; stroke-dashoffset: 100;
          animation: hc-flow 3.2s linear infinite;
          filter: drop-shadow(0 0 3px currentColor);
        }
        .hc-body { fill: var(--background-card, #14141f); stroke: var(--border, rgba(255,255,255,.16)); stroke-width: 1.2; }
        .hc-core { animation: hc-core 4s ease-in-out infinite; }
        .hc-d { fill: none; stroke: var(--text-primary, #fff); stroke-width: 9; stroke-linejoin: round; }
        .hc-chip { animation: hc-chip 6s ease-in-out infinite; }
        @keyframes hc-flow { to { stroke-dashoffset: 0; } }
        @keyframes hc-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes hc-breathe { 0%,100% { opacity: .1; } 50% { opacity: .2; } }
        @keyframes hc-core {
          0%,100% { filter: drop-shadow(0 0 0 transparent); }
          50% { filter: drop-shadow(0 0 14px color-mix(in srgb, var(--accent, #8b7cff) 55%, transparent)); }
        }
        @keyframes hc-chip { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @media (prefers-reduced-motion: reduce) {
          .hc::before, .hc svg, .hc-pulse, .hc-core, .hc-chip { animation: none; }
          .hc-pulse { stroke-dashoffset: 0; }
        }
      `}</style>

      <svg viewBox="0 0 520 420" role="presentation">
        {items.map((_, i) =>
          OFFSETS.map((d, k) => (
            <g key={`${i}-${k}`}>
              <path className="hc-trace" d={slots[i].path(d)} />
              <path
                className="hc-pulse"
                pathLength="100"
                d={slots[i].path(d)}
                style={{
                  color: PULSE[i],
                  stroke: PULSE[i],
                  animationDelay: `${i * 0.55 + k * 0.28}s`,
                }}
              />
            </g>
          ))
        )}

        <g className="hc-core">
          <Pins cx={260} cy={210} size={110} count={5} long={10} />
          <rect className="hc-body" x={205} y={155} width={110} height={110} rx={20} />
          <path className="hc-d" transform="translate(260 210)" d="M-23 -22 H1 a22 22 0 0 1 0 44 H-23 Z" />
        </g>

        {items.map((chip, i) => {
          const { x, y } = slots[i];
          return (
            <g className="hc-chip" key={chip.alt || i} style={{ animationDelay: `${-i * 1.1}s` }}>
              <Pins cx={x} cy={y} size={CHIP} count={3} long={8} />
              <rect className="hc-body" x={x - H} y={y - H} width={CHIP} height={CHIP} rx={16} />
              {chip.src ? (
                <image href={chip.src} x={x - 18} y={y - 18} width={36} height={36} preserveAspectRatio="xMidYMid meet" />
              ) : (
                <text x={x} y={y + 7} textAnchor="middle" fontSize="20" fontWeight="700" style={{ fill: 'var(--text-primary, #fff)' }}>
                  {(chip.alt || '?').charAt(0)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}