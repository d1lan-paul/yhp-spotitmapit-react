import { useApp } from '../context/AppContext.jsx';
import { DataUtil } from '../data.js';
import ImpactCard from './ImpactCard.jsx';

export default function ImpactView() {
  const { issues } = useApp();

  return (
    <div className="impact-wrapper" id="impactWrapper">
      <div className="impact-scroll" id="impactView">
        <div className="impact-intro">
          <i className="fas fa-tower-broadcast"></i>
          Live tracker — see how unresolved issues affect health, environment and the community over time.
        </div>

        {issues.length === 0 ? (
          <div className="impact-empty">
            <i className="fas fa-circle-check" style={{ fontSize: '1.6rem', color: '#10b981', marginBottom: 8, display: 'block' }}></i>
            No live impact data yet — report an issue to start tracking it here.
          </div>
        ) : (
          <div className="impact-grid">
            {issues.map((issue) => {
              const im = DataUtil.buildImpactForIssue(issue);
              return <ImpactCard key={im.id} im={im} issue={issue} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
