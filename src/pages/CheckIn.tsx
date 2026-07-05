import { useState } from 'react';
import type { Translations } from '../App';

interface Props {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  todayCheckIn?: { id: string; date: string; status: string; time: string };
  onNavigate: (page: 'home' | 'checkin' | 'meds' | 'messages' | 'health' | 'settings') => void;
  t: Translations;
}

export default function CheckIn({ data, setData, todayCheckIn, onNavigate, t }: Props) {
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

    setData((prev: any) => ({
      ...prev,
      checkIns: [newCheckIn, ...prev.checkIns],
    }));

    setShowConfirmation(false);
  };

  const today = new Date().toLocaleDateString(data.language === 'zh' ? 'zh-CN' : data.language === 'my' ? 'my-MM' : 'en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <button 
          className="btn btn-secondary"
          onClick={() => onNavigate('home')}
          style={{ marginBottom: 'var(--space-md)' }}
        >
          ← {t.back}
        </button>
        <h1 className="section-title">❤️ {t.dailyCheckIn}</h1>
      </div>

      <div className="card" style={{ background: 'var(--color-primary)', color: 'white', marginBottom: 'var(--space-xl)' }}>
        <p style={{ textAlign: 'center', fontSize: 'var(--font-size-xl)' }}>{today}</p>
      </div>

      <div className="card">
        {todayCheckIn ? (
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
              {t.checkedInAt} {todayCheckIn.time}
            </p>
            <button 
              className="btn btn-primary btn-lg btn-block"
              onClick={() => onNavigate('home')}
            >
              🏠 {t.backToHome}
            </button>
          </div>
        ) : showConfirmation ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
            <div style={{ fontSize: 80, marginBottom: 'var(--space-lg)' }}>
              {selectedStatus === 'okay' ? '😊' : '🆘'}
            </div>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
              {selectedStatus === 'okay' ? t.imOkay : t.iNeedHelp}
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
                ✓ {t.yesConfirm}
              </button>
              <button 
                className="btn btn-secondary btn-lg btn-block"
                onClick={() => setShowConfirmation(false)}
              >
                ← {t.goBack}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
              <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-md)' }}>
                👋 {t.howFeelingToday}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {t.tapBelow}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <button 
                className="btn btn-success btn-lg btn-block"
                onClick={() => handleCheckIn('okay')}
              >
                <span style={{ fontSize: 40, marginRight: 'var(--space-md)' }}>😊</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)' }}>{t.imOkay}</div>
                  <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9, marginTop: 4 }}>{t.feelingWell}</div>
                </div>
              </button>

              <button 
                className="btn btn-warning btn-lg btn-block"
                onClick={() => handleCheckIn('need_help')}
              >
                <span style={{ fontSize: 40, marginRight: 'var(--space-md)' }}>🆘</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)' }}>{t.iNeedHelp}</div>
                  <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9, marginTop: 4 }}>{t.needAssistance}</div>
                </div>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="card" style={{ background: 'rgba(78, 159, 159, 0.1)', marginTop: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <span style={{ fontSize: 32 }}>💡</span>
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>{t.whyCheckInMatters}</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {t.checkInDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
