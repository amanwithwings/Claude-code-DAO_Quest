import { useState, useRef, useCallback } from 'react';
import { createPortal }                  from 'react-dom';
import { GLOSSARY }                      from '../data/glossary';

// ─── Constants ────────────────────────────────────────────────────────────────
const TIP_W   = 248;   // tooltip width in px — must match CSS
const MARGIN  = 10;    // minimum gap from viewport edges

// ── Tooltip (rendered into document.body via portal) ──────────────────────────
function Tooltip({ definition, anchorRect }) {
  if (!anchorRect) return null;

  const anchorCx = anchorRect.left + anchorRect.width / 2;

  // Clamp tooltip left edge so it never overflows the viewport
  const rawLeft = anchorCx - TIP_W / 2;
  const left    = Math.max(MARGIN, Math.min(rawLeft, window.innerWidth - TIP_W - MARGIN));

  // Arrow sits under the anchor centre, clamped within the tooltip box
  const arrowLeft = Math.round(
    Math.max(16, Math.min(anchorCx - left, TIP_W - 16))
  );

  // Show above if there's room (≥ 120 px), otherwise show below
  const showAbove = anchorRect.top >= 120;

  const style = {
    left,
    ...(showAbove
      ? { bottom: Math.round(window.innerHeight - anchorRect.top + 8) }
      : { top:    Math.round(anchorRect.bottom + 8) }),
  };

  return createPortal(
    <div
      className={`glossary-tooltip glossary-tooltip--${showAbove ? 'above' : 'below'}`}
      style={style}
      role="tooltip"
    >
      {definition}
      <span className="glossary-arrow" style={{ left: arrowLeft }} />
    </div>,
    document.body
  );
}

// ── Highlighted term span ─────────────────────────────────────────────────────
function GlossaryTerm({ children, definition }) {
  const [anchorRect, setAnchorRect] = useState(null);
  const ref = useRef(null);

  const show = useCallback(() => {
    if (ref.current) setAnchorRect(ref.current.getBoundingClientRect());
  }, []);
  const hide = useCallback(() => setAnchorRect(null), []);

  return (
    <span
      ref={ref}
      className={`glossary-term${anchorRect ? ' glossary-open' : ''}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onClick={(e) => { e.stopPropagation(); anchorRect ? hide() : show(); }}
    >
      {children}
      <Tooltip definition={definition} anchorRect={anchorRect} />
    </span>
  );
}

// ── Text annotation ───────────────────────────────────────────────────────────
function escRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const _terms   = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
const _pattern = _terms.length
  ? new RegExp(`\\b(${_terms.map(escRegex).join('|')})\\b`, 'gi')
  : null;

export function annotate(text) {
  if (!text || typeof text !== 'string' || !_pattern) return text;

  const parts = [];
  let last  = 0;
  let match;

  _pattern.lastIndex = 0;

  while ((match = _pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));

    const term = match[0];
    parts.push(
      <GlossaryTerm key={match.index} definition={GLOSSARY[term.toLowerCase()]}>
        {term}
      </GlossaryTerm>
    );
    last = match.index + term.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? parts : text;
}
