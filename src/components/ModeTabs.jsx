import { useApp } from '../context/AppContext.jsx';

const TABS = [
  { mode: 'issues', icon: 'fa-exclamation-circle', cls: 'issues-icon', label: 'Issues' },
  { mode: 'solutions', icon: 'fa-lightbulb', cls: 'solutions-icon', label: 'Solutions' },
  { mode: 'impact', icon: 'fa-chart-bar', cls: 'impact-icon', label: 'Impact' },
  { mode: 'nearme', icon: 'fa-location-arrow', cls: 'nearme-icon', label: 'Near Me' },
];

export default function ModeTabs() {
  const { activeTab, setMode } = useApp();
  return (
    <div className="mode-tabs">
      {TABS.map((t) => (
        <button
          key={t.mode}
          className={`mode-tab ${activeTab === t.mode ? 'active' : ''}`}
          data-mode={t.mode}
          onClick={() => setMode(t.mode)}
        >
          <span className={`tab-icon ${t.cls}`}>
            <i className={`fas ${t.icon}`}></i>
          </span>
          {t.label}
        </button>
      ))}
    </div>
  );
}
