import { useState } from 'react';
import type { Translations } from '../App';

interface Props {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  onNavigate: (page: 'home' | 'checkin' | 'meds' | 'messages' | 'health' | 'settings') => void;
  t: Translations;
}

const QUICK_REPLIES = [
  { id: 'love', emoji: '❤️', getText: (t: Translations) => t.iLoveYou },
  { id: 'thanks', emoji: '🙏', getText: (t: Translations) => t.thankYou },
  { id: 'fine', emoji: '😊', getText: (t: Translations) => t.imFine },
  { id: 'call', emoji: '📞', getText: (t: Translations) => t.callMePlease },
  { id: 'help', emoji: '🆘', getText: (t: Translations) => t.iNeedHelpShort },
];

export default function Messages({ data, setData, onNavigate, t }: Props) {
  const { messages } = data;
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [showQuickReply, setShowQuickReply] = useState<string | null>(null);

  const speak = (text: string, messageId: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.lang = data.language === 'zh' ? 'zh-CN' : data.language === 'my' ? 'my-MM' : 'en-US';
    
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
    setShowQuickReply(reply.id);
    alert(`Reply sent: "${reply.getText(t)}" 💌`);
    setShowQuickReply(null);
  };

  const markAsRead = (id: string) => {
    setData((prev: any) => ({
      ...prev,
      messages: prev.messages.map((m: any) =>
        m.id === id ? { ...m, read: true } : m
      ),
    }));
  };

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
        <h1 className="section-title">💬 {t.messages}</h1>
      </div>

      {messages.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">💌</div>
            <p className="empty-title">{t.noMessagesYet}</p>
          </div>
        </div>
      ) : (
        messages.map((msg: any) => (
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
                {selectedMessage === msg.id && isReading ? t.stop : t.readAloud}
              </button>
            </div>
          </div>
        ))
      )}

      <div className="section" style={{ marginTop: 'var(--space-xl)' }}>
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
          {t.quickReplies}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)', fontSize: 'var(--font-size-sm)' }}>
          {t.tapToReply}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
          {QUICK_REPLIES.map((reply) => (
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
              {reply.getText(t)}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: 'rgba(232, 115, 90, 0.1)', marginTop: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <span style={{ fontSize: 32 }}>💡</span>
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>{t.usingReadAloud}</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {t.readAloudDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
