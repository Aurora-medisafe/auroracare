import type { Translations } from '../App';

interface Props {
  data: any;
  greeting: string;
  todayCheckIn?: { id: string; date: string; status: string; time: string };
  unreadMessages: number;
  pendingMeds: number;
  onNavigate: (page: 'home' | 'checkin' | 'meds' | 'messages' | 'health' | 'settings') => void;
  onSOS: () => void;
  t: Translations;
}

export default function Home({ data, greeting, todayCheckIn, unreadMessages, pendingMeds, onNavigate, onSOS, t }: Props) {
  const { user, messages, medications, contacts } = data;

  const recentMessages = messages.slice(0, 2);
  const pendingMedsList = medications.filter((m: any) => !m.taken);

  const getRelationshipEmoji = (rel: string) => {
    const emojis: Record<string, string> = { son: '👦', daughter: '👧', caregiver: '👨‍⚕️', other: '👤' };
    return emojis[rel] || '👤';
  };

  const getContactColor = (index: number) => {
    return index === 0 ? 'var(--color-success)' : 'var(--color-secondary)';
  };

  return (
    <div>
      {/* Profile & Contact Card */}
      <div className="card card-highlight" style={{ marginBottom: 'var(--space-xl)', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 700,
            color: 'white',
            flexShrink: 0
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 4 }}>
              {user.name}
            </h2>
            {user.phone ? (
              <a href={`tel:${user.phone}`} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 6, 
                color: 'rgba(255,255,255,0.9)', 
                fontSize: 'var(--font-size-md)',
                textDecoration: 'none'
              }}>
                📞 {user.phone}
              </a>
            ) : (
              <button 
                onClick={() => onNavigate('settings')}
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  border: 'none', 
                  color: 'rgba(255,255,255,0.9)',
                  padding: '6px 12px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)'
                }}
              >
                + Add phone number
              </button>
            )}
          </div>
          <button 
            onClick={() => onNavigate('settings')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: 12,
              padding: '12px',
              cursor: 'pointer',
              fontSize: 20
            }}
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Family Contacts Quick Access */}
      {contacts && contacts.length > 0 && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
            👨‍👩‍👧 {t.myContacts}
          </h3>
          <div style={{ display: 'flex', gap: 'var(--space-md)', overflowX: 'auto', paddingBottom: 'var(--space-sm)' }}>
            {contacts.map((contact: any, index: number) => (
              <a 
                key={contact.id}
                href={`tel:${contact.phone}`}
                style={{
                  background: 'white',
                  border: '2px solid var(--color-border)',
                  borderRadius: 16,
                  padding: 'var(--space-md)',
                  minWidth: 140,
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{getRelationshipEmoji(contact.relationship)}</div>
                <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: 4, color: 'var(--color-text)' }}>
                  {contact.name}
                </div>
                <div style={{ 
                  background: getContactColor(index), 
                  color: 'white', 
                  padding: '8px 12px', 
                  borderRadius: 20,
                  fontSize: 20,
                  marginTop: 8
                }}>
                  📞 {index + 1}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Greeting */}
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <p className="greeting">{greeting}</p>
      </div>

      {/* Check-In Card */}
      <div className="card card-highlight" style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 className="card-title" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          👋 {t.howAreYouFeeling}
        </h2>
        
        {todayCheckIn ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
            <div style={{ fontSize: 64, marginBottom: 'var(--space-md)' }}>
              {todayCheckIn.status === 'okay' ? '✅' : '🆘'}
            </div>
            <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600 }}>
              {todayCheckIn.status === 'okay' 
                ? "You're all checked in! 💚" 
                : 'Help is on the way! ❤️'}
            </p>
            <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-sm)' }}>
              {t.checkedInAt} {todayCheckIn.time}
            </p>
          </div>
        ) : (
          <div className="check-in-buttons">
            <button 
              className="btn btn-success btn-lg btn-block"
              onClick={() => onNavigate('checkin')}
            >
              😊 {t.imOkay}
            </button>
            <button 
              className="btn btn-warning btn-lg btn-block"
              onClick={() => onNavigate('checkin')}
            >
              🆘 {t.iNeedHelp}
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">{t.quickActions}</h2>
        </div>
        <div className="quick-actions">
          <button className="quick-action" onClick={() => onNavigate('messages')}>
            <span className="quick-action-icon">💬</span>
            <span className="quick-action-label">
              {t.messages}
              {unreadMessages > 0 && (
                <span className="badge badge-danger" style={{ marginLeft: 4 }}>{unreadMessages}</span>
              )}
            </span>
          </button>
          <button className="quick-action" onClick={() => onNavigate('health')}>
            <span className="quick-action-icon">📊</span>
            <span className="quick-action-label">{t.myHealthVitals}</span>
          </button>
          <button className="quick-action" onClick={() => onNavigate('meds')}>
            <span className="quick-action-icon">💊</span>
            <span className="quick-action-label">
              {t.meds}
              {pendingMeds > 0 && (
                <span className="badge badge-warning" style={{ marginLeft: 4 }}>{pendingMeds}</span>
              )}
            </span>
          </button>
          <button className="quick-action" onClick={() => onNavigate('checkin')}>
            <span className="quick-action-icon">❤️</span>
            <span className="quick-action-label">{t.checkIn}</span>
          </button>
          <button className="quick-action" onClick={() => onNavigate('settings')}>
            <span className="quick-action-icon">📍</span>
            <span className="quick-action-label">{t.shareMyLocation}</span>
          </button>
          <button className="quick-action" onClick={onSOS}>
            <span className="quick-action-icon">🆘</span>
            <span className="quick-action-label" style={{ color: 'var(--color-danger)' }}>{t.emergency}</span>
          </button>
        </div>
      </div>

      {/* Pending Medications */}
      {pendingMedsList.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">💊 {t.todaysMedications}</h2>
            <button className="btn btn-secondary" onClick={() => onNavigate('meds')} style={{ padding: '8px 16px', minHeight: 48 }}>
              {t.seeAll}
            </button>
          </div>
          {pendingMedsList.slice(0, 2).map((med: any) => (
            <div key={med.id} className="med-card">
              <div className="med-info">
                <span className="med-icon">💊</span>
                <div>
                  <div className="med-name">{med.name}</div>
                  <div className="med-time">⏰ {med.time} • {med.dosage}</div>
                </div>
              </div>
              <button 
                className="btn btn-success"
                onClick={() => onNavigate('meds')}
                style={{ minHeight: 56, padding: '12px 20px' }}
              >
                ✓ {t.taken}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Recent Messages */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">💌 {t.familyMessages}</h2>
          <button className="btn btn-secondary" onClick={() => onNavigate('messages')} style={{ padding: '8px 16px', minHeight: 48 }}>
            {t.seeAll}
          </button>
        </div>
        {recentMessages.length > 0 ? (
          recentMessages.map((msg: any) => (
            <div key={msg.id} className={`message-card ${!msg.read ? 'unread' : ''}`}>
              <div className="message-header">
                <span className="message-from">👤 {msg.from}</span>
                <span className="message-time">{msg.time}</span>
              </div>
              <p className="message-body">{msg.body}</p>
            </div>
          ))
        ) : (
          <div className="card">
            <div className="empty-state">
              <div className="empty-icon">💌</div>
              <p className="empty-text">{t.noMessagesYet}</p>
            </div>
          </div>
        )}
      </div>

      {/* SOS Button */}
      <div style={{ textAlign: 'center', marginTop: 'var(--space-xxl)', marginBottom: 'var(--space-xl)' }}>
        <button 
          className="sos-button btn-icon-lg"
          onClick={onSOS}
          aria-label="Emergency SOS Button"
        >
          🆘
          <span style={{ fontSize: 14, marginTop: 4 }}>{t.emergency}</span>
        </button>
        <p style={{ marginTop: 'var(--space-md)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
          Hold for {t.emergency.toLowerCase()}
        </p>
      </div>
    </div>
  );
}
