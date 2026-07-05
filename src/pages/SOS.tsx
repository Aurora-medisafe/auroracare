import { useState, useRef, useEffect } from 'react';
import type { Translations } from '../App';

interface Props {
  onClose: () => void;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  t: Translations;
}

type SOSState = 'idle' | 'holding' | 'confirming' | 'sent' | 'cancelled';

export default function SOS({ onClose, data, setData, t }: Props) {
  const [state, setState] = useState<SOSState>('idle');
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimer = useRef<number | null>(null);
  const progressInterval = useRef<number | null>(null);

  const { contacts } = data;
  const contact1 = contacts?.[0];
  const contact2 = contacts?.[1];
  
  const HOLD_DURATION = 1200;

  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const startHold = () => {
    setState('holding');
    
    let elapsed = 0;
    progressInterval.current = window.setInterval(() => {
      elapsed += 50;
      setHoldProgress(Math.min(elapsed / HOLD_DURATION, 1));
      
      if (elapsed >= HOLD_DURATION) {
        if (progressInterval.current) clearInterval(progressInterval.current);
        confirmSOS();
      }
    }, 50);

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

    setTimeout(() => {
      setState('sent');
      
      const alert = {
        id: `sos-${Date.now()}`,
        date: new Date().toDateString(),
        status: 'sent',
        time: new Date().toLocaleTimeString(),
      };

      setData((prev: any) => ({
        ...prev,
        checkIns: [alert, ...prev.checkIns],
      }));
    }, 1500);
  };

  useEffect(() => {
    if (state === 'sent') {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state, onClose]);

  if (state === 'sent') {
    return (
      <div className="modal-overlay" style={{ background: 'var(--color-background)' }}>
        <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
          <div style={{ fontSize: 100, marginBottom: 'var(--space-xl)' }}>✅</div>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
            {t.sosSent}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
            {t.familyAlerted}
          </p>
          
          {/* Call Buttons After Sent */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {contact1 && (
              <a 
                href={`tel:${contact1.phone}`}
                className="btn btn-success btn-lg"
                style={{ 
                  minHeight: 80, 
                  padding: 'var(--space-lg)',
                  textDecoration: 'none',
                  fontSize: 'var(--font-size-xl)'
                }}
              >
                📞 Call 1: {contact1.phone}
              </a>
            )}
            {contact2 && (
              <a 
                href={`tel:${contact2.phone}`}
                className="btn btn-success btn-lg"
                style={{ 
                  minHeight: 80, 
                  padding: 'var(--space-lg)',
                  textDecoration: 'none',
                  fontSize: 'var(--font-size-xl)'
                }}
              >
                📞 Call 2: {contact2.phone}
              </a>
            )}
          </div>
          
          <button 
            className="btn btn-primary btn-lg"
            onClick={onClose}
            style={{ minHeight: 80, padding: 'var(--space-lg) var(--space-xxl)', marginTop: 'var(--space-lg)' }}
          >
            🏠 {t.backToHome}
          </button>
        </div>
      </div>
    );
  }

  if (state === 'confirming') {
    return (
      <div className="modal-overlay" style={{ background: 'var(--color-background)' }}>
        <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
          <div style={{ fontSize: 100, marginBottom: 'var(--space-xl)' }}>📨</div>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700 }}>
            {t.sending}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-md)' }}>
            {t.alertingFamily}
          </p>
        </div>
      </div>
    );
  }

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

        <h1 style={{ 
          fontSize: 'var(--font-size-3xl)', 
          fontWeight: 700, 
          color: 'var(--color-danger)',
          textAlign: 'center',
          marginBottom: 'var(--space-md)'
        }}>
          {t.emergencySOS}
        </h1>
        
        <p style={{ 
          color: 'var(--color-text-secondary)', 
          textAlign: 'center',
          marginBottom: 'var(--space-xl)'
        }}>
          {state === 'holding' ? t.keepHolding : t.holdToActivate}
        </p>

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
            {state === 'holding' ? t.sending : 'SOS'}
          </span>
        </button>

        {state === 'holding' && (
          <p style={{ 
            color: 'var(--color-text-muted)', 
            marginTop: 'var(--space-xl)',
            fontSize: 'var(--font-size-lg)'
          }}>
            {t.releaseToCancel}
          </p>
        )}

        {/* Direct Call Buttons */}
        <div style={{ marginTop: 'var(--space-xxl)', width: '100%' }}>
          <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
            📞 Quick Call
          </h3>
          
          {/* Call 1 */}
          {contact1 && (
            <a 
              href={`tel:${contact1.phone}`}
              style={{
                display: 'block',
                background: 'var(--color-success)',
                color: 'white',
                padding: 'var(--space-xl)',
                borderRadius: 16,
                marginBottom: 'var(--space-md)',
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 'var(--space-sm)' }}>📞</div>
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 4 }}>
                Call 1
              </div>
              <div style={{ fontSize: 'var(--font-size-lg)', opacity: 0.9 }}>
                {contact1.phone}
              </div>
            </a>
          )}
          
          {/* Call 2 */}
          {contact2 && (
            <a 
              href={`tel:${contact2.phone}`}
              style={{
                display: 'block',
                background: 'var(--color-secondary)',
                color: 'white',
                padding: 'var(--space-xl)',
                borderRadius: 16,
                marginBottom: 'var(--space-md)',
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 'var(--space-sm)' }}>📞</div>
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 4 }}>
                Call 2
              </div>
              <div style={{ fontSize: 'var(--font-size-lg)', opacity: 0.9 }}>
                {contact2.phone}
              </div>
            </a>
          )}
        </div>

        <div className="card" style={{ marginTop: 'var(--space-xl)', width: '100%' }}>
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            <span style={{ fontSize: 24 }}>ℹ️</span>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              <strong>{t.whenYouSendSOS}</strong>
              <ul style={{ marginTop: 'var(--space-sm)', paddingLeft: 'var(--space-lg)' }}>
                <li>• {t.emergencyNotification}</li>
                <li>• {t.yourCurrentLocation}</li>
                <li>• {t.directLink}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
