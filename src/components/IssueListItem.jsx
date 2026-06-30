import { useApp } from '../context/AppContext.jsx';

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

export default function IssueListItem({ issue }) {
  const { openIssueDetail } = useApp();
  return (
    <div className="issue-list-item" onClick={() => openIssueDetail(issue.id)}>
      <img
        className="ili-thumb"
        src={issue.img}
        alt={issue.title}
        loading="lazy"
        decoding="async"
        onError={(e) => { e.currentTarget.style.background = '#e5e7eb'; }}
      />
      <div className="ili-body">
        <div className="ili-title">{issue.title}</div>
        <div className="ili-loc">
          <i className="fas fa-map-marker-alt" style={{ color: '#10b981' }}></i> {issue.ward} · {issue.dist}
        </div>
        <div className="ili-desc">{issue.desc}</div>
        <div className="ili-meta">
          <span className={`severity-badge ${issue.severity}`}>{cap(issue.severity)}</span>
          <span className={`status-chip ${issue.status}`}>{issue.status === 'in-progress' ? 'In Progress' : cap(issue.status)}</span>
          <span className="affected-chip"><i className="fas fa-users"></i> {issue.affected}+ </span>
          <span className="affected-chip"><i className="fas fa-comment-dots"></i> {issue.reports} reports</span>
          <span style={{ fontSize: '.68rem', color: '#9ca3af', marginLeft: 'auto' }}>{issue.updated}</span>
        </div>
      </div>
    </div>
  );
}
