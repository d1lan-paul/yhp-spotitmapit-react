import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

const CAT_ROWS = [
  { cat: 'waste', icon: '🗑️', name: 'Waste', count: 24, active: true },
  { cat: 'water', icon: '💧', name: 'Water', count: 12, active: false },
  { cat: 'roads', icon: '🛣️', name: 'Roads', count: 10, active: false },
  { cat: 'pollution', icon: '🌫️', name: 'Pollution', count: 15, active: true },
  { cat: 'animals', icon: '🐾', name: 'Stray Animals', count: 8, active: false },
  { cat: 'electricity', icon: '⚡', name: 'Electricity', count: 6, active: false },
  { cat: 'health', icon: '❤️', name: 'Health', count: 7, active: false },
  { cat: 'safety', icon: '🛡️', name: 'Safety', count: 9, active: true },
];

export default function FilterPanel() {
  const { filtersOpen, setFiltersOpen, showToast } = useApp();
  const [catRows, setCatRows] = useState(CAT_ROWS);
  const [status, setStatus] = useState({ Open: true, 'In Progress': false, Resolved: false });
  const [priority, setPriority] = useState({ high: true, medium: false, low: false });
  const [time, setTime] = useState('This Week');

  const activeCount = catRows.filter((r) => r.active).length;

  function close() { setFiltersOpen(false); }
  function toggleCatRow(cat) {
    setCatRows((rows) => rows.map((r) => (r.cat === cat ? { ...r, active: !r.active } : r)));
  }
  function clearFilters() {
    setCatRows((rows) => rows.map((r) => ({ ...r, active: false })));
    setStatus({ Open: false, 'In Progress': false, Resolved: false });
    setPriority({ high: false, medium: false, low: false });
    showToast('Filters cleared');
  }
  function applyFilters() {
    close();
    showToast(`✓ ${activeCount} layers active on map`);
  }

  return (
    <>
      <div className={`filter-overlay ${filtersOpen ? 'open' : ''}`} id="filterOverlay" onClick={close}></div>
      <div className={`filter-panel ${filtersOpen ? 'open' : ''}`} id="filterPanel">
        <div className="filter-panel-header">
          <button className="filter-back" onClick={close}><i className="fas fa-arrow-left"></i></button>
          <span className="filter-title">Map Filters</span>
          <button className="filter-clear" onClick={clearFilters}>Clear all</button>
        </div>

        <div className="filter-section-label">Categories (Layers)</div>
        <div className="filter-cat-list" id="filterCatList">
          {catRows.map((r) => (
            <label key={r.cat} className={`filter-cat-row ${r.active ? 'active' : ''}`} data-cat={r.cat}>
              <span className="fcat-icon">{r.icon}</span>
              <span className="fcat-name">{r.name}</span>
              <span className="fcat-count">{r.count}</span>
              <input type="checkbox" checked={r.active} onChange={() => toggleCatRow(r.cat)} />
              <span className="fcat-check"></span>
            </label>
          ))}
        </div>
        <button className="show-more-btn" onClick={() => showToast('More filters coming soon!')}>
          Show More <i className="fas fa-chevron-down"></i>
        </button>

        <div className="filter-section-label" style={{ marginTop: '1.5rem' }}>Status</div>
        <div className="filter-status-btns">
          {Object.keys(status).map((s) => (
            <button
              key={s}
              className={`fstatus-btn ${status[s] ? 'active' : ''}`}
              onClick={() => setStatus((p) => ({ ...p, [s]: !p[s] }))}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="filter-section-label" style={{ marginTop: '1.5rem' }}>Priority</div>
        <div className="filter-priority-btns">
          {Object.keys(priority).map((p) => (
            <button
              key={p}
              className={`fpriority-btn ${p} ${priority[p] ? 'active' : ''}`}
              onClick={() => setPriority((prev) => ({ ...prev, [p]: !prev[p] }))}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <div className="filter-section-label" style={{ marginTop: '1.5rem' }}>Time</div>
        <div className="filter-time-btns">
          {['Today', 'This Week', 'This Month'].map((t) => (
            <button key={t} className={`ftime-btn ${time === t ? 'active' : ''}`} onClick={() => setTime(t)}>
              {t}
            </button>
          ))}
        </div>

        <button className="apply-filters-btn" onClick={applyFilters}>
          Apply Filters ({activeCount})
        </button>
        <div className="filter-active-label">{activeCount} layers active on map</div>
      </div>
    </>
  );
}
