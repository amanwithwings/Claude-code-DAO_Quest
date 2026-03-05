import { useState, useEffect, useRef } from 'react';

export function WeekSelector({ weeks, currentWeekId, onChange }) {
  const [open, setOpen] = useState(false);
  const ref             = useRef(null);
  const current         = weeks.find((w) => w.id === currentWeekId) ?? weeks[weeks.length - 1];

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="week-selector" ref={ref}>
      <button
        className={`week-btn ${open ? 'open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="week-cal">📅</span>
        <span className="week-label">{current.shortLabel}</span>
        <span className="week-chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="week-dropdown" role="listbox">
          {weeks.map((week) => {
            const questCount = week.sections.flatMap((s) => s.quests).length;
            const isActive   = week.id === currentWeekId;
            return (
              <div
                key={week.id}
                className={`week-option ${isActive ? 'active' : ''}`}
                role="option"
                aria-selected={isActive}
                onClick={() => { onChange(week.id); setOpen(false); }}
              >
                <span className="week-option-check">{isActive ? '✓' : ''}</span>
                <span className="week-option-label">{week.label}</span>
                <span className="week-option-count">{questCount} quests</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
