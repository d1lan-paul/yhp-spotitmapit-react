import { useApp } from '../context/AppContext.jsx';

const CATS = [
  { cat: 'waste', icon: '🗑️', label: 'Waste' },
  { cat: 'water', icon: '💧', label: 'Water' },
  { cat: 'roads', icon: '🛣️', label: 'Roads' },
  { cat: 'electricity', icon: '⚡', label: 'Electricity' },
];

export default function CategoryBar() {
  const { activeCategories, toggleCategory, setFiltersOpen } = useApp();

  return (
    <div className="category-bar" id="categoryBar">
      {CATS.map((c) => (
        <button
          key={c.cat}
          className={`cat-chip ${activeCategories.includes(c.cat) ? 'active' : ''}`}
          data-cat={c.cat}
          onClick={() => toggleCategory(c.cat)}
        >
          <span className={`cat-chip-icon ${c.cat}`}>{c.icon}</span> {c.label}
        </button>
      ))}
      <button className="cat-chip more-chip" onClick={() => setFiltersOpen(true)}>
        ···&nbsp; More
      </button>
    </div>
  );
}
