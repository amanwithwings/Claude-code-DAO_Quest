import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useAccount, useSignMessage }               from 'wagmi';
import { ConnectButton }                            from '@rainbow-me/rainbowkit';

import { WEEKS, DEFAULT_WEEK_ID, getWeekById }      from './data/quests';
import { loadProgress, saveProgress, isSupabaseConfigured } from './lib/supabase';
import { ProgressSection }                          from './components/ProgressSection';
import { QuestCard, SubQuestCard }                  from './components/QuestCard';
import { WeekSelector }                             from './components/WeekSelector';
import { Leaderboard }                              from './components/Leaderboard';

// ── Passphrase gate ───────────────────────────────────────────────────────────
function PassphraseGate({ children }) {
  const KEY = import.meta.env.VITE_ACCESS_KEY;
  const [unlocked, setUnlocked] = useState(
    !KEY || sessionStorage.getItem('dao_unlocked') === '1'
  );
  const [input,  setInput]  = useState('');
  const [shake,  setShake]  = useState(false);
  const [error,  setError]  = useState(false);

  const tryUnlock = () => {
    if (input.trim().toLowerCase() === KEY.toLowerCase()) {
      sessionStorage.setItem('dao_unlocked', '1');
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setInput('');
      setTimeout(() => { setShake(false); setError(false); }, 700);
    }
  };

  if (unlocked) return children;

  return (
    <div className="lock-screen">
      <div className="lock-card">
        <div className="lock-logo">
          <svg width="52" height="60" viewBox="0 0 40 46" fill="none">
            <path d="M20 2L37.3 12V32L20 44L2.7 32V12L20 2Z" fill="#1B2559" stroke="#9DCCED" strokeWidth="1.5"/>
            <path d="M11.5 33L18 14" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M14 35L21 13L28 35" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M17 27H25" stroke="#12AAFF" strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="lock-title">Arbitrum<span className="title-accent">DAO</span> Quest Board</div>
        <div className="lock-subtitle">Enter your access key to continue</div>
        <input
          className={`lock-input ${shake ? 'lock-shake' : ''} ${error ? 'lock-error' : ''}`}
          type="password"
          placeholder="Access key"
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
        />
        <button className="btn btn-primary lock-btn" onClick={tryUnlock}>
          Enter →
        </button>
      </div>
    </div>
  );
}

// ── Wallet sign-in banner ─────────────────────────────────────────────────────
function SignInBanner({ onSign, loading }) {
  return (
    <div className="signin-banner">
      <span className="signin-icon">🔐</span>
      <div className="signin-text">
        <strong>Sync your progress</strong>
        <span> — sign a free message to save your reads across devices.</span>
      </div>
      <button className="btn btn-primary" onClick={onSign} disabled={loading}>
        {loading ? 'Signing…' : 'Sign Message'}
      </button>
    </div>
  );
}

// ── Header wallet area ────────────────────────────────────────────────────────
function WalletArea({ address, isSigned }) {
  return (
    <div className="wallet-area">
      <ConnectButton
        label="Connect Wallet"
        accountStatus="avatar"
        chainStatus="none"
        showBalance={false}
      />
      {address && isSigned && (
        <div className="signed-badge" title={address}>
          <span className="signed-dot" /> syncing
        </div>
      )}
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, isError }) {
  return (
    <div className={`toast ${msg ? 'visible' : ''} ${isError ? 'toast-error' : ''}`}>
      <span>{isError ? '⚠️' : '✓'}</span> {msg}
    </div>
  );
}

// ── Completion banner ─────────────────────────────────────────────────────────
function CompletionBanner({ show }) {
  if (!show) return null;
  return (
    <div className="completion-banner">
      <div className="completion-emoji">🏆</div>
      <div className="completion-title">DAO Champion Unlocked!</div>
      <p className="completion-text">
        You've read all governance updates this week. The DAO is stronger because you're engaged.
      </p>
    </div>
  );
}

