import { useApp } from '../context/AppContext.jsx';
import IssueListItem from './IssueListItem.jsx';

export default function ListView() {
  const { visibleIssues, activeSort } = useApp();

  const emptyMsg = activeSort === 'nearme' ? 'No nearby reported issues' : 'No active reported issues';

  return (
    <div className="list-view" id="listView">
      <div id="issueListContainer">
        {visibleIssues.length === 0 ? (
          <div className="issues-empty">
            <i className="fas fa-circle-check" style={{ fontSize: '1.6rem', color: '#10b981', marginBottom: 8, display: 'block' }}></i>
            {emptyMsg}
          </div>
        ) : (
          visibleIssues.map((issue) => <IssueListItem key={issue.id} issue={issue} />)
        )}
      </div>
    </div>
  );
}
