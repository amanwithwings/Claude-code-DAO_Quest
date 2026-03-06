import { useState, useEffect, useCallback, useRef } from 'react';
import { useEnsName }                       from 'wagmi';
import { fetchLeaderboard, setDisplayName } from '../lib/supabase';

const MEDALS = ['🥇', '🥈', '🥉'];

function truncate(addr) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

// ── Inline display-name editor ────────────────────────────────────────────────
function NameEditor({ currentName, onSave, onCancel }) {
  const [value, setValue] = useState(currentName ?? '');
  return (
    <div className="name-editor">
      <input
        className="name-input"
        value={value}
        maxLength={30}
        placeholder="Your display name"
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter')  onSave(value.trim());
          if (e.key === 'Escape') onCancel();
        }}
      />
      <div className="name-editor-actions">
        <button className="btn btn-success btn-sm" onClick={() => onSave(value.trim())}>Save</button>
        <button className="btn btn-ghost btn-sm"   onClick={onCancel}>✕</button>
      </div>
    </div>
  );
}

// ── Single leaderboard row ────────────────────────────────────────────────────
function LbRow({ entry, rank, isMe, ensName, onEditClick }) {
  const displayName =
    isMe && ensName
      ? ensName
      : entry.display_name || truncate(entry.wallet_address);

  return (
    <div className={`lb-row ${isMe ? 'lb-row-me' : ''}`}>
      <span className="lb-rank">
        {rank <= 3 ? MEDALS[rank - 1] : `#${rank}`}
      </span>

      <span className="lb-name" title={entry.wallet_address}>
        {displayName}
        {isMe && (
          <button className="edit-name-btn" onClick={onEditClick} title="Edit display name">
            ✏️
          </button>
        )}
      </span>

      <span className="lb-xp">{entry.total_xp} <span className="lb-xp-label">XP</span></span>
    </div>
  );
}

// ── Main leaderboard component ────────────────────────────────────────────────
export function Leaderboard({ currentAddress, refreshTrigger }) {
  const [entries,    setEntries]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [editing,    setEditing]    = useState(false);
  const [savingName, setSavingName] = useState(false);

  // Resolve ENS for the connected wallet (mainnet)
  const { data: ensName } = useEnsName({
    address: currentAddress,
    chainId: 1,
    query:   { enabled: Boolean(currentAddress) },
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setEntries(await fetchLeaderboard());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load on mount
  useEffect(() => { load(); }, [load]);

  // Debounced refresh when quests are marked read — coalesces rapid marks
  // (e.g. reading all 8 quests quickly) into a single DB fetch after 2 s.
  const debounceRef = useRef(null);
  useEffect(() => {
    if (!refreshTrigger) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(load, 2000);
    return () => clearTimeout(debounceRef.current);
  }, [refreshTrigger, load]);

  const myAddr  = currentAddress?.toLowerCase();
  const myIndex = entries.findIndex((e) => e.wallet_address === myAddr);
  const myEntry = entries[myIndex];

  const handleSaveName = async (name) => {
    if (!currentAddress || !name) return;
    setSavingName(true);
    try {
      await setDisplayName(currentAddress, name);
      setEditing(false);
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setSavingName(false);
    }
  };

  return (
    <div className="leaderboard">
      {/* Header */}
      <div className="lb-header">
        <span className="lb-title">🏆 Leaderboard</span>
        <button className={`lb-refresh ${loading ? 'lb-refresh-spinning' : ''}`} onClick={load} disabled={loading} title="Refresh">
          ↻
        </button>
      </div>

      {/* Body */}
      <div className="lb-body">
        {error && <div className="lb-error">⚠️ {error}</div>}

        {loading && !entries.length && (
          <div className="lb-placeholder">
            {[1,2,3,4,5].map((i) => <div key={i} className="lb-skeleton" />)}
          </div>
        )}

        {!loading && !error && entries.length === 0 && (
          <div className="lb-empty">No entries yet — be the first!</div>
        )}

        {entries.map((entry, i) => {
          const isMe = entry.wallet_address === myAddr;
          return editing && isMe ? (
            <div key={entry.wallet_address} className="lb-row lb-row-me lb-editing">
              <NameEditor
                currentName={entry.display_name}
                onSave={handleSaveName}
                onCancel={() => setEditing(false)}
              />
            </div>
          ) : (
            <LbRow
              key={entry.wallet_address}
              entry={entry}
              rank={i + 1}
              isMe={isMe}
              ensName={ensName}
              onEditClick={() => setEditing(true)}
            />
          );
        })}

        {/* Show current user below the fold if they're not in top 20 */}
        {myAddr && myIndex === -1 && (
          <>
            <div className="lb-divider">· · ·</div>
            <div className="lb-row lb-row-me lb-row-unranked">
              <span className="lb-rank">—</span>
              <span className="lb-name">
                {ensName || truncate(currentAddress)}
                <button className="edit-name-btn" onClick={() => setEditing(true)} title="Set display name">✏️</button>
              </span>
              <span className="lb-xp">0 <span className="lb-xp-label">XP</span></span>
            </div>
            {editing && (
              <div className="lb-row lb-editing">
                <NameEditor onSave={handleSaveName} onCancel={() => setEditing(false)} />
              </div>
            )}
          </>
        )}
      </div>

      {savingName && <div className="lb-saving">Saving…</div>}
    </div>
  );
}
