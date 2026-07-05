import { useState } from 'react';
import type { AppData } from '../App';

interface Props {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  onNavigate: (page: 'home' | 'checkin' | 'meds' | 'messages' | 'health' | 'settings') => void;
}

const QUICK_REPLIES = [
  { id: 'love', emoji: '❤️', text: 'I love you!' },
  { id: 'thanks', emoji: '🙏', text: 'Thank you!' },
  { id: 'fine', emoji: '😊', text: "I'm fine!" },
  { id: 'call', emoji: '📞', text: 'Call me please' },
  { id: 'help', emoji: '🆘', text: 'I need help' },
];

export default function Messages({ data, setData, onNavigate }: Props) {
  const { messages } = data;
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [showQuickReply, setShowQuickReply] = useState<string | null>(null);

  // Text-to-Speech
  const speak = (text: string, messageId: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.lang = 'en-US';
    
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => {
      setIsReading(false);
      setSelectedMessage(null);
    };
    utterance.onerror = () => {
      setIsReading(false);
      setSelectedMessage(null);
    };

    setSelectedMessage(messageId);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setSelectedMessage(null);
  };

  const handleQuickReply = (reply: typeof QUICK_REPLIES[0]) => {
    setShowQuickReply(reply);
    setTimeout(() => {
      alert(`Reply sent: "${reply.text}" 💌`);
      setShowQuickReply(null);
    }, 500);
  };

  const markAsRead = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(m =>
        m.id === id ? { ...m, read: true } : m
      ),
    }));
  };

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
        <h1 className="section-title">💬 Messages</h1>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">💌</div>
            <p className="empty-title">No Messages Yet</p>
            <p className="empty-text">Your family will send you messages here.</p>
          </div>
        </div>
      ) : (
        messages.map(msg => (
          <div 
            key={msg.id} 
            className={`message-card ${!msg.read ? 'unread' : ''}`}
            onClick={() => !msg.read && markAsRead(msg.id)}
          >
            <div className="message-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <span style={{ fontSize: 24 }}>👤</span>
                <span className="message-from">{msg.from}</span>
              </div>
              <span className="message-time">{msg.time}</span>
            </div>
            
            <p className="message-body" style={{ marginBottom: 'var(--space-md)' }}>
              {msg.body}
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end' }}>
              <button 
                className={`btn ${selectedMessage === msg.id && isReading ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => {
                  if (selectedMessage === msg.id && isReading) {
                    stopSpeaking();
                  } else {
                    speak(msg.body, msg.id);
                  }
                }}
                style={{ 
                  minHeight: 48, 
                  padding: '8px 16px',
                  fontSize: 'var(--font-size-sm)'
                }}
              >
                {selectedMessage === msg.id && isReading ? '🔊' : '🔈'} {' '}
                {selectedMessage === msg.id && isReading ? 'Stop' : 'Read Aloud'}
              </button>
            </div>
          </div>
        ))
      )}

      {/* Quick Replies */}
      <div className="section" style={{ marginTop: 'var(--space-xl)' }}>
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
          Quick Replies
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)', fontSize: 'var(--font-size-sm)' }}>
          Tap to send a quick response to your family
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
          {QUICK_REPLIES.map(reply => (
            <button
              key={reply.id}
              className={`btn ${showQuickReply === reply.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleQuickReply(reply)}
              style={{ 
                minHeight: 56,
                padding: '12px 20px',
                fontSize: 'var(--font-size-lg)'
              }}
            >
              <span style={{ marginRight: 8 }}>{reply.emoji}</span>
              {reply.text}
            </button>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="card" style={{ background: 'rgba(232, 115, 90, 0.1)', marginTop: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <span style={{ fontSize: 32 }}>💡</span>
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Using Read Aloud</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              Tap the "Read Aloud" button to hear your messages. The text will be spoken in a clear, slow voice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
