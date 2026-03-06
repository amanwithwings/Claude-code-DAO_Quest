import { useState } from 'react';
import { GLOSSARY }  from '../data/glossary';

// ── Tooltip component ─────────────────────────────────────────────────────────
function GlossaryTerm({ children, definition }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className={`glossary-term${open ? ' glossary-open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      // Toggle on tap for mobile
      onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
    >
      {children}
      {open && (
        <span className="glossary-tooltip" role="tooltip">
          {definition}
        </span>
      )}
    </span>
  );
}

// ── Text annotation ───────────────────────────────────────────────────────────
// Scans a plain string for glossary terms (case-insensitive, whole-word) and
// returns a React node array with matching spans wrapped in <GlossaryTerm>.

function escRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Build the pattern once (module-level) so it isn't recomputed each render.
const _terms   = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
const _pattern = _terms.length
  ? new RegExp(`\\b(${_terms.map(escRegex).join('|')})\\b`, 'gi')
  : null;

export function annotate(text) {
  if (!text || typeof text !== 'string' || !_pattern) return text;

  const parts = [];
  let last  = 0;
  let match;

  // Reset lastIndex for reuse
  _pattern.lastIndex = 0;

  while ((match = _pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));

    const term = match[0];
    const def  = GLOSSARY[term.toLowerCase()];
    parts.push(
      <GlossaryTerm key={match.index} definition={def}>
        {term}
      </GlossaryTerm>
    );
    last = match.index + term.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? parts : text;
}
