import { useState, useEffect } from 'react';
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', dosage: '', time: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [editTime, setEditTime] = useState('');
  const [reminderPermission, setReminderPermission] = useState<NotificationPermission>('default');

  // Check notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setReminderPermission(Notification.permission);
    }
  }, []);

  // Request notification permission
  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setReminderPermission(permission);
    }
  };

  // Schedule reminders for all medications
  useEffect(() => {
    if (reminderPermission !== 'granted') return;

    const scheduleReminders = () => {
      medications.forEach((med: any) => {
        if (!med.reminderEnabled) return;
        
        const [hours, minutes] = med.time.split(':').map(Number);
        const now = new Date();
        const reminderTime = new Date();
        reminderTime.setHours(hours, minutes, 0, 0);
        
        // If time has passed today, schedule for tomorrow
        if (reminderTime <= now) {
          reminderTime.setDate(reminderTime.getDate() + 1);
        }
        
        const timeUntilReminder = reminderTime.getTime() - now.getTime();
        
        if (timeUntilReminder > 0 && timeUntilReminder < 24 * 60 * 60 * 1000) {
          setTimeout(() => {
            new Notification('💊 Time for Medication', {
              body: `Take ${med.name} (${med.dosage})`,
              icon: '💊',
              tag: `med-${med.id}`,
              requireInteraction: true,
            });
            
            // Vibrate if supported
            if ('vibrate' in navigator) {
              navigator.vibrate([200, 100, 200]);
            }
          }, timeUntilReminder);
        }
      });
    };

    scheduleReminders();
    // Reschedule every hour
    const interval = setInterval(scheduleReminders, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [medications, reminderPermission]);

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

  const handleAddMed = () => {
    if (!newMed.name || !newMed.dosage || !newMed.time) return;
    
    setData((prev: any) => ({
      ...prev,
      medications: [
        ...prev.medications,
        {
          id: `med-${Date.now()}`,
          name: newMed.name,
          dosage: newMed.dosage,
          time: newMed.time,
          taken: false,
          reminderEnabled: true,
        },
      ],
    }));
    
    setNewMed({ name: '', dosage: '', time: '' });
    setShowAddForm(false);
  };

  const handleDeleteMed = (id: string) => {
    setData((prev: any) => ({
      ...prev,
      medications: prev.medications.filter((m: any) => m.id !== id),
    }));
  };

  const toggleReminder = (id: string) => {
    setData((prev: any) => ({
      ...prev,
      medications: prev.medications.map((m: any) =>
        m.id === id ? { ...m, reminderEnabled: !m.reminderEnabled } : m
      ),
    }));
  };

  const startEditTime = (id: string, currentTime: string) => {
    setEditId(id);
    setEditTime(currentTime);
  };

  const saveEditTime = () => {
    if (editId && editTime) {
      setData((prev: any) => ({
        ...prev,
        medications: prev.medications.map((m: any) =>
          m.id === editId ? { ...m, time: editTime } : m
        ),
      }));
    }
    setEditId(null);
    setEditTime('');
  };

  const cancelEditTime = () => {
    setEditId(null);
    setEditTime('');
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="section-title">💊 {t.medications}</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Add Medication Form */}
      {showAddForm && (
        <div className="card" style={{ marginBottom: 'var(--space-xl)', background: 'var(--color-primary-light)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>➕ Add New Medication</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <input
              type="text"
              placeholder="Medication name (e.g., Metformin)"
              value={newMed.name}
              onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              style={{
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid var(--color-border)',
                fontSize: 'var(--font-size-lg)',
              }}
            />
            <input
              type="text"
              placeholder="Dosage (e.g., 500mg)"
              value={newMed.dosage}
              onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
              style={{
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid var(--color-border)',
                fontSize: 'var(--font-size-lg)',
              }}
            />
            <input
              type="time"
              value={newMed.time}
              onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
              style={{
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid var(--color-border)',
                fontSize: 'var(--font-size-lg)',
              }}
            />
            <button 
              className="btn btn-success btn-lg"
              onClick={handleAddMed}
              disabled={!newMed.name || !newMed.dosage || !newMed.time}
            >
              ✓ Add Medication
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notification Permission Banner */}
      {reminderPermission !== 'granted' && (
        <div className="card" style={{ background: 'var(--color-warning-light)', marginBottom: 'var(--space-xl)', border: '2px solid var(--color-warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <span style={{ fontSize: 40 }}>🔔</span>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: 600, marginBottom: 4 }}>Enable Reminders</h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                Get notified when it's time to take your medication
              </p>
            </div>
            <button 
              className="btn btn-warning"
              onClick={requestPermission}
              style={{ whiteSpace: 'nowrap' }}
            >
              Enable
            </button>
          </div>
        </div>
      )}

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
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddForm(true)}
                style={{ marginTop: 'var(--space-md)' }}
              >
                + Add Your First Medication
              </button>
            </div>
          </div>
        ) : (
          medications.map((med: any) => (
            <div key={med.id} className="med-card">
              <div className="med-info">
                <span className="med-icon">💊</span>
                <div>
                  <div className="med-name">{med.name}</div>
                  {editId === med.id ? (
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', marginTop: 4 }}>
                      <input
                        type="time"
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        style={{
                          padding: '6px',
                          borderRadius: 6,
                          border: '2px solid var(--color-primary)',
                          fontSize: 16,
                          fontWeight: 600,
                        }}
                      />
                      <button 
                        onClick={saveEditTime}
                        style={{
                          background: 'var(--color-success)',
                          color: 'white',
                          border: 'none',
                          borderRadius: 6,
                          padding: '6px 10px',
                          cursor: 'pointer',
                          fontSize: 14,
                        }}
                      >
                        ✓
                      </button>
                      <button 
                        onClick={cancelEditTime}
                        style={{
                          background: 'var(--color-border)',
                          border: 'none',
                          borderRadius: 6,
                          padding: '6px 10px',
                          cursor: 'pointer',
                          fontSize: 14,
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                      <span 
                        className="med-time"
                        onClick={() => startEditTime(med.id, med.time)}
                        style={{ cursor: 'pointer' }}
                        title="Tap to change time"
                      >
                        ⏰ {med.time}
                      </span>
                      <button
                        onClick={() => startEditTime(med.id, med.time)}
                        style={{
                          background: 'var(--color-primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: 4,
                          padding: '2px 6px',
                          cursor: 'pointer',
                          fontSize: 11,
                        }}
                        title="Change time"
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    💊 {med.dosage}
                  </div>
                  {med.reminderEnabled && (
                    <span style={{ fontSize: 12, color: 'var(--color-success)' }}>
                      🔔 Reminder On
                    </span>
                  )}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                {/* Reminder Toggle */}
                <button
                  onClick={() => toggleReminder(med.id)}
                  style={{
                    background: med.reminderEnabled ? 'var(--color-warning)' : 'var(--color-border)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: 16,
                  }}
                  title={med.reminderEnabled ? 'Disable reminder' : 'Enable reminder'}
                >
                  {med.reminderEnabled ? '🔔' : '🔕'}
                </button>
                
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteMed(med.id)}
                  style={{
                    background: 'var(--color-danger)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: 16,
                  }}
                  title="Delete medication"
                >
                  🗑️
                </button>
                
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
