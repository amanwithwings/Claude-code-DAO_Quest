import { useState } from 'react';

// ── Vote progress bar ─────────────────────────────────────────────────────────
function parseARB(label) {
  const m = label.match(/([\d,.]+)\s*([mk]?)\s*ARB/i);
  if (!m) return 0;
  const n = parseFloat(m[1].replace(/,/g, ''));
  const mult = m[2].toLowerCase() === 'm' ? 1e6 : m[2].toLowerCase() === 'k' ? 1e3 : 1;
  return n * mult;
}

function VoteBar({ stats }) {
  const forStat     = stats.find((s) => s.type === 'vote-for');
  const againstStat = stats.find((s) => s.type === 'vote-against');
  const quorumStat  = stats.find((s) => s.type === 'vote-quorum');
  if (!forStat) return null;

  const forAmt     = parseARB(forStat.label);
  const againstAmt = againstStat ? parseARB(againstStat.label) : 0;
  const quorumAmt  = quorumStat  ? parseARB(quorumStat.label)  : 0;

  const total = Math.max(forAmt + againstAmt, quorumAmt) * 1.15 || 1;
  const forPct     = Math.min((forAmt     / total) * 100, 100);
  const againstPct = Math.min((againstAmt / total) * 100, 100);
  const quorumPct  = quorumAmt ? Math.min((quorumAmt / total) * 100, 100) : null;

  const quorumMet = !quorumAmt || forAmt >= quorumAmt;
  const isPassing = forAmt > againstAmt;

  let statusLabel, statusCls;
  if (quorumMet && isPassing)      { statusLabel = '✅ Passing · Quorum met';      statusCls = 'vote-status-pass';    }
  else if (isPassing && !quorumMet){ statusLabel = '⚠️ Passing · Below quorum';    statusCls = 'vote-status-warn';    }
  else                             { statusLabel = '❌ Failing';                    statusCls = 'vote-status-fail';    }

  return (
    <div className="vote-bar-wrap">
      <div className="vote-bar-outer">
        <div className="vote-bar-track">
          <div className="vote-bar-for"     style={{ width: `${forPct}%` }} />
          <div className="vote-bar-against" style={{ width: `${againstPct}%`, left: `${forPct}%` }} />
        </div>
        {quorumPct !== null && (
          <div className="vote-bar-quorum-line" style={{ left: `${quorumPct}%` }}>
            <span className="vote-bar-quorum-label">quorum</span>
          </div>
        )}
      </div>
      <span className={`vote-status-chip ${statusCls}`}>{statusLabel}</span>
    </div>
  );
}

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
            <>
              <VoteBar stats={quest.stats} />
              <div className="stats-row">
                {quest.stats.map((s) => (
                  <StatChip key={s.type} type={s.type} label={s.label} />
                ))}
              </div>
            </>
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
