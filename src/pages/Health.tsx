import { useState } from 'react';
import type { AppData } from '../App';

interface Props {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  onNavigate: (page: 'home' | 'checkin' | 'meds' | 'messages' | 'health' | 'settings') => void;
}

type VitalType = 'blood_pressure' | 'heart_rate' | 'temperature' | 'weight' | 'blood_glucose';

interface VitalConfig {
  type: VitalType;
  icon: string;
  label: string;
  placeholder: string;
  unit: string;
}

const VITAL_CONFIGS: VitalConfig[] = [
  { type: 'blood_pressure', icon: '🩸', label: 'Blood Pressure', placeholder: '120/80', unit: 'mmHg' },
  { type: 'heart_rate', icon: '❤️', label: 'Heart Rate', placeholder: '72', unit: 'bpm' },
  { type: 'temperature', icon: '🌡️', label: 'Temperature', placeholder: '98.6', unit: '°F' },
  { type: 'weight', icon: '⚖️', label: 'Weight', placeholder: '150', unit: 'lbs' },
  { type: 'blood_glucose', icon: '🩺', label: 'Blood Glucose', placeholder: '100', unit: 'mg/dL' },
];

export default function Health({ data, setData, onNavigate }: Props) {
  const { vitals } = data;
  const [showModal, setShowModal] = useState(false);
  const [selectedVital, setSelectedVital] = useState<VitalConfig | null>(null);
  const [inputValue, setInputValue] = useState('');

  const openModal = (vital: VitalConfig) => {
    setSelectedVital(vital);
    setInputValue('');
    setShowModal(true);
  };

  const saveVital = () => {
    if (!inputValue.trim() || !selectedVital) return;

    const newVital = {
      id: `vital-${Date.now()}`,
      type: selectedVital.type,
      value: inputValue,
      time: new Date().toLocaleString(),
    };

    setData(prev => ({
      ...prev,
      vitals: [newVital, ...prev.vitals],
    }));

    setShowModal(false);
    setInputValue('');
    alert(`✅ ${selectedVital.label} recorded!`);
  };

  const getLatestVital = (type: VitalType) => {
    return vitals.find(v => v.type === type);
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
        <h1 className="section-title">📊 My Health Vitals</h1>
      </div>

      {/* Info Card */}
      <div className="card" style={{ background: 'rgba(78, 159, 159, 0.1)', marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <span style={{ fontSize: 32 }}>💡</span>
          <div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              Track your health vitals here. Your family can see these readings to help monitor your health.
            </p>
          </div>
        </div>
      </div>

      {/* Record New Reading */}
      <div className="section">
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
          Record New Reading
        </h2>

        {VITAL_CONFIGS.map(vital => {
          const latest = getLatestVital(vital.type);
          return (
            <div key={vital.type} className="card" style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <span style={{ fontSize: 40 }}>{vital.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--font-size-lg)' }}>{vital.label}</div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{vital.unit}</div>
                  </div>
                </div>

                {latest ? (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-primary)' }}>
                      {latest.value}
                    </div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
                      {latest.time}
                    </div>
                  </div>
                ) : (
                  <button 
                    className="btn btn-primary"
                    onClick={() => openModal(vital)}
                    style={{ minHeight: 56, padding: '12px 20px' }}
                  >
                    + Add
                  </button>
                )}
              </div>

              {latest && (
                <button 
                  className="btn btn-secondary btn-block"
                  onClick={() => openModal(vital)}
                  style={{ marginTop: 'var(--space-md)', minHeight: 48 }}
                >
                  📝 Update Reading
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent History */}
      {vitals.length > 0 && (
        <div className="section" style={{ marginTop: 'var(--space-xl)' }}>
          <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
            Recent History
          </h2>
          
          {vitals.slice(0, 5).map(vital => {
            const config = VITAL_CONFIGS.find(c => c.type === vital.type);
            return (
              <div 
                key={vital.id} 
                className="card"
                style={{ marginBottom: 'var(--space-sm)', padding: 'var(--space-md)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <span style={{ fontSize: 24 }}>{config?.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600 }}>{config?.label}</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
                        {vital.time}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {vital.value} {config?.unit}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedVital && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <span style={{ marginRight: 8 }}>{selectedVital.icon}</span>
                {selectedVital.label}
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
              Enter your {selectedVital.label.toLowerCase()} reading
            </p>

            <div className="form-group">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder={selectedVital.placeholder}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  autoFocus
                  style={{ flex: 1, fontSize: 'var(--font-size-2xl)', textAlign: 'center' }}
                />
                <span style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)' }}>
                  {selectedVital.unit}
                </span>
              </div>
            </div>

            <button
              className={`btn btn-lg btn-block ${inputValue.trim() ? 'btn-primary' : 'btn-secondary'}`}
              onClick={saveVital}
              disabled={!inputValue.trim()}
              style={{ marginTop: 'var(--space-lg)' }}
            >
              💾 Save Reading
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
