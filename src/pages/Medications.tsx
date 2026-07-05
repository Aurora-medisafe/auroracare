import { useState } from 'react';
import type { Translations } from '../App';

interface Props {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  onNavigate: (page: 'home' | 'checkin' | 'meds' | 'messages' | 'health' | 'settings') => void;
  t: Translations;
}

export default function Medications({ data, setData, onNavigate, t }: Props) {
  const { medications } = data;
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const takenCount = medications.filter((m: any) => m.taken).length;
  const totalCount = medications.length;

  const handleTakeMed = (id: string) => {
    setConfirmId(id);
  };

  const confirmTake = () => {
    setData((prev: any) => ({
      ...prev,
      medications: prev.medications.map((m: any) =>
        m.id === confirmId ? { ...m, taken: true } : m
      ),
    }));
    setConfirmId(null);
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
        <h1 className="section-title">💊 {t.medications}</h1>
      </div>

      <div className="card" style={{ background: 'var(--color-primary)', color: 'white', marginBottom: 'var(--space-xl)' }}>
        <p style={{ textAlign: 'center', fontSize: 'var(--font-size-xl)' }}>{today}</p>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
          <h2 style={{ fontWeight: 600 }}>{t.todaysProgress}</h2>
          <span className="badge badge-success">
            {takenCount}/{totalCount} {t.taken}
          </span>
        </div>
        <div style={{ 
          height: 12, 
          background: 'var(--color-border)', 
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${totalCount > 0 ? (takenCount / totalCount) * 100 : 0}%`,
            background: 'var(--color-success)',
            borderRadius: 'var(--radius-full)',
            transition: 'width var(--transition-normal)'
          }} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>{t.schedule}</h2>
        
        {medications.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div className="empty-icon">💊</div>
              <p className="empty-title">{t.noMedications}</p>
            </div>
          </div>
        ) : (
          medications.map((med: any) => (
            <div key={med.id} className="med-card">
              <div className="med-info">
                <span className="med-icon">💊</span>
                <div>
                  <div className="med-name">{med.name}</div>
                  <div className="med-time">
                    ⏰ {med.time} • {med.dosage}
                  </div>
                </div>
              </div>
              
              {med.taken ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <span className="badge badge-success">{t.taken}</span>
                </div>
              ) : confirmId === med.id ? (
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <button 
                    className="btn btn-success"
                    onClick={confirmTake}
                    style={{ minHeight: 56, padding: '12px 16px' }}
                  >
                    ✓ {t.yes}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setConfirmId(null)}
                    style={{ minHeight: 56, padding: '12px 16px' }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-success"
                  onClick={() => handleTakeMed(med.id)}
                  style={{ minHeight: 56, padding: '12px 20px' }}
                >
                  ✓ {t.taken}
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {takenCount === totalCount && totalCount > 0 && (
        <div className="alert-banner alert-banner-success">
          <span className="alert-icon">🎉</span>
          <div className="alert-content">
            <div className="alert-title">{t.allDone}</div>
            <div className="alert-message">{t.allTakenToday}</div>
          </div>
        </div>
      )}

      <div className="card" style={{ background: 'rgba(78, 159, 159, 0.1)', marginTop: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <span style={{ fontSize: 32 }}>ℹ️</span>
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>{t.aboutMedications}</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {t.aboutMedsDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
