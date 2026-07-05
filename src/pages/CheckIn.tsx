import { useState } from 'react';
import type { AppData } from '../App';

interface Props {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  todayCheckIn?: { id: string; date: string; status: string; time: string };
  onNavigate: (page: 'home' | 'checkin' | 'meds' | 'messages' | 'health' | 'settings') => void;
}

export default function CheckIn({ data, setData, todayCheckIn, onNavigate }: Props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'okay' | 'need_help' | null>(null);

  const handleCheckIn = (status: 'okay' | 'need_help') => {
    setSelectedStatus(status);
    setShowConfirmation(true);
  };

  const confirmCheckIn = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newCheckIn = {
      id: `checkin-${Date.now()}`,
      date: now.toDateString(),
      status: selectedStatus!,
      time,
    };

    setData(prev => ({
      ...prev,
      checkIns: [newCheckIn, ...prev.checkIns],
    }));

    setShowConfirmation(false);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <button 
          className="btn btn-secondary"
          onClick={() => onNavigate('home')}
          style={{ marginBottom: 'var(--space-md)' }}
        >
          ← Back
        </button>
        <h1 className="section-title">❤️ Daily Check-In</h1>
      </div>

      {/* Date Display */}
      <div className="card" style={{ background: 'var(--color-primary)', color: 'white', marginBottom: 'var(--space-xl)' }}>
        <p style={{ textAlign: 'center', fontSize: 'var(--font-size-xl)' }}>{today}</p>
      </div>

      {/* Check-In Card */}
      <div className="card">
        {todayCheckIn ? (
          // Already checked in
          <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
            <div style={{ fontSize: 80, marginBottom: 'var(--space-lg)' }}>
              {todayCheckIn.status === 'okay' ? '✅' : '🆘'}
            </div>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
              {todayCheckIn.status === 'okay' 
                ? "You're all checked in!" 
                : 'Help is on the way!'}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
              Checked in at {todayCheckIn.time}
            </p>
            <button 
              className="btn btn-primary btn-lg btn-block"
              onClick={() => onNavigate('home')}
            >
              🏠 Back to Home
            </button>
          </div>
        ) : showConfirmation ? (
          // Confirmation screen
          <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
            <div style={{ fontSize: 80, marginBottom: 'var(--space-lg)' }}>
              {selectedStatus === 'okay' ? '😊' : '🆘'}
            </div>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
              {selectedStatus === 'okay' 
                ? "You're feeling okay?" 
                : 'You need help?'}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
              {selectedStatus === 'okay'
                ? "Your family will know you're doing well!"
                : "Your family will be notified right away!"}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexDirection: 'column' }}>
              <button 
                className="btn btn-primary btn-lg btn-block"
                onClick={confirmCheckIn}
              >
                ✓ Yes, Confirm
              </button>
              <button 
                className="btn btn-secondary btn-lg btn-block"
                onClick={() => setShowConfirmation(false)}
              >
                ← Go Back
              </button>
            </div>
          </div>
        ) : (
          // Check-in options
          <>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
              <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-md)' }}>
                👋 Hello! How are you feeling today?
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Tap one of the buttons below to let your family know.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <button 
                className="btn btn-success btn-lg btn-block"
                onClick={() => handleCheckIn('okay')}
              >
                <span style={{ fontSize: 40, marginRight: 'var(--space-md)' }}>😊</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)' }}>I'm Okay</div>
                  <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9, marginTop: 4 }}>
                    Feeling well, no concerns
                  </div>
                </div>
              </button>

              <button 
                className="btn btn-warning btn-lg btn-block"
                onClick={() => handleCheckIn('need_help')}
              >
                <span style={{ fontSize: 40, marginRight: 'var(--space-md)' }}>🆘</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)' }}>I Need Help</div>
                  <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9, marginTop: 4 }}>
                    I have a concern or need assistance
                  </div>
                </div>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Info Card */}
      <div className="card" style={{ background: 'var(--color-secondary-light)', background: 'rgba(78, 159, 159, 0.1)', marginTop: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <span style={{ fontSize: 32 }}>💡</span>
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Why Check-In Matters</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              A simple daily check-in gives your family peace of mind. It only takes a moment and helps them know you're doing well!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
