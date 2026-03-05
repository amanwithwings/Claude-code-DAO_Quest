import { useState } from 'react';

// ── Badge helpers ─────────────────────────────────────────────────────────────
function Badge({ type, label }) {
  if (type === 'live') {
    return (
      <span className="live-badge">
        <span className="live-dot" />
        {label}
      </span>
    );
  }
  return <span className="new-badge">{label}</span>;
}

function StatChip({ type, label }) {
  return (
    <div className={`stat-chip ${type}`}>
      <span className="stat-dot" />
      {label}
    </div>
  );
}

// ── Main quest card (expandable, with stats + external link) ─────────────────
export function QuestCard({ quest, isRead, onMarkRead }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`quest-card ${open ? 'open' : ''} ${isRead ? 'completed' : ''}`}>
      <div className="quest-header" onClick={() => setOpen((o) => !o)}>
        <div className="quest-icon" style={{ background: quest.iconBg }}>
          {quest.icon}
        </div>

        <div className="quest-meta">
          <div className="quest-category" style={{ color: quest.categoryColor }}>
            {quest.category}
            {quest.badges?.map((b) => (
              <Badge key={b.label} type={b.type} label={b.label} />
            ))}
          </div>
          <div className="quest-title">{quest.title}</div>
        </div>

        <div className="quest-right">
          <div className={`check-indicator ${isRead ? 'done' : ''}`}>✓</div>
          <div className="xp-chip">+{quest.xp} XP</div>
          <div className="expand-arrow">▼</div>
        </div>
      </div>

      <div className="quest-body">
        <div className="quest-body-inner">
          <p className="quest-description">{quest.description}</p>

          {quest.details?.length > 0 && (
            <ul className="quest-details">
              {quest.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          )}

          {quest.stats?.length > 0 && (
            <div className="stats-row">
              {quest.stats.map((s) => (
                <StatChip key={s.type} type={s.type} label={s.label} />
              ))}
            </div>
          )}

          <div className="quest-actions">
            {quest.link && (
              <a
                className="btn btn-primary"
                href={quest.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {quest.link.label}
              </a>
            )}
            {isRead ? (
              <button className="btn btn-done" disabled>✓ Read</button>
            ) : (
              <button className="btn btn-outline" onClick={() => onMarkRead(quest.id, quest.xp)}>
                ✓ Mark as Read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub quest card (compact, no stats) ───────────────────────────────────────
export function SubQuestCard({ quest, isRead, onMarkRead }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`sub-quest-card ${open ? 'open' : ''} ${isRead ? 'completed' : ''}`}>
      <div className="sub-quest-header" onClick={() => setOpen((o) => !o)}>
        <div className="sub-quest-icon">{quest.icon}</div>

        <div className="sub-quest-meta">
          <div className="sub-quest-title">{quest.title}</div>
        </div>

        <div className="quest-right">
          <div className={`check-indicator ${isRead ? 'done' : ''}`}>✓</div>
          <div className="xp-chip">+{quest.xp} XP</div>
          {quest.badges?.map((b) => (
            <Badge key={b.label} type={b.type} label={b.label} />
          ))}
          <div className="expand-arrow">▼</div>
        </div>
      </div>

      <div className="sub-quest-body">
        <p className="sub-quest-desc">{quest.description}</p>
        <div className="sub-quest-actions">
          {quest.link && (
            <a
              className="btn btn-ghost btn-sm"
              href={quest.link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {quest.link.label}
            </a>
          )}
          {isRead ? (
            <button className="btn btn-done" disabled>✓ Read</button>
          ) : (
            <button className="btn btn-outline" onClick={() => onMarkRead(quest.id, quest.xp)}>
              ✓ Mark as Read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
