import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { DataUtil } from '../data.js';
import SolutionCard from './SolutionCard.jsx';

const TABS = [
  { tab: 'all', icon: null, label: 'All' },
  { tab: 'government', icon: 'fa-landmark', label: 'Government' },
  { tab: 'community', icon: 'fa-people-group', label: 'Community' },
  { tab: 'technology', icon: 'fa-microchip', label: 'Technology' },
  { tab: 'ngo', icon: 'fa-hand-holding-heart', label: 'NGO' },
  { tab: 'international', icon: 'fa-globe', label: "Int'l Case Studies" },
];

const CAT_LABELS = { waste: 'Waste', water: 'Water', roads: 'Roads', electricity: 'Electricity' };

export default function SolutionsView() {
  const { activeCategories } = useApp();
  const [activeTab, setActiveTab] = useState('all');

  /* Mirrors the vanilla activeCategory(): solutions are filtered by the
     category selected in Issues only when exactly one category chip is
     active — otherwise show case studies across all categories. */
  const cat = activeCategories.length === 1 ? activeCategories[0] : 'all';
  const list = DataUtil.solutionsByCatAndTab(cat, activeTab);

  return (
    <div className="solutions-wrapper" id="solutionsWrapper">
      <div className="sol-tabs" id="solTabs">
        {TABS.map((t) => (
          <button
            key={t.tab}
            className={`sol-tab ${activeTab === t.tab ? 'active' : ''}`}
            data-tab={t.tab}
            onClick={() => setActiveTab(t.tab)}
          >
            {t.icon && <i className={`fas ${t.icon}`}></i>} {t.label}
          </button>
        ))}
      </div>
      <div className="solutions-scroll" id="solutionsView">
        <div className="sol-intro">
          <i className="fas fa-graduation-cap"></i>
          {cat === 'all'
            ? 'How the world solved problems like this — explore proven government, community, technology and NGO-led solutions you can bring home.'
            : <>Proven solutions for <strong>{CAT_LABELS[cat] || cat}</strong> issues from governments, communities, NGOs and technology around the world.</>}
        </div>
        <div className="sol-grid">
          {list.map((s) => <SolutionCard key={s.id} s={s} />)}
        </div>
        {list.length === 0 && <div className="sol-empty">No case studies in this category yet.</div>}
      </div>
    </div>
  );
}
