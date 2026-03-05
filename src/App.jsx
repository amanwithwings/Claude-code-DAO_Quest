import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useAccount, useSignMessage }               from 'wagmi';
import { ConnectButton }                            from '@rainbow-me/rainbowkit';

import { WEEKS, DEFAULT_WEEK_ID, getWeekById }      from './data/quests';
import { loadProgress, saveProgress, isSupabaseConfigured } from './lib/supabase';
import { ProgressSection }                          from './components/ProgressSection';
import { QuestCard, SubQuestCard }                  from './components/QuestCard';
import { WeekSelector }                             from './components/WeekSelector';
import { Leaderboard }                              from './components/Leaderboard';

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

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync }     = useSignMessage();

  const [isSigned,        setIsSigned]        = useState(false);
  const [signing,         setSigning]          = useState(false);
  const [readSet,         setReadSet]          = useState(new Set());
  const [loading,         setLoading]          = useState(false);
  const [toastMsg,        setToastMsg]         = useState('');
  const [toastError,      setToastError]       = useState(false);
  const [selectedWeekId,  setSelectedWeekId]   = useState(DEFAULT_WEEK_ID);
  const [lbRefreshCount,  setLbRefreshCount]   = useState(0);
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
      const rows = await loadProgress(addr); // [{quest_id, xp}]
      setReadSet(new Set(rows.map((r) => r.quest_id)));

      // Backfill XP for rows saved before the xp column was added (xp === 0).
      // This fixes leaderboard totals for existing users without any manual step.
      const staleRows = rows.filter((r) => !r.xp);
      if (staleRows.length > 0) {
        const xpMap = Object.fromEntries(
          WEEKS.flatMap((w) => w.sections.flatMap((s) => s.quests)).map((q) => [q.id, q.xp])
        );
        // Fire-and-forget; non-critical so we don't block the UI
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
      setReadSet(new Set());
      return;
    }
    if (localStorage.getItem('dao_quest_wallet') === address.toLowerCase()) {
      setIsSigned(true);
      fetchAndSetProgress(address);
    }
  }, [address, isConnected, fetchAndSetProgress]);

  // ── Sign-in ───────────────────────────────────────────────────────────────
  const handleSignIn = useCallback(async () => {
    if (!address) return;
    try {
      setSigning(true);
      await signMessageAsync({
        message:
          `Welcome to ArbitrumDAO Quest Board!\n\n` +
          `Sign this free message to verify wallet ownership and sync your reading progress.\n\n` +
          `No transaction will be sent.\n\nAddress: ${address}`,
      });
      localStorage.setItem('dao_quest_wallet', address.toLowerCase());
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
    setLbRefreshCount((n) => n + 1); // nudge leaderboard to refresh

    if (isSigned && address) {
      try {
        await saveProgress(address, questId, xp);
      } catch (err) {
        console.error(err);
        showToast('Saved locally but failed to sync — check your connection.', true);
      }
    }
  }, [isSigned, address, showToast]);

  // Stable references — only recompute when the selected week changes, not on
  // every render (prevents ProgressSection thrashing on every markRead).
  const weekQuests = useMemo(
    () => getWeekById(selectedWeekId).sections.flatMap((s) => s.quests),
    [selectedWeekId]
  );
  const allDone = useMemo(
    () => weekQuests.length > 0 && weekQuests.every((q) => readSet.has(q.id)),
    [weekQuests, readSet]
  );

  return (
    <div className="page">
      {/* ── Header ── */}
      <header className="site-header">
        <div className="logo" aria-label="Arbitrum">
          <svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer hexagon — navy fill, sky blue stroke */}
            <path d="M20 2L37.3 12V32L20 44L2.7 32V12L20 2Z" fill="#1B2559" stroke="#9DCCED" strokeWidth="1.5"/>
            {/* Left slash */}
            <path d="M11.5 33L18 14" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round"/>
            {/* Right slash / A shape */}
            <path d="M14 35L21 13L28 35" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            {/* Crossbar — Electric Blue */}
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
          onChange={setSelectedWeekId}
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

          {getWeekById(selectedWeekId).sections.map((section) => (
            <div key={section.id}>
              <div className="section-label">{section.label}</div>
              <div className={section.id === 'other' ? 'sub-quest-list' : 'quest-list'}>
                {section.quests.map((quest) =>
                  quest.variant === 'sub' ? (
                    <SubQuestCard
                      key={quest.id}
                      quest={quest}
                      isRead={readSet.has(quest.id)}
                      onMarkRead={markRead}
                    />
                  ) : (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      isRead={readSet.has(quest.id)}
                      onMarkRead={markRead}
                    />
                  )
                )}
              </div>
            </div>
          ))}

          <CompletionBanner show={allDone} />
        </div>

        {/* Right: leaderboard */}
        <aside className="lb-sidebar">
          <Leaderboard
            currentAddress={address}
            refreshTrigger={lbRefreshCount}
          />
        </aside>
      </div>

      <Toast msg={toastMsg} isError={toastError} />
    </div>
  );
}
