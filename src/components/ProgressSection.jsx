import { ALL_QUESTS, TOTAL_XP } from '../data/quests';

const MILESTONES = [
  { id: 'm1', threshold: 1,                          label: 'First read' },
  { id: 'm2', threshold: (n) => Math.ceil(n / 2),    label: 'Halfway there' },
  { id: 'm3', threshold: (n) => Math.ceil(n * 0.75), label: 'Governance nerd' },
  { id: 'm4', threshold: (n) => n,                   label: 'DAO Champion 🏆' },
];

export function ProgressSection({ readSet }) {
  const total   = ALL_QUESTS.length;
  const done    = readSet.size;
  const pct     = total > 0 ? (done / total) * 100 : 0;
  const xpEarned = ALL_QUESTS
    .filter((q) => readSet.has(q.id))
    .reduce((sum, q) => sum + q.xp, 0);

  return (
    <section className="progress-section">
      <div className="progress-header">
        <div>
          <div className="progress-title">Your Progress</div>
          <div className="progress-count">
            {done} <span>/ {total} quests read</span>
          </div>
        </div>
        <div className="xp-badge">
          <span className="xp-icon">⚡</span>
          {xpEarned} <span style={{ fontWeight: 400 }}>/ {TOTAL_XP} XP</span>
        </div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="progress-milestones">
        {MILESTONES.map((m) => {
          const thresh = typeof m.threshold === 'function' ? m.threshold(total) : m.threshold;
          return (
            <div key={m.id} className={`milestone ${done >= thresh ? 'achieved' : ''}`}>
              <div className="milestone-dot" />
              {m.label}
            </div>
          );
        })}
      </div>
    </section>
  );
}
