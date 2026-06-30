import { useApp } from '../context/AppContext.jsx';

export default function TopNav() {
  const { subView, setSubView, mode } = useApp();

  function setView(v) {
    setSubView(v);
  }

  return (
    <header className="top-nav">
      <div className="nav-left">
        <div className="brand">
          <div className="brand-logo">
            <img
              src="https://yeshappinessproject.com/cdn/shop/files/logo_yes_happiness_project.png?v=1722396755"
              alt="YHP"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fb = e.currentTarget.parentElement.querySelector('.brand-logo-fallback');
                if (fb) fb.style.display = 'flex';
              }}
            />
            <div className="brand-logo-fallback">YES</div>
          </div>
          <div className="brand-text">
            <span className="brand-name">YesHappiness</span>
            <span className="brand-sub">Project</span>
          </div>
        </div>
      </div>

      <div className="nav-location" id="navLocation">
        <i className="fas fa-map-marker-alt"></i>
        <span id="locationLabel">Kochi, Kerala</span>
        <i className="fas fa-chevron-down"></i>
      </div>

      <div className="nav-right">
        <button
          className={`view-toggle ${mode === 'issues' && subView === 'map' ? 'active' : ''}`}
          onClick={() => setView('map')}
        >
          <i className="fas fa-map"></i> Map
        </button>
        <button
          className={`view-toggle ${mode === 'issues' && subView === 'list' ? 'active' : ''}`}
          onClick={() => setView('list')}
        >
          <i className="fas fa-list"></i> List
        </button>
        <button className="nav-icon-btn notif" id="notifBtn">
          <i className="fas fa-bell"></i>
          <span className="badge">3</span>
        </button>
        <button className="nav-icon-btn" id="menuBtn">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
}
