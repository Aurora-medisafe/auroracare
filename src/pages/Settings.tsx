import { Translations, Language, languageNames } from '../i18n';
import { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: 'son' | 'daughter' | 'caregiver' | 'other';
}

interface Props {
  data: {
    user: { name: string; phone: string };
    locationSharing: boolean;
    textSize: 'normal' | 'large' | 'extra-large';
    language: Language;
    contacts: Contact[];
  };
  setData: React.Dispatch<React.SetStateAction<any>>;
  t: Translations;
  setT: (t: Translations) => void;
}

export default function Settings({ data, setData, t, setT }: Props) {
  const { user, locationSharing, textSize, language, contacts } = data;
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: 'son' as Contact['relationship'] });

  const toggleLocation = () => {
    setData((prev: any) => ({
      ...prev,
      locationSharing: !prev.locationSharing,
    }));
    alert(`${locationSharing ? 'Location sharing disabled' : 'Location sharing enabled'} 📍`);
  };

  const setTextSizeHandler = (size: 'normal' | 'large' | 'extra-large') => {
    setData((prev: any) => ({ ...prev, textSize: size }));
  };

  const setLanguage = (lang: Language) => {
    setData((prev: any) => ({ ...prev, language: lang }));
    const translations = require('../i18n').getTranslations;
    setT(translations(lang));
    setShowLanguageDropdown(false);
  };

  const handleNameChange = () => {
    const newName = prompt(t.enterYourName, user.name);
    if (newName && newName.trim()) {
      setData((prev: any) => ({
        ...prev,
        user: { ...prev.user, name: newName.trim() },
      }));
    }
  };

  const handlePhoneChange = () => {
    const newPhone = prompt(t.enterPhoneNumber, user.phone);
    if (newPhone !== null) {
      setData((prev: any) => ({
        ...prev,
        user: { ...prev.user, phone: newPhone.trim() },
      }));
    }
  };

  const handleAddContact = () => {
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const contact: Contact = {
      id: `contact-${Date.now()}`,
      name: newContact.name.trim(),
      phone: newContact.phone.trim(),
      relationship: newContact.relationship,
    };

    setData((prev: any) => ({
      ...prev,
      contacts: [...(prev.contacts || []), contact],
    }));

    setNewContact({ name: '', phone: '', relationship: 'son' });
    setShowAddContact(false);
    alert(`✅ ${contact.name} added as your ${t[contact.relationship]}!`);
  };

  const handleDeleteContact = (id: string) => {
    if (confirm('Delete this contact?')) {
      setData((prev: any) => ({
        ...prev,
        contacts: prev.contacts.filter((c: Contact) => c.id !== id),
      }));
    }
  };

  const getRelationshipEmoji = (rel: Contact['relationship']) => {
    const emojis: Record<string, string> = {
      son: '👦',
      daughter: '👧',
      caregiver: '👨‍⚕️',
      other: '👤',
    };
    return emojis[rel] || '👤';
  };

  const getRelationshipLabel = (rel: Contact['relationship']) => {
    const labels: Record<string, string> = {
      son: t.son,
      daughter: t.daughter,
      caregiver: t.caregiver,
      other: t.other,
    };
    return labels[rel] || rel;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 className="section-title">{t.settings}</h1>
      </div>

      {/* Language Selection */}
      <div className="section">
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
          🌍 Language / 语言 / ဘာသာစကား
        </h2>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span style={{ fontSize: 32 }}>🌍</span>
              <div>
                <div style={{ fontWeight: 600 }}>{languageNames[language]}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  Tap to change language
                </div>
              </div>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              style={{ minHeight: 48, padding: '8px 16px' }}
            >
              {showLanguageDropdown ? '✕ Close' : 'Change'}
            </button>
          </div>

          {showLanguageDropdown && (
            <div style={{ marginTop: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {(['en', 'zh', 'my'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  className={`btn ${language === lang ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setLanguage(lang)}
                  style={{ minHeight: 56, fontSize: 'var(--font-size-lg)' }}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="card" style={{ marginBottom: 'var(--space-xl)', textAlign: 'center' }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--space-md)',
          fontSize: 36,
          fontWeight: 700,
          color: 'white',
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>
          {user.name}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
          {user.phone || 'No phone number'}
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center' }}>
          <button 
            className="btn btn-secondary"
            onClick={handleNameChange}
            style={{ minHeight: 48 }}
          >
            {t.editName}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handlePhoneChange}
            style={{ minHeight: 48 }}
          >
            📞 {t.phoneNumber}
          </button>
        </div>
      </div>

      {/* Family Contacts */}
      <div className="section">
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
          👨‍👩‍👧 {t.myContacts}
        </h2>

        {contacts && contacts.length > 0 ? (
          <div>
            {contacts.map((contact: Contact) => (
              <div key={contact.id} className="card" style={{ marginBottom: 'var(--space-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <span style={{ fontSize: 40 }}>{getRelationshipEmoji(contact.relationship)}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 'var(--font-size-lg)' }}>{contact.name}</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                        {getRelationshipLabel(contact.relationship)}
                      </div>
                      <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: 4 }}>
                        📞 {contact.phone}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                    <a 
                      href={`tel:${contact.phone}`}
                      className="btn btn-success"
                      style={{ minHeight: 48, padding: '8px 16px', textDecoration: 'none' }}
                    >
                      📞 Call
                    </a>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleDeleteContact(contact.id)}
                      style={{ minHeight: 48, padding: '8px 12px', background: 'var(--color-danger-light)' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card">
            <div className="empty-state">
              <div className="empty-icon">👨‍👩‍👧</div>
              <p className="empty-title">{t.noContactsYet}</p>
              <p className="empty-text">Add your family contacts so they can receive your check-ins and alerts.</p>
            </div>
          </div>
        )}

        {/* Add Contact Form */}
        {showAddContact ? (
          <div className="card" style={{ marginTop: 'var(--space-md)' }}>
            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-md)' }}>+ {t.addContact}</h3>
            
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                style={{ minHeight: 56 }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t.phoneNumber}</label>
              <input
                type="tel"
                className="form-input"
                placeholder={t.enterPhoneNumber}
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                style={{ minHeight: 56 }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t.relationship}</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                {(['son', 'daughter', 'caregiver', 'other'] as const).map((rel) => (
                  <button
                    key={rel}
                    className={`btn ${newContact.relationship === rel ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setNewContact({ ...newContact, relationship: rel })}
                    style={{ minHeight: 48 }}
                  >
                    {getRelationshipEmoji(rel)} {getRelationshipLabel(rel)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
              <button 
                className="btn btn-primary"
                onClick={handleAddContact}
                style={{ flex: 1, minHeight: 56 }}
              >
                ✓ {t.save}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowAddContact(false);
                  setNewContact({ name: '', phone: '', relationship: 'son' });
                }}
                style={{ minHeight: 56 }}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        ) : (
          <button 
            className="btn btn-primary btn-block"
            onClick={() => setShowAddContact(true)}
            style={{ minHeight: 56, marginTop: 'var(--space-md)' }}
          >
            + {t.addContact}
          </button>
        )}
      </div>

      {/* Privacy & Sharing */}
      <div className="section">
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
          {t.privacySharing}
        </h2>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span style={{ fontSize: 32 }}>📍</span>
              <div>
                <div style={{ fontWeight: 600 }}>{t.shareMyLocation}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  {t.letFamilySee}
                </div>
              </div>
            </div>
            <button
              className={`toggle ${locationSharing ? 'active' : ''}`}
              onClick={toggleLocation}
              role="switch"
              aria-checked={locationSharing}
              aria-label="Toggle location sharing"
            >
              <div className="toggle-knob" />
            </button>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="section">
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
          {t.display}
        </h2>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
            <span style={{ fontSize: 32 }}>🔤</span>
            <div>
              <div style={{ fontWeight: 600 }}>{t.textSize}</div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                {t.chooseTextSize}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            {(['normal', 'large', 'extra-large'] as const).map((size) => (
              <button
                key={size}
                className={`btn ${textSize === size ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setTextSizeHandler(size)}
                style={{ 
                  flex: 1,
                  minHeight: 56,
                  padding: '12px 8px',
                  fontSize: size === 'extra-large' ? 'var(--font-size-lg)' : 
                           size === 'large' ? 'var(--font-size-md)' : 'var(--font-size-sm)'
                }}
              >
                {size === 'normal' ? t.normal : 
                 size === 'large' ? t.large : t.extraLarge}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="section">
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
          {t.about}
        </h2>

        <div className="card" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 64, display: 'block', marginBottom: 'var(--space-md)' }}>💝</span>
          <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
            {t.appName}
          </h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
            {t.version} 1.0.0
          </p>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {t.connectingFamilies}
          </p>
        </div>
      </div>

      {/* Sign Out */}
      <button 
        className="btn btn-block"
        style={{ 
          background: 'var(--color-danger-light)',
          color: 'var(--color-danger)',
          minHeight: 64,
          marginTop: 'var(--space-xl)',
          marginBottom: 'var(--space-xxl)'
        }}
        onClick={() => {
          if (confirm('Are you sure you want to sign out?')) {
            alert('Signed out successfully.');
          }
        }}
      >
        {t.signOut}
      </button>
    </div>
  );
}
