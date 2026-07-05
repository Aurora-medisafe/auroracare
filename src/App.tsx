import { useState, useEffect } from 'react';
import Home from './pages/Home';
import CheckIn from './pages/CheckIn';
import Medications from './pages/Medications';
import Messages from './pages/Messages';
import Health from './pages/Health';
import Settings from './pages/Settings';
import SOS from './pages/SOS';
import { Language, getTranslations, getGreeting, languageNames, Translations } from './i18n';

// Navigation icons
const icons = {
  home: '🏠',
  checkin: '❤️',
  meds: '💊',
  messages: '💬',
  health: '📊',
  settings: '⚙️',
};

// Current page for bottom nav
type Page = 'home' | 'checkin' | 'meds' | 'messages' | 'health' | 'settings';

// Store data in localStorage
const STORAGE_KEY = 'protectus_data';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: 'son' | 'daughter' | 'caregiver' | 'other';
}

interface AppData {
  user: {
    name: string;
    phone: string;
  };
  checkIns: Array<{
    id: string;
    date: string;
    status: 'okay' | 'need_help';
    time: string;
  }>;
  medications: Array<{
    id: string;
    name: string;
    dosage: string;
    time: string;
    taken: boolean;
  }>;
  messages: Array<{
    id: string;
    from: string;
    body: string;
    time: string;
    read: boolean;
  }>;
  vitals: Array<{
    id: string;
    type: string;
    value: string;
    time: string;
  }>;
  locationSharing: boolean;
  textSize: 'normal' | 'large' | 'extra-large';
  language: Language;
  contacts: Contact[];
}

const defaultData: AppData = {
  user: {
    name: 'there',
    phone: '09668808686',
  },
  contacts: [
    { id: 'c1', name: 'Contact 1', phone: '09668808686', relationship: 'daughter' as const },
    { id: 'c2', name: 'Contact 2', phone: '09962148088', relationship: 'son' as const },
  ],
  checkIns: [],
  medications: [
    { id: '1', name: 'Metformin', dosage: '500mg', time: '08:00', taken: false },
    { id: '2', name: 'Aspirin', dosage: '81mg', time: '08:00', taken: false },
    { id: '3', name: 'Lisinopril', dosage: '10mg', time: '20:00', taken: false },
  ],
  messages: [
    {
      id: '1',
      from: 'Son David',
      body: 'Hi Mom! I booked your doctor appointment for next Tuesday at 10am. Let me know if that works! Love you!',
      time: '2:30 PM',
      read: false,
    },
    {
      id: '2',
      from: 'Daughter Sarah',
      body: "Mom, I sent you a gift! It should arrive tomorrow. Hope you like it! 💝",
      time: '10:15 AM',
      read: true,
    },
  ],
  vitals: [],
  locationSharing: false,
  textSize: 'normal',
  language: 'en',
};

// Load data from localStorage
const loadData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Always ensure the correct contacts
      parsed.contacts = [
        { id: 'c1', name: 'Contact 1', phone: '09668808686', relationship: 'daughter' as const },
        { id: 'c2', name: 'Contact 2', phone: '09962148088', relationship: 'son' as const },
      ];
      return { ...defaultData, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load data:', e);
  }
  return defaultData;
};

// Save data to localStorage
const saveData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showSOS, setShowSOS] = useState(false);
  const [data, setData] = useState<AppData>(loadData);
  const [t, setT] = useState<Translations>(getTranslations(loadData().language));

  // Update translations when language changes
  useEffect(() => {
    setT(getTranslations(data.language));
  }, [data.language]);

  // Save data whenever it changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  // Get greeting based on time and language
  const greeting = getGreeting(data.language);

  // Check if already checked in today
  const today = new Date().toDateString();
  const todayCheckIn = data.checkIns.find(c => c.date === today);
  const unreadMessages = data.messages.filter(m => !m.read).length;
  const pendingMeds = data.medications.filter(m => !m.taken).length;

  // Handle page navigation
  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Render current page
  const renderPage = () => {
    if (showSOS) {
      return <SOS onClose={() => setShowSOS(false)} data={data} setData={setData} t={t} />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <Home
            data={data}
            greeting={greeting}
            todayCheckIn={todayCheckIn}
            unreadMessages={unreadMessages}
            pendingMeds={pendingMeds}
            onNavigate={navigate}
            onSOS={() => setShowSOS(true)}
            t={t}
          />
        );
      case 'checkin':
        return (
          <CheckIn
            data={data}
            setData={setData}
            todayCheckIn={todayCheckIn}
            onNavigate={navigate}
            t={t}
          />
        );
      case 'meds':
        return <Medications data={data} setData={setData} onNavigate={navigate} t={t} />;
      case 'messages':
        return <Messages data={data} setData={setData} onNavigate={navigate} t={t} />;
      case 'health':
        return <Health data={data} setData={setData} onNavigate={navigate} t={t} />;
      case 'settings':
        return <Settings data={data} setData={setData} t={t} setT={setT} />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <span className="header-logo">💝</span>
            <span>{t.appName}</span>
          </div>
          <button
            onClick={() => setShowSOS(true)}
            className="sos-button"
            aria-label="Emergency SOS"
            style={{ width: 56, height: 56, fontSize: 14, animation: 'none' }}
          >
            🆘
            <span>SOS</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">{renderPage()}</div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
        <button
          className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => navigate('home')}
          aria-current={currentPage === 'home' ? 'page' : undefined}
        >
          <span className="nav-icon">{icons.home}</span>
          <span>{t.home}</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'checkin' ? 'active' : ''}`}
          onClick={() => navigate('checkin')}
          aria-current={currentPage === 'checkin' ? 'page' : undefined}
        >
          <span className="nav-icon">{icons.checkin}</span>
          <span>{t.checkIn}</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'meds' ? 'active' : ''}`}
          onClick={() => navigate('meds')}
          aria-current={currentPage === 'meds' ? 'page' : undefined}
        >
          <span className="nav-icon">{icons.meds}</span>
          <span>{t.meds}</span>
          {pendingMeds > 0 && (
            <span className="badge badge-danger" style={{ position: 'absolute', top: 0, right: 8, fontSize: 10, padding: '2px 6px' }}>
              {pendingMeds}
            </span>
          )}
        </button>
        <button
          className={`nav-item ${currentPage === 'messages' ? 'active' : ''}`}
          onClick={() => navigate('messages')}
          aria-current={currentPage === 'messages' ? 'page' : undefined}
        >
          <span className="nav-icon">{icons.messages}</span>
          <span>{t.messages}</span>
          {unreadMessages > 0 && (
            <span className="badge badge-danger" style={{ position: 'absolute', top: 0, right: 8, fontSize: 10, padding: '2px 6px' }}>
              {unreadMessages}
            </span>
          )}
        </button>
        <button
          className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`}
          onClick={() => navigate('settings')}
          aria-current={currentPage === 'settings' ? 'page' : undefined}
        >
          <span className="nav-icon">{icons.settings}</span>
          <span>{t.settings}</span>
        </button>
      </nav>
    </div>
  );
}

export type { Translations };
