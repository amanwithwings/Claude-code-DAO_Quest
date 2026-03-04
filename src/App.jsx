import { useState, useEffect, useCallback, useRef } from 'react';
import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { ConnectButton }                             from '@rainbow-me/rainbowkit';
import { ALL_QUESTS, QUEST_SECTIONS }                from './data/quests';
import { loadProgress, saveProgress }               from './lib/supabase';
import { ProgressSection }                           from './components/ProgressSection';
import { QuestCard, SubQuestCard }                   from './components/QuestCard';

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

// ── Wallet area in header ─────────────────────────────────────────────────────
function WalletArea({ address, isSigned, onSign, signing }) {
  const { disconnect } = useDisconnect();

  if (!address) {
    return (
      <div className="wallet-area">
        <ConnectButton
          label="Connect Wallet"
          accountStatus="avatar"
          chainStatus="none"
          showBalance={false}
        />
      </div>
    );
  }

  return (
    <div className="wallet-area">
      <ConnectButton
        accountStatus="avatar"
        chainStatus="none"
        showBalance={false}
      />
      {isSigned && (
        <div className="signed-badge" title={address}>
          <span className="signed-dot" /> syncing
        </div>
      )}
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg }) {
  return (
    <div className={`toast ${msg ? 'visible' : ''}`}>
      <span>✓</span> {msg}
    </div>
  );
}

// ── Completion Banner ─────────────────────────────────────────────────────────
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

  const [isSigned,  setIsSigned]  = useState(false);
  const [signing,   setSigning]   = useState(false);
  const [readSet,   setReadSet]   = useState(new Set());
  const [loading,   setLoading]   = useState(false);
  const [toastMsg,  setToastMsg]  = useState('');
  const toastTimer                = useRef(null);

  // ── Restore session from localStorage on mount / address change ─────────────
  useEffect(() => {
    if (!isConnected || !address) {
      setIsSigned(false);
      setReadSet(new Set());
      return;
    }
    const saved = localStorage.getItem('dao_quest_wallet');
    if (saved === address.toLowerCase()) {
      setIsSigned(true);
      setLoading(true);
      loadProgress(address)
        .then((ids) => setReadSet(new Set(ids)))
        .finally(() => setLoading(false));
    }
  }, [address, isConnected]);

  // ── Sign-in ─────────────────────────────────────────────────────────────────
  const handleSignIn = useCallback(async () => {
    if (!address) return;
    try {
      setSigning(true);
      await signMessageAsync({
        message:
          `Welcome to ArbitrumDAO Quest Board!\n\n` +
          `Sign this free message to verify wallet ownership and sync your reading progress.\n\n` +
          `No transaction will be sent.\n\n` +
          `Address: ${address}`,
      });
      localStorage.setItem('dao_quest_wallet', address.toLowerCase());
      setIsSigned(true);
      setLoading(true);
      const ids = await loadProgress(address);
      setReadSet(new Set(ids));
    } catch (err) {
      if (err?.code !== 4001) console.error('Sign-in error:', err); // ignore user rejection
    } finally {
      setSigning(false);
      setLoading(false);
    }
  }, [address, signMessageAsync]);

  // ── Mark quest as read ──────────────────────────────────────────────────────
  const markRead = useCallback(async (questId, xp) => {
    setReadSet((prev) => {
      if (prev.has(questId)) return prev;
      return new Set([...prev, questId]);
    });

    if (isSigned && address) {
      await saveProgress(address, questId);
    }

    // Toast
    clearTimeout(toastTimer.current);
    setToastMsg(`+${xp} XP — quest marked as read!`);
    toastTimer.current = setTimeout(() => setToastMsg(''), 2800);
  }, [isSigned, address]);

  const allDone = readSet.size >= ALL_QUESTS.length;

  return (
    <div className="page">
      {/* ── Header ── */}
      <header className="site-header">
        <div className="logo">A</div>
        <div>
          <div className="site-title">ArbitrumDAO Quest Board</div>
          <div className="site-subtitle">Weekly Governance Digest</div>
        </div>
        <div className="date-badge">📅 Week of Mar 4, 2026</div>
        <WalletArea
          address={address}
          isSigned={isSigned}
          onSign={handleSignIn}
          signing={signing}
        />
      </header>

      {/* ── Sign-in prompt (shown when connected but not signed) ── */}
      {isConnected && !isSigned && (
        <SignInBanner onSign={handleSignIn} loading={signing} />
      )}

      {/* ── Progress ── */}
      {loading ? (
        <div className="loading-bar">Loading your progress…</div>
      ) : (
        <ProgressSection readSet={readSet} />
      )}

      {/* ── Quest sections ── */}
      {QUEST_SECTIONS.map((section) => (
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
      <Toast msg={toastMsg} />
    </div>
  );
}