// ── Quest renderer helper ─────────────────────────────────────────────────────
function QuestItem({ quest, isRead, onMarkRead }) {
  return quest.variant === 'sub' ? (
    <SubQuestCard quest={quest} isRead={isRead} onMarkRead={onMarkRead} />
  ) : (
    <QuestCard quest={quest} isRead={isRead} onMarkRead={onMarkRead} />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync }     = useSignMessage();

  const [isSigned,        setIsSigned]        = useState(false);
  const [signing,         setSigning]          = useState(false);
  const [authProof,       setAuthProof]        = useState(null); // { signature, message }
  const [readSet,         setReadSet]          = useState(new Set());
  const [loading,         setLoading]          = useState(false);
  const [toastMsg,        setToastMsg]         = useState('');
  const [toastError,      setToastError]       = useState(false);
  const [selectedWeekId,  setSelectedWeekId]   = useState(DEFAULT_WEEK_ID);
  const [lbRefreshCount,  setLbRefreshCount]   = useState(0);
  const [showAll,         setShowAll]          = useState(false);
  const toastTimer = useRef(null);

  const showToast = useCallback((msg, isError = false) => {
    clearTimeout(toastTimer.current);
    setToastMsg(msg);
    setToastError(isError);
    toastTimer.current = setTimeout(() => setToastMsg(''), isError ? 4000 : 2800);
  }, []);

  const fetchAndSetProgress = useCallback(async (addr) => {
    setLoading(true);
    try {
      const rows = await loadProgress(addr);
      setReadSet(new Set(rows.map((r) => r.quest_id)));

      const staleRows = rows.filter((r) => !r.xp);
      if (staleRows.length > 0) {
        const xpMap = Object.fromEntries(
          WEEKS.flatMap((w) => w.sections.flatMap((s) => s.quests)).map((q) => [q.id, q.xp])
        );
        Promise.all(
          staleRows
            .filter((r) => xpMap[r.quest_id] > 0)
            .map((r) => saveProgress(addr, r.quest_id, xpMap[r.quest_id]))
        ).catch((err) => console.error('XP backfill error:', err));
      }
    } catch (err) {
      console.error(err);
      showToast('Could not load your progress — check Supabase config.', true);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // ── Session restore ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isConnected || !address) {
      setIsSigned(false);
      setAuthProof(null);
      setReadSet(new Set());
      return;
    }
    if (localStorage.getItem('dao_quest_wallet') === address.toLowerCase()) {
      setIsSigned(true);
      // Restore auth proof from sessionStorage (keyed per address so switching
      // wallets never carries over the wrong signature)
      try {
        const stored = sessionStorage.getItem(`auth_proof_${address.toLowerCase()}`);
        if (stored) setAuthProof(JSON.parse(stored));
      } catch { /* ignore malformed data */ }
      fetchAndSetProgress(address);
    }
  }, [address, isConnected, fetchAndSetProgress]);

  // ── Sign-in ───────────────────────────────────────────────────────────────
  const handleSignIn = useCallback(async () => {
    if (!address) return;
    const message =
      `Welcome to ArbitrumDAO Quest Board!\n\n` +
      `Sign this free message to verify wallet ownership and sync your reading progress.\n\n` +
      `No transaction will be sent.\n\nAddress: ${address}`;
    try {
      setSigning(true);
      const signature = await signMessageAsync({ message });
      localStorage.setItem('dao_quest_wallet', address.toLowerCase());
      // Store proof keyed by address so it survives page reloads but is
      // isolated per wallet (sessionStorage is cleared when the tab closes)
      const proof = { signature, message };
      setAuthProof(proof);
      sessionStorage.setItem(`auth_proof_${address.toLowerCase()}`, JSON.stringify(proof));
      setIsSigned(true);
    } catch (err) {
      if (err?.code !== 4001) {
        console.error('Sign-in error:', err);
        showToast('Sign-in failed — please try again.', true);
      }
      setSigning(false);
      return;
    }
    setSigning(false);
    await fetchAndSetProgress(address);
  }, [address, signMessageAsync, fetchAndSetProgress, showToast]);

  // ── Mark quest as read ────────────────────────────────────────────────────
  const markRead = useCallback(async (questId, xp) => {
    setReadSet((prev) => {
      if (prev.has(questId)) return prev;
      return new Set([...prev, questId]);
    });
    showToast(`+${xp} XP — quest marked as read!`);
    setLbRefreshCount((n) => n + 1);

    if (isSigned && address) {
      try {
        await saveProgress(address, questId, xp, authProof);
      } catch (err) {
        console.error(err);
        showToast('Saved locally but failed to sync — check your connection.', true);
      }
    }
  }, [isSigned, address, showToast, authProof]);

  // ── Week change: reset showAll ────────────────────────────────────────────
  const handleWeekChange = useCallback((weekId) => {
    setSelectedWeekId(weekId);
    setShowAll(false);
  }, []);

  // Top 3: first 3 quests from the flattened week list (already ordered by importance)
  const TOP_N = 3;

  const weekQuests = useMemo(
    () => getWeekById(selectedWeekId).sections.flatMap((s) => s.quests),
    [selectedWeekId]
  );
  const allDone = useMemo(
    () => weekQuests.length > 0 && weekQuests.every((q) => readSet.has(q.id)),
    [weekQuests, readSet]
  );

  // ── Auto-expand when all top-3 are read ───────────────────────────────────
  const topQuests3 = useMemo(() => weekQuests.slice(0, TOP_N), [weekQuests]);
  useEffect(() => {
    if (!showAll && topQuests3.length > 0 && topQuests3.every((q) => readSet.has(q.id))) {
      setShowAll(true);
    }
  }, [readSet, topQuests3, showAll]);

  return (
    <PassphraseGate>
      <div className="page">
        {/* ── Header ── */}
        <header className="site-header">
          <div className="logo" aria-label="Arbitrum">
            <svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2L37.3 12V32L20 44L2.7 32V12L20 2Z" fill="#1B2559" stroke="#9DCCED" strokeWidth="1.5"/>
              <path d="M11.5 33L18 14" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M14 35L21 13L28 35" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M17 27H25" stroke="#12AAFF" strokeWidth="2.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="site-brand">
            <div className="site-title">Arbitrum<span className="title-accent">DAO</span> Quest Board</div>
            <div className="site-subtitle">Weekly Governance Digest</div>
          </div>

          <WeekSelector
            weeks={WEEKS}
            currentWeekId={selectedWeekId}
            onChange={handleWeekChange}
          />

          <WalletArea address={address} isSigned={isSigned} />
        </header>

        {/* ── Banners ── */}
        {isConnected && !isSigned && (
          <SignInBanner onSign={handleSignIn} loading={signing} />
        )}
        {!isSupabaseConfigured && (
          <div className="local-only-notice">
            💾 <strong>Local mode</strong> — progress is not saved across sessions.
            Add Supabase credentials to <code>.env</code> to enable persistence.
          </div>
        )}

        {/* ── Two-column content grid ── */}
        <div className="content-grid">
          {/* Left: quests */}
          <div className="quest-col">
            {loading ? (
              <div className="loading-bar">Loading your progress…</div>
            ) : (
              <ProgressSection readSet={readSet} weekQuests={weekQuests} />
            )}

            {/* Top-3 / All toggle header */}
            <div className="updates-header">
              <span className="updates-title">
                {showAll ? 'All Updates This Week' : '✨ Top Updates This Week'}
              </span>
              {showAll && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowAll(false)}
                >
                  ← Show less
                </button>
              )}
            </div>

            {showAll ? (
              /* Full section-by-section view */
              getWeekById(selectedWeekId).sections.map((section) => (
                <div key={section.id}>
                  <div className="section-label">{section.label}</div>
                  <div className={section.id === 'other' ? 'sub-quest-list' : 'quest-list'}>
                    {section.quests.map((quest) => (
                      <QuestItem
                        key={quest.id}
                        quest={quest}
                        isRead={readSet.has(quest.id)}
                        onMarkRead={markRead}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              /* Top 3 flat view + teaser */
              <>
                <div className="quest-list">
                  {topQuests3.map((quest) => (
                    <QuestItem
                      key={quest.id}
                      quest={quest}
                      isRead={readSet.has(quest.id)}
                      onMarkRead={markRead}
                    />
                  ))}
                </div>
                {weekQuests.length > TOP_N && (
                  <button
                    className="more-updates-teaser"
                    onClick={() => setShowAll(true)}
                  >
                    <span>📰</span>
                    <span>
                      <span className="more-updates-count">
                        {weekQuests.length - TOP_N} more
                      </span>
                      {' '}update{weekQuests.length - TOP_N !== 1 ? 's' : ''} this week
                    </span>
                    <span className="more-updates-arrow">↓</span>
                  </button>
                )}
              </>
            )}

            <CompletionBanner show={allDone} />
          </div>

          {/* Right: leaderboard */}
          <aside className="lb-sidebar">
            <Leaderboard
              currentAddress={address}
              authProof={authProof}
              refreshTrigger={lbRefreshCount}
            />
          </aside>
        </div>

        <Toast msg={toastMsg} isError={toastError} />
      </div>
    </PassphraseGate>
  );
}
