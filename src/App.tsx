import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { MessageSquare, Users, MapPin, Search, ChevronLeft, Send, CheckCircle2, XCircle, Clock, Navigation2, Camera, ExternalLink, Trash2, Zap, Bike } from 'lucide-react';
import { format, differenceInHours } from 'date-fns';
import clsx from 'clsx';
import './App.css';

// --- MOCK DATA FOR APP ---
const currentUser = { id: '1', name: 'Rui', avatar: 'https://i.pravatar.cc/150?u=1' };

const MOCK_CLUBS = [
  { id: 'c1', name: 'Morning Mavericks', members: 124, image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=200', joined: true },
  { id: 'c2', name: 'Sunset Spinners', members: 89, image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=200', joined: true },
  { id: 'c3', name: 'Velo City', members: 340, image: 'https://images.unsplash.com/photo-1520666060410-fc4d5d9c2409?auto=format&fit=crop&q=80&w=200', joined: false },
];

const MOCK_RIDES = [
  { id: 'r1', clubId: 'c1', title: 'Dawn Patrol: Hills', date: new Date(Date.now() + 86400000), distance: '45km', pace: '28km/h', status: 'IN', inCount: 12 },
  { id: 'r2', clubId: 'c2', title: 'Recovery Cafe Ride', date: new Date(Date.now() + 172800000), distance: '30km', pace: '22km/h', status: 'UNDECIDED', inCount: 5 },
];

const MOCK_CHATS = [
  { id: 'm1', text: 'Anyone doing intervals tomorrow?', senderId: '2', senderName: 'Alex', timestamp: new Date(Date.now() - 3600000), avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 'm2', text: 'I am! Meet at standard spot?', senderId: '1', senderName: 'Rui', timestamp: new Date(Date.now() - 1800000), avatar: 'https://i.pravatar.cc/150?u=1' },
];


// --- LANDING PAGES (MARKETING) ---

const LayoutMain = () => (
  <div className="web-layout">
    <nav className="web-nav">
      <Link to="/" className="web-brand text-accent font-bold text-2xl">
        Velochat
      </Link>
      <div className="web-links">
        <Link to="/app" className="web-link highlight">Try The App</Link>
      </div>
    </nav>
    <main className="web-main">
      <Outlet />
    </main>
    <footer className="web-footer">
      <p>© {new Date().getFullYear()} Velochat. All rights reserved.</p>
      <div className="web-footer-links">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/delete-account">Delete Account</Link>
      </div>
    </footer>
  </div>
);

const LandingHome = () => {
  return (
    <div className="landing-page fade-in">
      <section className="hero-section text-center">
        <h1 className="hero-title">The Snapchat for Bike Rides</h1>
        <p className="hero-subtitle">
          Instantly let your squad know if you are in or out. Messages vanish after 24 hours. Keep the peloton tight.
        </p>
        <div className="hero-cta">
          <Link to="/app" className="btn-primary btn-large">
            Open Web Demo <ExternalLink className="icon-inline" size={18} />
          </Link>
        </div>
      </section>

      <section className="features-section grid">
        <div className="feature-card">
          <Zap size={40} className="feature-icon" />
          <h3 className="feature-title">In or Out. Fast.</h3>
          <p>No more scrolling through infinite chat threads. One tap to say you're riding, and everyone sees exactly who is showing up.</p>
        </div>
        <div className="feature-card">
          <Clock size={40} className="feature-icon" />
          <h3 className="feature-title">24-Hour Ephemeral Chat</h3>
          <p>Ride logistics change fast. 24 hours after a message is sent, it's gone. Say goodbye to cluttered inboxes.</p>
        </div>
        <div className="feature-card">
          <Bike size={40} className="feature-icon" />
          <h3 className="feature-title">Join Local Clubs</h3>
          <p>Find standard drops, join weekend epics, and connect with clubs doing same paces nearby.</p>
        </div>
      </section>
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="text-page fade-in">
      <div className="text-content-wrapper glass-card doc-container">
        <h2 style={{ marginBottom: '8px' }}>VeloChat Privacy Policy</h2>
        <p style={{ color: 'var(--text-secondary)' }}><strong>Effective date:</strong> March 1, 2025</p>
        <p className="last-updated" style={{ marginBottom: '24px' }}><strong>Last updated:</strong> March 1, 2025</p>

        <p style={{ marginBottom: '32px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          VeloChat ("we", "our", or "the app") is a cycling community app for organizing rides and group chat. This Privacy Policy explains what data we collect, how we use it, and your choices.
        </p>

        <div className="doc-section">
          <h3>1. Data We Collect</h3>

          <h4 style={{ marginTop: '16px', marginBottom: '8px' }}>1.1 Account and profile</h4>
          <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
            <li><strong>Email address</strong> — Required to create an account and sign in (magic link).</li>
            <li><strong>Name</strong> — Required at sign-up; used for your profile and shown to other users in rides and chats.</li>
            <li><strong>Profile information</strong> — Optional: profile photo, short bio, and visibility setting (public/private). Stored on our servers.</li>
          </ul>

          <h4 style={{ marginBottom: '8px' }}>1.2 User-generated content</h4>
          <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
            <li><strong>Rides</strong> — Titles, dates, times, distances, location text (e.g. "Central Park"), and optional route files (GPX/FIT) you upload.</li>
            <li><strong>Chat messages</strong> — Messages you send in ride and group chats.</li>
            <li><strong>Clubs and connections</strong> — Club memberships, ride RSVPs, and friend connections.</li>
          </ul>

          <h4 style={{ marginBottom: '8px' }}>1.3 Device and app functionality</h4>
          <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
            <li><strong>Push notifications</strong> — We use OneSignal (and related services) to send push notifications (e.g. new chat messages, ride updates). This involves a device push token and linking it to your account. You can disable notifications in your device settings.</li>
            <li><strong>Authentication</strong> — Session and auth data are stored on your device (e.g. via secure storage) to keep you signed in.</li>
          </ul>

          <h4 style={{ marginBottom: '8px' }}>1.4 Optional integrations</h4>
          <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
            <li><strong>Strava</strong> — If you connect Strava, we receive and store OAuth tokens and may access your Strava profile and activity/route data (as allowed by the Strava permissions you approve). We use this to let you import routes into VeloChat. Strava’s own privacy policy applies to data held by Strava.</li>
          </ul>

          <p>We do <strong>not</strong> collect precise device location (GPS) for "nearby rides" unless we clearly ask for location permission and describe that use in the app. Any "location" you enter for a ride is optional text (e.g. a place name), not automatic GPS.</p>
        </div>

        <div className="doc-section">
          <h3>2. How We Use Your Data</h3>
          <p style={{ marginBottom: '12px' }}>We use the data above to:</p>
          <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
            <li>Create and manage your account and profile.</li>
            <li>Provide rides, clubs, and chat.</li>
            <li>Send push notifications you’ve agreed to.</li>
            <li>Store and display route files you upload or import (e.g. from Strava).</li>
            <li>Operate, secure, and improve the app and our systems.</li>
          </ul>
          <p>We do not sell your personal data. We do not use your data for advertising or cross-app tracking.</p>
        </div>

        <div className="doc-section">
          <h3>3. Who We Share Data With</h3>
          <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
            <li><strong>Supabase</strong> — Our backend and database provider. Your account, profile, messages, rides, and files are stored and processed by Supabase (see <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer" className="text-accent underline" style={{ color: 'var(--accent-primary)' }}>Supabase Privacy</a>).</li>
            <li><strong>OneSignal</strong> — For sending push notifications (see <a href="https://onesignal.com/privacy_policy" target="_blank" rel="noreferrer" className="text-accent underline" style={{ color: 'var(--accent-primary)' }}>OneSignal Privacy</a>).</li>
            <li><strong>Strava</strong> — Only if you choose to connect Strava; data sharing is limited to what you authorize in the Strava OAuth flow.</li>
          </ul>
          <p>We may also share data if required by law or to protect rights and safety.</p>
        </div>

        <div className="doc-section">
          <h3>4. Data Retention and Deletion</h3>
          <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
            <li>We keep your data while your account is active.</li>
            <li>You can delete or correct profile data (e.g. name, bio, photo) in the app.</li>
            <li>To <strong>delete your account and associated data</strong>, contact us (see Section 8). After we verify your identity, we will delete your account and personal data from our systems within a reasonable period, except where we must retain data for legal or safety reasons.</li>
          </ul>
        </div>

        <div className="doc-section">
          <h3>5. Security</h3>
          <p>We use industry-standard measures (including encryption in transit, e.g. HTTPS) and access controls to protect your data. No system is completely secure; we encourage strong account security (e.g. keeping your email secure).</p>
        </div>

        <div className="doc-section">
          <h3>6. Children</h3>
          <p>VeloChat is not directed at children under 13. We do not knowingly collect personal data from children under 13. If you believe a child has provided us data, please contact us and we will delete it.</p>
        </div>

        <div className="doc-section">
          <h3>7. Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. We will post the updated policy and, where appropriate, notify you in the app or by email. Your continued use of the app after the effective date of changes constitutes acceptance of the updated policy.</p>
        </div>

        <div className="doc-section">
          <h3>8. Contact</h3>
          <p style={{ marginBottom: '12px' }}>For privacy-related requests (e.g. access, correction, deletion, or questions):</p>
          <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
            <li><strong>Email:</strong> <a href="mailto:support@velochat.example.com" className="text-accent underline" style={{ color: 'var(--accent-primary)' }}>support@velochat.example.com</a></li>
            <li><strong>App / website:</strong> <Link to="/delete-account" className="text-accent underline" style={{ color: 'var(--accent-primary)' }}>Delete Account Page</Link></li>
          </ul>
          <p>If you are in the European Economic Area or UK, you may also have the right to lodge a complaint with your local data protection authority.</p>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontStyle: 'italic', marginTop: '40px' }}>
          *This privacy policy applies to the VeloChat mobile application and related services.*
        </p>
      </div>
    </div>
  );
};

const DeleteAccount = () => {
  return (
    <div className="text-page fade-in">
      <div className="text-content-wrapper glass-card text-center max-w-md">
        <Trash2 size={48} className="danger-icon mx-auto mb-4" />
        <h2>Delete Your Account</h2>
        <p className="mb-6 mt-2 text-secondary">
          Warning: Requesting account deletion will permanently remove your profile, clubs memberships, and active ride statuses from Velochat immediately.
        </p>

        <p className="text-secondary mb-6 text-sm">
          To delete your account, please send us an email with your username or email address. We will process your request within 48 hours.
        </p>

        <a
          href="mailto:your-email@example.com?subject=Velochat%20Account%20Deletion%20Request&body=Please%20delete%20my%20Velochat%20account.%0A%0AUsername/Email:%20"
          className="btn-danger w-full mt-4 flex-center justify-center text-center pb-3 pt-3"
          style={{ display: 'flex', textDecoration: 'none' }}
        >
          Send Deletion Request Email
        </a>
      </div>
    </div>
  );
};


// --- APP COMPONENTS (MOCK MOBILE APP) ---

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/app', icon: MapPin, label: 'Rides' },
    { path: '/app/clubs', icon: Users, label: 'Clubs' },
    { path: '/app/chat', icon: MessageSquare, label: 'Chat' },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        // Exactly match the root of app, or clubs/chat
        const isActive = location.pathname === item.path || (item.path === '/app' && location.pathname === '/app/');
        return (
          <button
            key={item.path}
            className={clsx('nav-item', isActive && 'active')}
            onClick={() => navigate(item.path)}
          >
            <Icon size={24} />
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const Header = ({ title, rightNode, onBack }: { title: string, rightNode?: React.ReactNode, onBack?: () => void }) => (
  <header className="app-header">
    <div className="header-content">
      <div className="flex-center gap-2">
        {onBack && <button onClick={onBack} className="back-btn"><ChevronLeft size={24} /></button>}
        <h1 className="header-title">{title}</h1>
      </div>
      {rightNode}
    </div>
  </header>
);

const HomeRides = () => {
  const [rides, setRides] = useState(MOCK_RIDES);
  const navigate = useNavigate();

  const toggleStatus = (id: string, newStatus: 'IN' | 'OUT') => {
    setRides(rides.map(r => {
      if (r.id === id) {
        let newCount = r.inCount;
        if (r.status === newStatus) { newCount = newStatus === 'IN' ? r.inCount - 1 : r.inCount; }
        else if (r.status === 'OUT' && newStatus === 'IN') { newCount = r.inCount + 1; }
        else if (r.status === 'IN' && newStatus === 'OUT') { newCount = r.inCount - 1; }
        else if (r.status === 'UNDECIDED' && newStatus === 'IN') { newCount = r.inCount + 1; }

        return { ...r, status: r.status === newStatus ? 'UNDECIDED' : newStatus, inCount: newCount };
      }
      return r;
    }));
  };

  return (
    <div className="page-container fade-in">
      <Header
        title="Velochat"
        onBack={() => navigate('/')}
        rightNode={<div className="avatar-mini pulse-animation"><img src={currentUser.avatar} alt="Me" /></div>}
      />

      <div className="content-scrollable with-nav-padding">
        <h2 className="section-title">Upcoming Drops</h2>

        <div className="rides-list">
          {rides.map(ride => (
            <div key={ride.id} className="ride-card glass-panel">
              <div className="ride-header">
                <div>
                  <h3 className="ride-title">{ride.title}</h3>
                  <p className="ride-meta">{format(ride.date, 'MMM do, p')} • {ride.distance}</p>
                </div>
                <div className="ride-stats">
                  <span className="in-count"><Navigation2 size={14} className="icon-inline" /> {ride.inCount} IN</span>
                </div>
              </div>

              <div className="ride-actions">
                <button
                  className={clsx('action-btn btn-in', ride.status === 'IN' && 'active')}
                  onClick={() => toggleStatus(ride.id, 'IN')}
                >
                  <CheckCircle2 size={24} />
                  <span>I'm In</span>
                </button>
                <button
                  className={clsx('action-btn btn-out', ride.status === 'OUT' && 'active')}
                  onClick={() => toggleStatus(ride.id, 'OUT')}
                >
                  <XCircle size={24} />
                  <span>I'm Out</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ClubsList = () => {
  const [clubs, setClubs] = useState(MOCK_CLUBS);

  const toggleJoin = (id: string) => {
    setClubs(clubs.map(c => c.id === id ? { ...c, joined: !c.joined } : c));
  };

  return (
    <div className="page-container fade-in">
      <Header title="Clubs" rightNode={<Search size={24} className="text-secondary" />} />

      <div className="content-scrollable with-nav-padding">
        <div className="clubs-grid">
          {clubs.map(club => (
            <div key={club.id} className="club-card glass-panel">
              <img src={club.image} alt={club.name} className="club-image" />
              <div className="club-info">
                <h3 className="club-name">{club.name}</h3>
                <p className="club-members">{club.members} riders</p>
                <button
                  className={clsx('join-btn', club.joined ? 'joined' : 'not-joined')}
                  onClick={() => toggleJoin(club.id)}
                >
                  {club.joined ? 'Joined' : 'Join Club'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChatView = () => {
  const [messages, setMessages] = useState(MOCK_CHATS);
  const [input, setInput] = useState('');

  // Auto delete mock logic
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => prev.filter(m => differenceInHours(new Date(), m.timestamp) < 24));
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      text: input,
      senderId: currentUser.id,
      senderName: currentUser.name,
      timestamp: new Date(),
      avatar: currentUser.avatar
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="page-container fade-in">
      <Header
        title="Squad Chat"
        rightNode={<div className="timer-badge"><Clock size={14} className="icon-inline" /> 24h</div>}
      />

      <div className="chat-area with-nav-padding">
        <div className="messages-list">
          {messages.length === 0 ? (
            <p className="empty-chat">Messages disappear after 24h. It's quiet here...</p>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              const hoursLeft = 24 - differenceInHours(new Date(), msg.timestamp);
              return (
                <div key={msg.id} className={clsx('message-wrapper', isMe ? 'me' : 'other')}>
                  {!isMe && <img src={msg.avatar} alt="avatar" className="msg-avatar" />}
                  <div className="message-content">
                    {!isMe && <span className="msg-name">{msg.senderName}</span>}
                    <div className={clsx('message-bubble', isMe ? 'bubble-me' : 'bubble-other')}>
                      {msg.text}
                    </div>
                    <span className="msg-time">{format(msg.timestamp, 'h:mm a')} • {Math.max(0, hoursLeft)}h left</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="chat-input-area">
          <button className="camera-btn"><Camera size={24} /></button>
          <input
            type="text"
            placeholder="Send a snap or message..."
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className={clsx('send-btn', input.trim() && 'active')}
            onClick={handleSend}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- APP ROOT (ROUTING) ---

const MobileAppLayout = () => {
  return (
    <div className="mobile-mockup-wrapper">
      <div className="container app-wrapper mobile-frame">
        <Outlet />
        <NavigationBar />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Website Pages */}
        <Route element={<LayoutMain />}>
          <Route path="/" element={<LandingHome />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
        </Route>

        {/* The "App" View (Mocking a Mobile Phone Layout) */}
        <Route path="/app" element={<MobileAppLayout />}>
          <Route index element={<HomeRides />} />
          <Route path="clubs" element={<ClubsList />} />
          <Route path="chat" element={<ChatView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
