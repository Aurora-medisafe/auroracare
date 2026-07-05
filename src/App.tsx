import { useState, useEffect } from 'react';
import Home from './pages/Home';
import CheckIn from './pages/CheckIn';
import Medications from './pages/Medications';
import Messages from './pages/Messages';
import Health from './pages/Health';
import Settings from './pages/Settings';
import SOS from './pages/SOS';

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
}

const defaultData: AppData = {
  user: {
    name: 'there',
    phone: '',
  },
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
};

// Load data from localStorage
const loadData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultData, ...JSON.parse(stored) };
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

  // Save data whenever it changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', icon: '☀️' };
    if (hour < 17) return { text: 'Good Afternoon', icon: '🌤️' };
    return { text: 'Good Evening', icon: '🌙' };
  };

  const greeting = getGreeting();

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
      return <SOS onClose={() => setShowSOS(false)} data={data} setData={setData} />;
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
          />
        );
      case 'checkin':
        return (
          <CheckIn
            data={data}
            setData={setData}
            todayCheckIn={todayCheckIn}
            onNavigate={navigate}
          />
        );
      case 'meds':
        return <Medications data={data} setData={setData} onNavigate={navigate} />;
      case 'messages':
        return <Messages data={data} setData={setData} onNavigate={navigate} />;
      case 'health':
        return <Health data={data} setData={setData} onNavigate={navigate} />;
      case 'settings':
        return <Settings data={data} setData={setData} />;
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
            <span>Protect Us</span>
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
          <span>Home</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'checkin' ? 'active' : ''}`}
          onClick={() => navigate('checkin')}
          aria-current={currentPage === 'checkin' ? 'page' : undefined}
        >
          <span className="nav-icon">{icons.checkin}</span>
          <span>Check-In</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'meds' ? 'active' : ''}`}
          onClick={() => navigate('meds')}
          aria-current={currentPage === 'meds' ? 'page' : undefined}
        >
          <span className="nav-icon">{icons.meds}</span>
          <span>Meds</span>
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
          <span>Messages</span>
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
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}
