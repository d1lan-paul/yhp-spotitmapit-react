import { useApp } from '../context/AppContext.jsx';

const TAB_LABELS = { government: 'Government', community: 'Community', technology: 'Technology', ngo: 'NGO', international: "Int'l Case Study" };

export default function SolutionCard({ s }) {
  const { openSolutionDetail, setInfoModal } = useApp();

  function openCityModal(e) {
    e.stopPropagation();
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
    <div className="sol-card" onClick={() => openSolutionDetail(s.id)}>
      <div className="sol-card-top">
        <span className="sol-flag">{s.flag}</span>
        <div className="sol-place-block">
          <div className="sol-place">{s.place}</div>
          <div className="sol-problem">{s.problem}</div>
        </div>
        <div className="sol-success" title="Success rate">{s.successRate}%</div>
      </div>
      <div className="sol-solution-line"><i className="fas fa-lightbulb"></i> {s.solution}</div>
      <div className="sol-tag-row">
        {s.tabs.map((t) => (
          <span key={t} className={`sol-pill ${t}`}>{TAB_LABELS[t] || t}</span>
        ))}
      </div>
      <div className="sol-impact-row">
        <span><i className="fas fa-arrow-trend-up"></i> {s.after}</span>
      </div>
      <button className="sol-cta-btn" onClick={openCityModal}>
        Can this work in my city? <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
}

export { TAB_LABELS };
