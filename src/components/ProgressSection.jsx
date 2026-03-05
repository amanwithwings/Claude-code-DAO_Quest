const MILESTONES = [
  { id: 'm1', pct: 0.01, label: 'First read' },
  { id: 'm2', pct: 0.50, label: 'Halfway there' },
  { id: 'm3', pct: 0.75, label: 'Governance nerd' },
  { id: 'm4', pct: 1.00, label: 'DAO Champion 🏆' },
];

export function ProgressSection({ readSet, weekQuests }) {
  const total    = weekQuests.length;
  const done     = weekQuests.filter((q) => readSet.has(q.id)).length;
  const pct      = total > 0 ? done / total : 0;
  const xpEarned = weekQuests
    .filter((q) => readSet.has(q.id))
    .reduce((sum, q) => sum + q.xp, 0);
  const xpTotal  = weekQuests.reduce((sum, q) => sum + q.xp, 0);

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
          {xpEarned} <span style={{ fontWeight: 400 }}>/ {xpTotal} XP</span>
        </div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${pct * 100}%` }} />
      </div>

      <div className="progress-milestones">
        {MILESTONES.map((m) => (
          <div key={m.id} className={`milestone ${pct >= m.pct ? 'achieved' : ''}`}>
            <div className="milestone-dot" />
            {m.label}
          </div>
        ))}
      </div>
    </section>
  );
}
