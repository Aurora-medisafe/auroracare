import { useState, useRef, useEffect } from 'react';
import type { AppData } from '../App';

interface Props {
  onClose: () => void;
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
}

type SOSState = 'idle' | 'holding' | 'confirming' | 'sent' | 'cancelled';

export default function SOS({ onClose, data, setData }: Props) {
  const [state, setState] = useState<SOSState>('idle');
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimer = useRef<number | null>(null);
  const progressInterval = useRef<number | null>(null);

  const HOLD_DURATION = 1500; // 1.5 seconds

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const startHold = () => {
    setState('holding');
    
    // Progress update
    let elapsed = 0;
    progressInterval.current = window.setInterval(() => {
      elapsed += 50;
      setHoldProgress(Math.min(elapsed / HOLD_DURATION, 1));
      
      if (elapsed >= HOLD_DURATION) {
        if (progressInterval.current) clearInterval(progressInterval.current);
        confirmSOS();
      }
    }, 50);

    // Vibration feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const cancelHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (progressInterval.current) clearInterval(progressInterval.current);
    setState('idle');
    setHoldProgress(0);
  };

  const confirmSOS = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
    
    setState('confirming');

    // Simulate sending alert
    setTimeout(() => {
      setState('sent');
      
      // Store alert in data (would be sent to Firebase in production)
      const alert = {
        id: `sos-${Date.now()}`,
        date: new Date().toDateString(),
        status: 'sent' as const,
        time: new Date().toLocaleTimeString(),
      };

      setData(prev => ({
        ...prev,
        checkIns: [alert, ...prev.checkIns],
      }));
    }, 1500);
  };

  // Handle sent state - auto close after delay
  useEffect(() => {
    if (state === 'sent') {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state, onClose]);

  // Sent state
  if (state === 'sent') {
    return (
      <div className="modal-overlay" style={{ background: 'var(--color-background)' }}>
        <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
          <div style={{ fontSize: 100, marginBottom: 'var(--space-xl)' }}>✅</div>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
            SOS Sent!
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
            Your family has been alerted and will help you soon.
          </p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={onClose}
            style={{ minHeight: 80, padding: 'var(--space-lg) var(--space-xxl)' }}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Confirming state
  if (state === 'confirming') {
    return (
      <div className="modal-overlay" style={{ background: 'var(--color-background)' }}>
        <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
          <div style={{ fontSize: 100, marginBottom: 'var(--space-xl)' }}>📨</div>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700 }}>
            Sending...
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-md)' }}>
            Alerting your family now.
          </p>
        </div>
      </div>
    );
  }

  // Idle/Holding state
  return (
    <div className="modal-overlay" style={{ background: 'var(--color-background)' }}>
      <div style={{ 
        maxWidth: 500, 
        width: '100%', 
        padding: 'var(--space-xl)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Close Button */}
        <button 
          className="modal-close"
          onClick={state === 'holding' ? cancelHold : onClose}
          style={{ 
            alignSelf: 'flex-end',
            marginBottom: 'var(--space-xl)'
          }}
        >
          ✕
        </button>

        {/* Title */}
        <h1 style={{ 
          fontSize: 'var(--font-size-3xl)', 
          fontWeight: 700, 
          color: 'var(--color-danger)',
          textAlign: 'center',
          marginBottom: 'var(--space-md)'
        }}>
          Emergency SOS
        </h1>
        
        <p style={{ 
          color: 'var(--color-text-secondary)', 
          textAlign: 'center',
          marginBottom: 'var(--space-xxl)'
        }}>
          {state === 'holding'
            ? 'Keep holding to send alert...'
            : 'Hold the button for 1.5 seconds to send emergency alert to your family'}
        </p>

        {/* SOS Button */}
        <button
          className="sos-button btn-icon-lg"
          onMouseDown={startHold}
          onMouseUp={cancelHold}
          onTouchStart={startHold}
          onTouchEnd={cancelHold}
          style={{
            background: state === 'holding' ? 'var(--color-danger-dark)' : 'var(--color-danger)',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-label="Emergency SOS Button - Hold to activate"
        >
          {/* Progress Ring */}
          {state === 'holding' && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${holdProgress * 100}%`,
              background: 'rgba(0, 0, 0, 0.2)',
              transition: 'width 50ms linear',
            }} />
          )}
          
          <span style={{ position: 'relative', zIndex: 1 }}>🆘</span>
          <span style={{ fontSize: 18, marginTop: 4, position: 'relative', zIndex: 1 }}>
            {state === 'holding' ? 'Sending...' : 'SOS'}
          </span>
        </button>

        {state === 'holding' && (
          <p style={{ 
            color: 'var(--color-text-muted)', 
            marginTop: 'var(--space-xl)',
            fontSize: 'var(--font-size-lg)'
          }}>
            Release to cancel
          </p>
        )}

        {/* Info */}
        <div className="card" style={{ marginTop: 'var(--space-xxl)', width: '100%' }}>
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            <span style={{ fontSize: 24 }}>ℹ️</span>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              <strong>When you send an SOS:</strong>
              <ul style={{ marginTop: 'var(--space-sm)', paddingLeft: 'var(--space-lg)' }}>
                <li>• Emergency notification to family</li>
                <li>• Your current location</li>
                <li>• Direct link to contact you</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
