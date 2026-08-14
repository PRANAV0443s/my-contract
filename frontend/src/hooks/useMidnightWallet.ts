import { useState, useCallback } from 'react';

declare global {
  interface Window {
    midnight?: Record<string, any>;
  }
}

export function useMidnightWallet() {
  const [walletApi, setWalletApi] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connect = useCallback(async () => {
    setError(null);
    setConnecting(true);
    try {
      const midnightProviders = window.midnight;
      if (!midnightProviders || Object.keys(midnightProviders).length === 0) {
        throw new Error(
          'No Midnight wallet found. Install the Lace Midnight Preview extension and refresh this page.'
        );
      }

      const key = Object.keys(midnightProviders)[0];
      const provider = midnightProviders[key];

      const api = await provider.connect('preview');
      setWalletApi(api);

      const raw = await api.getUnshieldedAddress();
      setAddress(raw.unshieldedAddress);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setConnecting(false);
    }
  }, []);

  return { walletApi, address, error, connecting, connect };
}
