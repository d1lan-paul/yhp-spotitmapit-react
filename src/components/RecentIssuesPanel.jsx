import { useApp } from '../context/AppContext.jsx';

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/* Lives next to (desktop) / below (mobile) the compact map card.
   `issues` is already newest-first (addIssue prepends), so the first
   few entries are exactly the "recent" ones — no extra sort needed. */
export default function RecentIssuesPanel() {
  const { issues, openIssueDetail, setSubView } = useApp();
  const recent = issues.slice(0, 4);

  return (
    <div className="recent-issues-panel" id="recentIssuesPanel">
      <div className="recent-issues-title">
        <i className="fas fa-clock" style={{ color: 'var(--green)', marginRight: 6 }}></i>
        Recent Issues
      </div>

      {recent.length === 0 ? (
        <div className="issues-empty" style={{ padding: '16px 0' }}>
          <i className="fas fa-circle-check" style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: 6, display: 'block' }}></i>
          No issues reported yet
        </div>
      ) : (
        recent.map((issue) => (
          <div className="recent-issue-card" key={issue.id} onClick={() => openIssueDetail(issue.id)}>
            <img
              className="recent-issue-thumb"
              src={issue.img}
              alt={issue.title}
              loading="lazy"
              decoding="async"
              onError={(e) => { e.currentTarget.style.background = '#e5e7eb'; }}
            />
            <div className="recent-issue-body">
              <div className="recent-issue-title">{issue.title}</div>
              <div className="recent-issue-loc">
                <i className="fas fa-map-marker-alt" style={{ color: 'var(--green)' }}></i> {issue.ward}
              </div>
              <span className={`status-chip ${issue.status}`} style={{ marginTop: 4, display: 'inline-block' }}>
                {issue.status === 'in-progress' ? 'In Progress' : cap(issue.status)}
              </span>
            </div>
          </div>
        ))
      )}

      <button className="view-all-issues-btn" onClick={() => setSubView('list')}>
        View All Issues <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
}
