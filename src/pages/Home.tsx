import type { AppData } from '../App';

interface Props {
  data: AppData;
  greeting: { text: string; icon: string };
  todayCheckIn?: { id: string; date: string; status: string; time: string };
  unreadMessages: number;
  pendingMeds: number;
  onNavigate: (page: 'home' | 'checkin' | 'meds' | 'messages' | 'health' | 'settings') => void;
  onSOS: () => void;
}

export default function Home({ data, greeting, todayCheckIn, unreadMessages, pendingMeds, onNavigate, onSOS }: Props) {
  const { user, messages, medications } = data;

  // Get recent messages (last 2)
  const recentMessages = messages.slice(0, 2);

  // Get pending medications
  const pendingMedsList = medications.filter(m => !m.taken);

  return (
    <div>
      {/* Greeting */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <p className="greeting">{greeting.icon} {greeting.text}</p>
        <h1 className="greeting-name">{user.name}</h1>
      </div>

      {/* Check-In Card */}
      <div className="card card-highlight" style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 className="card-title" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          👋 How are you feeling today?
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
              Checked in at {todayCheckIn.time}
            </p>
          </div>
        ) : (
          <div className="check-in-buttons">
            <button 
              className="btn btn-success btn-lg btn-block"
              onClick={() => onNavigate('checkin')}
            >
              😊 I'm Okay
            </button>
            <button 
              className="btn btn-warning btn-lg btn-block"
              onClick={() => onNavigate('checkin')}
            >
              🆘 I Need Help
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">⚡ Quick Actions</h2>
        </div>
        <div className="quick-actions">
          <button className="quick-action" onClick={() => onNavigate('messages')}>
            <span className="quick-action-icon">💬</span>
            <span className="quick-action-label">
              Messages
              {unreadMessages > 0 && (
                <span className="badge badge-danger" style={{ marginLeft: 4 }}>{unreadMessages}</span>
              )}
            </span>
          </button>
          <button className="quick-action" onClick={() => onNavigate('health')}>
            <span className="quick-action-icon">📊</span>
            <span className="quick-action-label">My Vitals</span>
          </button>
          <button className="quick-action" onClick={() => onNavigate('meds')}>
            <span className="quick-action-icon">💊</span>
            <span className="quick-action-label">
              Medications
              {pendingMeds > 0 && (
                <span className="badge badge-warning" style={{ marginLeft: 4 }}>{pendingMeds}</span>
              )}
            </span>
          </button>
          <button className="quick-action" onClick={() => onNavigate('checkin')}>
            <span className="quick-action-icon">❤️</span>
            <span className="quick-action-label">Check-In</span>
          </button>
          <button className="quick-action" onClick={() => onNavigate('settings')}>
            <span className="quick-action-icon">📍</span>
            <span className="quick-action-label">Location</span>
          </button>
          <button className="quick-action" onClick={onSOS}>
            <span className="quick-action-icon">🆘</span>
            <span className="quick-action-label" style={{ color: 'var(--color-danger)' }}>Emergency</span>
          </button>
        </div>
      </div>

      {/* Today's Medications */}
      {pendingMedsList.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">💊 Today's Medications</h2>
            <button className="btn btn-secondary" onClick={() => onNavigate('meds')} style={{ padding: '8px 16px', minHeight: 48 }}>
              See All
            </button>
          </div>
          {pendingMedsList.slice(0, 2).map(med => (
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
                onClick={() => {
                  // Mark as taken - handled in Medications page
                  onNavigate('meds');
                }}
                style={{ minHeight: 56, padding: '12px 20px' }}
              >
                ✓ Taken
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Family Messages */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">💌 Family Messages</h2>
          <button className="btn btn-secondary" onClick={() => onNavigate('messages')} style={{ padding: '8px 16px', minHeight: 48 }}>
            See All
          </button>
        </div>
        {recentMessages.length > 0 ? (
          recentMessages.map(msg => (
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
              <p className="empty-text">No messages yet</p>
            </div>
          </div>
        )}
      </div>

      {/* Large SOS Button */}
      <div style={{ textAlign: 'center', marginTop: 'var(--space-xxl)', marginBottom: 'var(--space-xl)' }}>
        <button 
          className="sos-button btn-icon-lg"
          onClick={onSOS}
          aria-label="Emergency SOS Button"
        >
          🆘
          <span style={{ fontSize: 14, marginTop: 4 }}>SOS</span>
        </button>
        <p style={{ marginTop: 'var(--space-md)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
          Hold for emergency
        </p>
      </div>
    </div>
  );
}
