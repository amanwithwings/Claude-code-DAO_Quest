import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { wagmiConfig } from './lib/wagmiConfig';
import App from './App';

import '@rainbow-me/rainbowkit/styles.css';
import './App.css';

const queryClient = new QueryClient();

// Note: React.StrictMode is intentionally omitted here. wagmi v2 uses mutation
// hooks that are sensitive to React 18's double-invoking behaviour in Strict
// Mode — it causes the wallet reconnect effect to fire twice, which breaks the
// "wallet connected → UI updates" flow without a manual page refresh.
ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor:           '#28A0F0',
          accentColorForeground: '#ffffff',
          borderRadius:          'medium',
          fontStack:             'system',
        })}
      >
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
