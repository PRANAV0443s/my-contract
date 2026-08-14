import { useState } from 'react';
import { useMidnightWallet } from './hooks/useMidnightWallet';
import './App.css';

function App() {
  const { address, error, connecting, connect } = useMidnightWallet();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleStore = async () => {
    if (!address) return;
    setStatus('Submitting is wired up next — contract call comes in the following step.');
  };

  const shortAddress =
    address && address.length > 20
      ? `${address.slice(0, 12)}...${address.slice(-6)}`
      : address;

  return (
    <div style={{ maxWidth: 480, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h1>idea-vault</h1>
      <p>New Moon → Full Moon: a commit/reveal vault for ideas.</p>

      {!address ? (
        <button onClick={connect} disabled={connecting}>
          {connecting ? 'Connecting...' : 'Connect Lace Wallet'}
        </button>
      ) : (
        <div>
          <p>
            <strong>Connected:</strong> {shortAddress}
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your idea..."
            rows={4}
            style={{ width: '100%' }}
          />
          <button onClick={handleStore} disabled={!message}>
            Store on-chain
          </button>
          {status && <p>{status}</p>}
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
