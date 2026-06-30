import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function ImpactCard({ im, issue }) {
  const [open, setOpen] = useState(false);
  const { setMode, openIssueDetail } = useApp();

  const respColor = im.municipalityResponded ? '#10b981' : '#ef4444';
  const respLabel = im.municipalityResponded ? 'Responded' : 'No response yet';

  function jumpToIssue() {
    setMode('issues');
    setTimeout(() => openIssueDetail(issue.id), 150);
  }

  return (
    <div className="impact-card" id={`card-${im.id}`}>
      <div className="impact-card-head">
        <div>
          <div className="impact-title">{im.title}</div>
          <div className="impact-sub">{issue ? issue.ward : ''} · Day {im.daysUnresolved} unresolved</div>
        </div>
        <div className="impact-resolve-ring" style={{ '--pct': im.resolutionPct }}>
          <span>{im.resolutionPct}%</span>
        </div>
      </div>

      <div className="impact-progress-track">
        <div className="impact-progress-fill" style={{ width: `${im.resolutionPct}%` }}></div>
      </div>

      <div className="impact-stat-row">
        <div className="impact-stat"><div className="impact-stat-num" style={{ color: '#ef4444' }}>{im.peopleAffected}+</div><div className="impact-stat-lbl">People Affected</div></div>
        <div className="impact-stat"><div className="impact-stat-num" style={{ color: '#f59e0b' }}>{im.health.score}</div><div className="impact-stat-lbl">Health Impact Score</div></div>
        <div className="impact-stat"><div className="impact-stat-num" style={{ color: '#8b5cf6' }}>{im.environment.score}</div><div className="impact-stat-lbl">Environmental Score</div></div>
        <div className="impact-stat"><div className="impact-stat-num" style={{ color: respColor, fontSize: '.82rem' }}>{respLabel}</div><div className="impact-stat-lbl">Govt. Response</div></div>
      </div>

      <div className="impact-section">
        <div className="impact-section-label health"><i className="fas fa-heart-pulse"></i> Health Impact ({im.health.level})</div>
        <ul className="impact-list">{im.health.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
      </div>
      <div className="impact-section">
        <div className="impact-section-label env"><i className="fas fa-leaf"></i> Environmental Impact</div>
        <ul className="impact-list">{im.environment.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
      </div>
      <div className="impact-section">
        <div className="impact-section-label community"><i className="fas fa-people-group"></i> Community Impact</div>
        <ul className="impact-list">{im.community.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
      </div>

      <button className="impact-feed-toggle" onClick={() => setOpen((o) => !o)}>
        <i className={`fas fa-chevron-${open ? 'up' : 'down'}`}></i> {open ? 'Hide' : 'View'} Live Updates Feed
      </button>
      <div className="impact-feed" style={{ display: open ? 'block' : 'none' }}>
        {im.timeline.map((t) => (
          <div className="impact-feed-row" key={t.day}>
            <div className="impact-feed-day">Day {t.day}</div>
            <div className="impact-feed-body">
              <div className="impact-feed-label">{t.label}</div>
              <div className="impact-feed-detail">{t.detail}</div>
              <div className="impact-feed-date">{t.date}</div>
            </div>
          </div>
        ))}
      </div>

      {issue && (
        <button className="impact-view-issue-btn" onClick={jumpToIssue}>
          <i className="fas fa-map-marker-alt"></i> View Original Issue
        </button>
      )}
    </div>
  );
}
