import { useState } from 'react';
import type { Translations } from '../App';

interface Props {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  onNavigate: (page: 'home' | 'checkin' | 'meds' | 'messages' | 'health' | 'settings') => void;
  t: Translations;
}

type VitalType = 'blood_pressure' | 'heart_rate' | 'temperature' | 'weight' | 'blood_glucose';

interface VitalConfig {
  type: VitalType;
  icon: string;
  labelKey: keyof Translations;
  placeholder: string;
  unitKey: keyof Translations;
}

const VITAL_CONFIGS: VitalConfig[] = [
  { type: 'blood_pressure', icon: '🩸', labelKey: 'bloodPressure', placeholder: '120/80', unitKey: 'bloodPressure' },
  { type: 'heart_rate', icon: '❤️', labelKey: 'heartRate', placeholder: '72', unitKey: 'heartRate' },
  { type: 'temperature', icon: '🌡️', labelKey: 'temperature', placeholder: '98.6', unitKey: 'temperature' },
  { type: 'weight', icon: '⚖️', labelKey: 'weight', placeholder: '150', unitKey: 'weight' },
  { type: 'blood_glucose', icon: '🩺', labelKey: 'bloodGlucose', placeholder: '100', unitKey: 'bloodGlucose' },
];

export default function Health({ data, setData, onNavigate, t }: Props) {
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

    setData((prev: any) => ({
      ...prev,
      vitals: [newVital, ...prev.vitals],
    }));

    setShowModal(false);
    setInputValue('');
    alert(`✅ ${t[(selectedVital.labelKey as keyof Translations)]} recorded!`);
  };

  const getLatestVital = (type: VitalType) => {
    return vitals.find((v: any) => v.type === type);
  };

  const getUnit = (labelKey: keyof Translations): string => {
    const units: Record<string, string> = {
      bloodPressure: 'mmHg',
      heartRate: 'bpm',
      temperature: '°F',
      weight: 'lbs',
      bloodGlucose: 'mg/dL',
    };
    return units[labelKey] || '';
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
        <h1 className="section-title">📊 {t.myHealthVitals}</h1>
      </div>

      <div className="card" style={{ background: 'rgba(78, 159, 159, 0.1)', marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <span style={{ fontSize: 32 }}>💡</span>
          <div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              {t.vitalsDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
          {t.recordNewReading}
        </h2>

        {VITAL_CONFIGS.map((vital) => {
          const latest = getLatestVital(vital.type);
          return (
            <div key={vital.type} className="card" style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <span style={{ fontSize: 40 }}>{vital.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--font-size-lg)' }}>
                      {t[(vital.labelKey as keyof Translations)]}
                    </div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                      {getUnit(vital.labelKey)}
                    </div>
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
                    + {t.saveReading}
                  </button>
                )}
              </div>

              {latest && (
                <button 
                  className="btn btn-secondary btn-block"
                  onClick={() => openModal(vital)}
                  style={{ marginTop: 'var(--space-md)', minHeight: 48 }}
                >
                  📝 {t.updateReading}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {vitals.length > 0 && (
        <div className="section" style={{ marginTop: 'var(--space-xl)' }}>
          <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
            {t.recentHistory}
          </h2>
          
          {vitals.slice(0, 5).map((vital: any) => {
            const config = VITAL_CONFIGS.find((c) => c.type === vital.type);
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
                      <div style={{ fontWeight: 600 }}>
                        {config ? t[(config.labelKey as keyof Translations)] : vital.type}
                      </div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
                        {vital.time}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {vital.value} {config ? getUnit(config.labelKey) : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && selectedVital && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <span style={{ marginRight: 8 }}>{selectedVital.icon}</span>
                {t[(selectedVital.labelKey as keyof Translations)]}
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
              Enter your {selectedVital.placeholder} reading
            </p>

            <div className="form-group">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder={selectedVital.placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                  style={{ flex: 1, fontSize: 'var(--font-size-2xl)', textAlign: 'center' }}
                />
                <span style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)' }}>
                  {getUnit(selectedVital.labelKey)}
                </span>
              </div>
            </div>

            <button
              className={`btn btn-lg btn-block ${inputValue.trim() ? 'btn-primary' : 'btn-secondary'}`}
              onClick={saveVital}
              disabled={!inputValue.trim()}
              style={{ marginTop: 'var(--space-lg)' }}
            >
              💾 {t.saveReading}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
