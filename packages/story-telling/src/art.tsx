/**
 * Original diagrammatic art for the story-telling landing page.
 *
 * DESIGN.md calls for documentary industrial imagery and says that when no
 * photograph is available the answer is "a diagrammatic block, map-like grid,
 * or typographic composition instead of a generic placeholder". These are that:
 * drawn from the system's own tokens, so they retheme with it, and carrying no
 * third-party asset.
 *
 * Every piece is decorative — the copy already carries the meaning — so each
 * one is `aria-hidden` and the surrounding section supplies the words.
 */
import type { CSSProperties } from 'react';

const ink = 'var(--ds-color-text)';
const accent = 'var(--ds-color-accent)';
const muted = 'var(--ds-color-text-muted)';
const line = 'var(--ds-color-border)';
const safety = 'var(--ds-color-warning)';

const fill: CSSProperties = { width: '100%', height: 'auto', display: 'block' };

/**
 * The hero backdrop: a survey grid with one route drawn across it and a single
 * orange waypoint. The route is a stroked path so it can be drawn on scroll.
 */
export function RouteField() {
  return (
    <svg viewBox="0 0 1200 700" style={{ ...fill, height: '100%' }} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="st-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0H0v60" fill="none" stroke={line} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="700" fill="var(--ds-color-bg)" />
      <rect width="1200" height="700" fill="url(#st-grid)" />
      <path
        className="st-route"
        d="M-20 560 C 220 560, 260 300, 470 300 S 760 420, 900 250 S 1120 120, 1240 120"
        fill="none"
        stroke={accent}
        strokeWidth="3"
      />
      {[
        [180, 545],
        [470, 300],
        [900, 250],
      ].map(([cx, cy], i) => (
        <rect key={i} x={cx - 5} y={cy - 5} width="10" height="10" fill={accent} />
      ))}
      <rect x="1195" y="115" width="10" height="10" fill={safety} />
      <text x="24" y="676" fill={muted} fontFamily="var(--ds-font-mono)" fontSize="12" letterSpacing="1.6">
        ORIGIN — 3 HANDOFFS — DESTINATION
      </text>
    </svg>
  );
}

/** Tension: a schedule that has come apart — bars that no longer line up. */
export function BrokenSchedule() {
  const rows = [
    { x: 0, w: 320, late: false },
    { x: 120, w: 260, late: true },
    { x: 60, w: 420, late: false },
    { x: 300, w: 180, late: true },
    { x: 40, w: 500, late: false },
  ];
  return (
    <svg viewBox="0 0 640 420" style={fill} aria-hidden="true">
      <rect width="640" height="420" fill="var(--ds-color-surface)" />
      {[...Array(7)].map((_, i) => (
        <line key={i} x1={i * 90 + 40} y1="0" x2={i * 90 + 40} y2="420" stroke={line} strokeWidth="1" />
      ))}
      {rows.map((r, i) => (
        <g key={i}>
          <rect x={r.x + 40} y={60 + i * 62} width={r.w} height="14" fill={r.late ? safety : ink} />
          {r.late && (
            <rect x={r.x + 40 + r.w + 8} y={60 + i * 62} width="46" height="14" fill="none" stroke={safety} strokeWidth="1" />
          )}
        </g>
      ))}
      <text x="40" y="396" fill={muted} fontFamily="var(--ds-font-mono)" fontSize="11" letterSpacing="1.6">
        TWO OF FIVE LEGS UNACCOUNTED FOR
      </text>
    </svg>
  );
}

/** Control: one ledger, every movement written to the same record. */
export function Manifest() {
  const rows = ['INTAKE', 'PICKUP', 'LINEHAUL', 'CUSTOMS', 'DELIVERY'];
  return (
    <svg viewBox="0 0 640 520" style={fill} aria-hidden="true">
      <rect width="640" height="520" fill="var(--ds-color-surface)" />
      <rect x="40" y="40" width="560" height="1" fill={ink} />
      <text x="40" y="30" fill={muted} fontFamily="var(--ds-font-mono)" fontSize="11" letterSpacing="1.6">
        MANIFEST
      </text>
      {rows.map((label, i) => (
        <g key={label}>
          <rect x="40" y={78 + i * 80} width="10" height="10" fill={i < 3 ? accent : line} />
          <text x="70" y="88" dy={i * 80} fill={ink} fontFamily="var(--ds-font-mono)" fontSize="13" letterSpacing="1.2">
            {label}
          </text>
          <rect x="40" y={118 + i * 80} width="560" height="1" fill={line} />
          <text x="600" y="88" dy={i * 80} textAnchor="end" fill={muted} fontFamily="var(--ds-font-mono)" fontSize="11">
            {i < 3 ? 'SIGNED' : 'PENDING'}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Capability: a stacked yard seen from the front, one unit picked out. */
export function ContainerStack() {
  const cols = 7;
  const rows = 4;
  return (
    <svg viewBox="0 0 640 420" style={fill} aria-hidden="true">
      <rect width="640" height="420" fill="var(--ds-color-surface)" />
      {[...Array(rows)].map((_, r) =>
        [...Array(cols)].map((__, c) => {
          const picked = r === 1 && c === 4;
          return (
            <rect
              key={`${r}-${c}`}
              x={40 + c * 80}
              y={70 + r * 76}
              width="72"
              height="68"
              fill={picked ? safety : 'none'}
              stroke={picked ? safety : line}
              strokeWidth={picked ? 0 : 1}
            />
          );
        }),
      )}
      <line x1="40" y1="382" x2="600" y2="382" stroke={ink} strokeWidth="2" />
      <text x="40" y="406" fill={muted} fontFamily="var(--ds-font-mono)" fontSize="11" letterSpacing="1.6">
        ONE UNIT, LOCATED
      </text>
    </svg>
  );
}
