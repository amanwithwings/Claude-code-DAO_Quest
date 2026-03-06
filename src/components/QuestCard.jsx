import { useState, useEffect, useRef } from 'react';
import { fetchLiveVotes }              from '../lib/liveVotes';

// ── Live votes hook ───────────────────────────────────────────────────────────
// Fetches once on mount, then every 2 min while the proposal is active.
function useLiveVotes(proposal) {
  const [liveVotes, setLiveVotes] = useState(null);
  const [fetching,  setFetching]  = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!proposal) return;

    const load = async () => {
      setFetching(true);
      const result = await fetchLiveVotes(proposal);
      setLiveVotes(result);
      setFetching(false);
    };

    load();

    // Refresh every 2 min only while vote is still active
    timer.current = setInterval(() => {
      if (liveVotes?.status && !['active', 'pending'].includes(liveVotes.status)) return;
      load();
    }, 120_000);

    return () => clearInterval(timer.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposal?.id]);

  return { liveVotes, fetching };
}

// ── Formatting helpers ────────────────────────────────────────────────────────
function fmtARB(n) {
  if (n >= 1e6)  return `${(n / 1e6).toFixed(2)}m ARB`;
  if (n >= 1e3)  return `${Math.round(n / 1e3)}k ARB`;
  return `${Math.round(n)} ARB`;
}

// Parse a human-readable ARB label like "For: 56.55m ARB" → number
function parseARB(label) {
  const m = label.match(/([\d,.]+)\s*([mk]?)\s*ARB/i);
  if (!m) return 0;
  const n    = parseFloat(m[1].replace(/,/g, ''));
  const mult = m[2].toLowerCase() === 'm' ? 1e6 : m[2].toLowerCase() === 'k' ? 1e3 : 1;
  return n * mult;
}

// ── Vote progress bar ─────────────────────────────────────────────────────────
// Accepts either live data (from API) or falls back to parsing static stat labels.
function VoteBar({ stats, liveVotes, fetching }) {
  const isLive = Boolean(liveVotes);

  let forAmt, againstAmt, quorumAmt;

  if (isLive) {
    forAmt     = liveVotes.forARB;
    againstAmt = liveVotes.againstARB;
    quorumAmt  = liveVotes.quorumARB;
  } else {
    const forStat     = stats?.find((s) => s.type === 'vote-for');
    const againstStat = stats?.find((s) => s.type === 'vote-against');
    const quorumStat  = stats?.find((s) => s.type === 'vote-quorum');
    if (!forStat) return null;
    forAmt     = parseARB(forStat.label);
    againstAmt = againstStat ? parseARB(againstStat.label) : 0;
    quorumAmt  = quorumStat  ? parseARB(quorumStat.label)  : 0;
  }

  const total      = Math.max(forAmt + againstAmt, quorumAmt) * 1.15 || 1;
  const forPct     = Math.min((forAmt     / total) * 100, 100);
  const againstPct = Math.min((againstAmt / total) * 100, 100);
  const quorumPct  = quorumAmt ? Math.min((quorumAmt / total) * 100, 100) : null;

  const quorumMet = !quorumAmt || forAmt >= quorumAmt;
  const isPassing = forAmt > againstAmt;

  let statusLabel, statusCls;
  if (quorumMet && isPassing)       { statusLabel = '✅ Passing · Quorum met';   statusCls = 'vote-status-pass'; }
  else if (isPassing && !quorumMet) { statusLabel = '⚠️ Passing · Below quorum'; statusCls = 'vote-status-warn'; }
  else                              { statusLabel = '❌ Failing';                 statusCls = 'vote-status-fail'; }

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

      <div className="vote-bar-footer">
        <span className={`vote-status-chip ${statusCls}`}>{statusLabel}</span>

        {/* Live data: show real-time counts + source indicator */}
        {isLive && (
          <span className="vote-live-indicator">
            <span className="live-dot" />
            {fetching ? 'updating…' : 'live · '}
            <span className="vote-live-counts">
              {fmtARB(forAmt)} for · {fmtARB(againstAmt)} against
              {quorumAmt > 0 && ` · ${fmtARB(quorumAmt)} quorum`}
            </span>
          </span>
        )}

        {/* Static fallback: show spinner while first fetch is in flight */}
        {!isLive && fetching && (
          <span className="vote-live-indicator">
            <span className="vote-fetch-spinner">↻</span> fetching live data…
          </span>
        )}
      </div>
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
  const { liveVotes, fetching } = useLiveVotes(quest.proposal ?? null);

  const hasStats = quest.stats?.length > 0;

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

          {hasStats && (
            <>
              <VoteBar stats={quest.stats} liveVotes={liveVotes} fetching={fetching} />
              {/* Static stat chips shown only when no live data */}
              {!liveVotes && (
                <div className="stats-row">
                  {quest.stats.map((s) => (
                    <StatChip key={s.type} type={s.type} label={s.label} />
                  ))}
                </div>
              )}
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
