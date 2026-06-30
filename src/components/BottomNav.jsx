import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function BottomNav() {
  const { setMode, setReportOpen, showToast } = useApp();
  const [active, setActive] = useState('home');

  function select(page) {
    setActive(page);
    if (page === 'solutions') setMode('solutions');
    else if (page === 'home') setMode('issues');
    else showToast(`${page.charAt(0).toUpperCase() + page.slice(1)} — coming soon!`);
  }

  return (
    <nav className="bottom-nav">
      <button className={`bnav-btn ${active === 'home' ? 'active' : ''}`} onClick={() => select('home')}>
        <i className="fas fa-home"></i><span>Home</span>
      </button>
      <button className={`bnav-btn ${active === 'solutions' ? 'active' : ''}`} onClick={() => select('solutions')}>
        <i className="fas fa-lightbulb"></i><span>Solutions</span>
      </button>
      <button className="bnav-btn report-center-btn" onClick={() => setReportOpen(true)}>
        <div className="report-center-icon"><i className="fas fa-plus"></i></div>
        <span>Report</span>
      </button>
      <button className={`bnav-btn ${active === 'support' ? 'active' : ''}`} onClick={() => select('support')}>
        <i className="fas fa-hands-helping"></i><span>Support</span>
      </button>
      <button className={`bnav-btn ${active === 'more' ? 'active' : ''}`} onClick={() => select('more')}>
        <i className="fas fa-ellipsis-h"></i><span>More</span>
      </button>
    </nav>
  );
}
