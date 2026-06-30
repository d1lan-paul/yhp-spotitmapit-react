import { useApp } from '../context/AppContext.jsx';

export default function BottomSheet() {
  const { currentIssue, subView, openIssueDetail } = useApp();

  if (!currentIssue || subView !== 'map') return null;
  const issue = currentIssue;

  const sevLabel = issue.severity === 'high' ? 'High ↑' : issue.severity === 'medium' ? 'Medium' : 'Low';
  const statusLabel = issue.status === 'in-progress' ? 'In Progress' : issue.status === 'open' ? 'Open' : 'Resolved';

  return (
    <div className="bottom-sheet" id="bottomSheet" style={{ display: 'block' }}>
      <div className="sheet-drag-handle"></div>

      <div className="issue-preview-card" id="issuePreview" onClick={() => openIssueDetail(issue.id)}>
        <div className="issue-preview-left">
          <div className={`severity-badge ${issue.severity}`} id="previewSeverity">{sevLabel}</div>
          <img className="issue-thumb" id="previewThumb" src={issue.img} alt="Issue" loading="lazy" decoding="async" />
        </div>
        <div className="issue-preview-body">
          <div className="issue-title" id="previewTitle">{issue.title}</div>
          <div className="issue-location" id="previewLocation">
            <i className="fas fa-map-marker-alt"></i>
            <span id="previewLocText">{issue.ward}</span>
            &nbsp;·&nbsp;
            <span className="dist-badge" id="previewDist">{issue.dist} away</span>
          </div>
          <div className="issue-desc" id="previewDesc">{issue.desc}</div>
          <div className="issue-meta-row">
            <span className={`status-chip ${issue.status}`}>{statusLabel}</span>
            <span className="affected-chip"><i className="fas fa-users"></i> {issue.affected}+ affected</span>
            <span className="time-chip"><i className="fas fa-clock"></i> Updated {issue.updated}</span>
            <button className="view-details-btn" onClick={(e) => { e.stopPropagation(); openIssueDetail(issue.id); }}>
              View Details <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
