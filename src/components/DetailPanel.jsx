import { useApp } from '../context/AppContext.jsx';
import { SOLUTIONS } from '../data.js';
import { TAB_LABELS } from './SolutionCard.jsx';

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function IssueDetailBody({ issue }) {
  const { setReportOpen, showToast, setMode, openIssueDetail } = useApp();
  const impactColor = issue.severity === 'high' ? '#ef4444' : issue.severity === 'medium' ? '#f59e0b' : '#10b981';

  function shareReport() {
    if (navigator.share) {
      navigator.share({ title: 'YesHappinessProject — Spot It, Map It', text: 'I reported a civic issue on the community map!', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => showToast('Link copied to clipboard!'));
    }
  }

  function viewImpact() {
    setMode('impact');
  }

  return (
    <>
      <img className="detail-hero-img" src={issue.img} alt={issue.title} loading="lazy" decoding="async" />
      <div className="detail-title">{issue.title}</div>
      <div className="detail-loc">
        <i className="fas fa-map-marker-alt"></i> {issue.ward} ·{' '}
        <span style={{ background: '#d1fae5', color: '#059669', padding: '1px 8px', borderRadius: 10, fontSize: '.7rem', fontWeight: 700 }}>
          {issue.dist} away
        </span>
      </div>
      <div className="detail-tags">
        <span className="detail-tag" style={{ background: `${impactColor}20`, color: impactColor }}>{issue.severity.toUpperCase()} Priority</span>
        <span className="detail-tag" style={{ background: '#f3f4f6', color: '#374151' }}>📍 {issue.ward}</span>
        <span className="detail-tag" style={{ background: '#dbeafe', color: '#3b82f6' }}>{cap(issue.cat)}</span>
      </div>
      <div className="detail-desc">{issue.desc}</div>
      <div className="detail-stats">
        <div className="dstat-box"><div className="dstat-num" style={{ color: '#ef4444' }}>{issue.affected}+</div><div className="dstat-lbl">People Affected</div></div>
        <div className="dstat-box"><div className="dstat-num" style={{ color: '#3b82f6' }}>{issue.reports}</div><div className="dstat-lbl">Community Reports</div></div>
        <div className="dstat-box"><div className="dstat-num" style={{ color: '#f59e0b' }}>{issue.updated}</div><div className="dstat-lbl">Last Update</div></div>
      </div>
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button onClick={() => setReportOpen(true)} style={{ flex: 1, padding: 12, background: '#10b981', color: '#fff', borderRadius: 11, fontSize: '.88rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Report Similar</button>
        <button onClick={shareReport} style={{ flex: 1, padding: 12, background: '#f3f4f6', color: '#374151', borderRadius: 11, fontSize: '.88rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}><i className="fas fa-share-alt"></i> Share</button>
        <button onClick={viewImpact} style={{ flex: 1, padding: 12, background: '#ede9fe', color: '#7c3aed', borderRadius: 11, fontSize: '.88rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}><i className="fas fa-chart-line"></i> View Impact</button>
      </div>
    </>
  );
}

function SolutionDetailBody({ s }) {
  const { setInfoModal } = useApp();

  function openCityModal() {
    const verdictClass = s.adaptable ? 'good' : 'partial';
    const verdictLabel = s.adaptable ? 'Yes — Adaptable' : 'Possible, with changes';
    setInfoModal({
      title: `Can ${s.place}'s solution work in your city?`,
      body: (
        <>
          <div className={`city-verdict ${verdictClass}`}>
            <i className={`fas ${s.adaptable ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i> {verdictLabel}
          </div>
          <p className="city-verdict-note">{s.adaptNote}</p>
          <div className="sol-detail-block">
            <div className="sol-detail-label">What it would take</div>
            <div className="sol-detail-text">{s.actions}</div>
          </div>
          <div className="detail-stats">
            <div className="dstat-box"><div className="dstat-num" style={{ color: '#3b82f6', fontSize: '.85rem' }}>{s.cost}</div><div className="dstat-lbl">Est. Cost</div></div>
            <div className="dstat-box"><div className="dstat-num" style={{ color: '#10b981' }}>{s.successRate}%</div><div className="dstat-lbl">Proven Success Rate</div></div>
          </div>
        </>
      ),
    });
  }

  return (
    <>
      <div className="detail-title">{s.flag} {s.place}</div>
      <div className="detail-tags">
        {s.tabs.map((t) => (
          <span key={t} className="detail-tag" style={{ background: '#ede9fe', color: '#7c3aed' }}>{TAB_LABELS[t] || t}</span>
        ))}
      </div>
      <div className="sol-detail-block">
        <div className="sol-detail-label">Problem Solved</div>
        <div className="sol-detail-text">{s.problem}</div>
      </div>
      <div className="sol-detail-block">
        <div className="sol-detail-label">Solution Implemented</div>
        <div className="sol-detail-text">{s.solution}</div>
      </div>
      <div className="sol-detail-block">
        <div className="sol-detail-label">Government / Community Actions</div>
        <div className="sol-detail-text">{s.actions}</div>
      </div>
      <div className="sol-detail-block">
        <div className="sol-detail-label">Technology Used</div>
        <div className="sol-detail-text">{s.tech}</div>
      </div>
      <div className="detail-stats" style={{ marginTop: 10 }}>
        <div className="dstat-box"><div className="dstat-num" style={{ color: '#10b981' }}>{s.successRate}%</div><div className="dstat-lbl">Success Rate</div></div>
        <div className="dstat-box"><div className="dstat-num" style={{ color: '#3b82f6', fontSize: '.85rem' }}>{s.cost}</div><div className="dstat-lbl">Est. Cost</div></div>
        <div className="dstat-box"><div className="dstat-num" style={{ color: s.adaptable ? '#10b981' : '#f59e0b' }}>{s.adaptable ? 'Yes' : 'Partial'}</div><div className="dstat-lbl">Locally Adaptable</div></div>
      </div>
      <div className="sol-before-after">
        <div className="ba-col"><div className="ba-label">Before</div><div className="ba-text">{s.before}</div></div>
        <div className="ba-arrow"><i className="fas fa-arrow-right"></i></div>
        <div className="ba-col"><div className="ba-label">After</div><div className="ba-text">{s.after}</div></div>
      </div>
      <button className="sol-cta-btn" style={{ marginTop: 14 }} onClick={openCityModal}>
        Can this work in my city? <i className="fas fa-arrow-right"></i>
      </button>
    </>
  );
}

export default function DetailPanel() {
  const { detailOpen, detailContent, closeDetail, issues, setFiltersOpen } = useApp();

  let body = null;
  if (detailContent?.kind === 'issue') {
    const issue = issues.find((i) => i.id === detailContent.id);
    if (issue) body = <IssueDetailBody issue={issue} />;
  } else if (detailContent?.kind === 'solution') {
    const s = SOLUTIONS.find((x) => x.id === detailContent.id);
    if (s) body = <SolutionDetailBody s={s} />;
  }

  return (
    <div className={`detail-panel ${detailOpen ? 'open' : ''}`} id="detailPanel">
      <div className="detail-header">
        <button className="detail-back" onClick={closeDetail}><i className="fas fa-arrow-left"></i> All Issues</button>
        <button className="detail-filter" onClick={() => setFiltersOpen(true)}><i className="fas fa-sliders-h"></i></button>
        <button className="detail-share"><i className="fas fa-share-alt"></i></button>
      </div>
      <div className="detail-body" id="detailBody">{body}</div>
    </div>
  );
}
