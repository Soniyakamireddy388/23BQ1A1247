import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AlertCircle, Briefcase, Calendar, ShieldAlert, CheckCircle, Bell } from 'lucide-react';
import './style.css';

const sampleNotifications = [
  { "ID": "b283218f-ea5a-4b7c-93a9-1f2f240d64b0", "Type": "Placement", "Message": "CSX Corporation hiring drive initialized for CS/IT branches.", "Timestamp": "2026-04-22 17:51:18" },
  { "ID": "8a7412bd-6065-4d09-8501-a37f11cc848b", "Type": "Placement", "Message": "Advanced Micro Devices Inc. (AMD) registration window closing.", "Timestamp": "2026-04-22 17:49:42" },
  { "ID": "d146095a-0d86-4a34-9e69-3900a14576bc", "Type": "Result", "Message": "Mid-Semester examinations performance metrics published.", "Timestamp": "2026-04-22 17:51:30" },
  { "ID": "0005513a-142b-4bbc-8678-eefec65e1ede", "Type": "Result", "Message": "Mid-Semester lab evaluation grades updated on portal.", "Timestamp": "2026-04-22 17:50:54" },
  { "ID": "ea836726-c25e-4f21-a72f-544a6af8a37f", "Type": "Result", "Message": "Project Phase-1 internal review scheduling released.", "Timestamp": "2026-04-22 17:50:42" },
  { "ID": "81589ada-0ad3-4f77-9554-f52fb558e09d", "Type": "Event", "Message": "Annual Campus Farewell ceremony registration open.", "Timestamp": "2026-04-22 17:51:06" },
  { "ID": "1cfce5ee-ad37-4b46-b946-d707627176a5", "Type": "Event", "Message": "National Level Tech-Fest registrations crossing targets.", "Timestamp": "2026-04-22 17:50:06" }
];

const typeWeights = { placement: 3, result: 2, event: 1 };

function App() {
  const [notifications] = useState(
    [...sampleNotifications].sort((a, b) => {
      const weightA = typeWeights[a.Type.toLowerCase()] || 0;
      const weightB = typeWeights[b.Type.toLowerCase()] || 0;
      if (weightA !== weightB) return weightB - weightA;
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
  );

  const [filter, setFilter] = useState('All');

  const filteredData = filter === 'All' 
    ? notifications 
    : notifications.filter(n => n.Type === filter);

  const getIcon = (type) => {
    switch(type) {
      case 'Placement': return <Briefcase className="icon placement-icon" />;
      case 'Result': return <AlertCircle className="icon result-icon" />;
      case 'Event': return <Calendar className="icon event-icon" />;
      default: return <Bell className="icon" />;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-title">
          <ShieldAlert className="main-logo" />
          <div>
            <h1>Smart Campus Priority Inbox</h1>
            <p>Real-time Academic & Placement Heuristic Dispatcher</p>
          </div>
        </div>
        <div className="filter-bar">
          {['All', 'Placement', 'Result', 'Event'].map((cat) => (
            <button 
              key={cat} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat} Notices
            </button>
          ))}
        </div>
      </header>

      <main className="notification-grid">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.ID} className={`card border-${item.Type.toLowerCase()}`}>
              <div className="card-header">
                <div className="badge-wrapper">
                  {getIcon(item.Type)}
                  <span className={`badge tag-${item.Type.toLowerCase()}`}>{item.Type}</span>
                </div>
                <span className="timestamp">{item.Timestamp}</span>
              </div>
              <div className="card-body">
                <p>{item.Message}</p>
              </div>
              <div className="card-footer">
                <span className="id-label">UUID: {item.ID.slice(0, 8)}...</span>
                <span className="status-verified"><CheckCircle size={14} /> Verified</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No notifications found in this segment.</div>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);