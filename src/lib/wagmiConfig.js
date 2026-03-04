import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, mainnet } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'ArbitrumDAO Quest Board',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID',
  // Arbitrum first so it's the default chain shown in the connect modal
  chains: [arbitrum, mainnet],
  ssr: false,
});
