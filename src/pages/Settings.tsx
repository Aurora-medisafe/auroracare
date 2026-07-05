import type { AppData } from '../App';

interface Props {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
}

export default function Settings({ data, setData }: Props) {
  const { user, locationSharing, textSize } = data;

  const toggleLocation = () => {
    setData(prev => ({
      ...prev,
      locationSharing: !prev.locationSharing,
    }));
    alert(`Location sharing ${!locationSharing ? 'enabled' : 'disabled'} 📍`);
  };

  const setTextSize = (size: 'normal' | 'large' | 'extra-large') => {
    setData(prev => ({ ...prev, textSize: size }));
  };

  const handleNameChange = () => {
    const newName = prompt('Enter your name:', user.name);
    if (newName && newName.trim()) {
      setData(prev => ({
        ...prev,
        user: { ...prev.user, name: newName.trim() },
      }));
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 className="section-title">⚙️ Settings</h1>
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
        <button 
          className="btn btn-secondary"
          onClick={handleNameChange}
          style={{ minHeight: 48 }}
        >
          ✏️ Edit Name
        </button>
      </div>

      {/* Privacy & Sharing */}
      <div className="section">
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
          Privacy & Sharing
        </h2>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span style={{ fontSize: 32 }}>📍</span>
              <div>
                <div style={{ fontWeight: 600 }}>Share My Location</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  Let your family see your location
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
          Display
        </h2>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
            <span style={{ fontSize: 32 }}>🔤</span>
            <div>
              <div style={{ fontWeight: 600 }}>Text Size</div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                Choose comfortable text size
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            {(['normal', 'large', 'extra-large'] as const).map(size => (
              <button
                key={size}
                className={`btn ${textSize === size ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setTextSize(size)}
                style={{ 
                  flex: 1,
                  minHeight: 56,
                  padding: '12px 8px',
                  fontSize: size === 'extra-large' ? 'var(--font-size-lg)' : 
                           size === 'large' ? 'var(--font-size-md)' : 'var(--font-size-sm)'
                }}
              >
                {size === 'normal' ? 'Normal' : 
                 size === 'large' ? 'Large' : 'X-Large'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="section">
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
          About
        </h2>

        <div className="card" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 64, display: 'block', marginBottom: 'var(--space-md)' }}>💝</span>
          <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
            Protect Us With Love
          </h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
            Version 1.0.0
          </p>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Connecting families with love and care,<br />
            no matter the distance.
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
            // In a real app, this would log out the user
            alert('Signed out successfully.');
          }
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
