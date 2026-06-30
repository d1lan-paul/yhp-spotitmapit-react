import { useApp } from '../context/AppContext.jsx';

export default function FilterSortBar() {
  const { activeSort, setSort, subView, setSubView } = useApp();

  return (
    <div className="filter-sort-bar">
      <div className="filter-dropdowns">
        <select className="flt-select" id="fltType" defaultValue="Reports">
          <option>Reports</option>
          <option>Issues</option>
          <option>All</option>
        </select>
        <select className="flt-select" id="fltSeverity" defaultValue="Severity">
          <option>Severity</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className="flt-select" id="fltStatus" defaultValue="Status">
          <option>Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <select
          className="flt-select"
          id="fltSort"
          value={activeSort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Sort: Latest</option>
          <option value="severity">Sort: Severity</option>
          <option value="status">Sort: Status</option>
          <option value="nearme">Sort: Near me</option>
        </select>
      </div>
      <div className="view-pills">
        <button
          className={`view-pill ${subView === 'map' ? 'active' : ''}`}
          id="vpMap"
          onClick={() => setSubView('map')}
        >
          <i className="fas fa-map"></i> Map
        </button>
        <button
          className={`view-pill ${subView === 'list' ? 'active' : ''}`}
          id="vpList"
          onClick={() => setSubView('list')}
        >
          <i className="fas fa-list"></i> List
        </button>
      </div>
    </div>
  );
}
