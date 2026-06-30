import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

/* Mirrors Shared.animateNum — counts up/down from the previous
   rendered value to the new target over ~20 steps. */
function useAnimatedNumber(target) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    const start = prevRef.current;
    const steps = 20;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const val = Math.round(start + (target - start) * (step / steps));
      setDisplay(val);
      if (step >= steps) {
        clearInterval(timer);
        prevRef.current = target;
      }
    }, 20);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return display >= 1000 ? display.toLocaleString() : display;
}

function Delta({ value, id }) {
  if (!value) return null;
  return (
    <div className="stat-delta up" id={id}>
      ↑ {value} today
    </div>
  );
}

export default function StatsRow() {
  const { stats } = useApp();
  const active = useAnimatedNumber(stats.active);
  const affected = useAnimatedNumber(stats.affected);
  const resolved = useAnimatedNumber(stats.resolved);

  return (
    <div className="stats-row">
      <div className="stat-item">
        <div className="stat-num red" id="statActive">{active}</div>
        <div className="stat-lbl">Active Issues</div>
        <Delta value={stats.activeToday} id="statActiveDelta" />
      </div>
      <div className="stat-sep"></div>
      <div className="stat-item">
        <div className="stat-num orange" id="statAffected">{affected}</div>
        <div className="stat-lbl">People Affected</div>
        <Delta value={stats.affectedToday} id="statAffectedDelta" />
      </div>
      <div className="stat-sep"></div>
      <div className="stat-item">
        <div className="stat-num green" id="statResolved">{resolved}</div>
        <div className="stat-lbl">Issues Resolved</div>
        <Delta value={stats.resolvedToday} id="statResolvedDelta" />
      </div>
      <div className="stat-sep"></div>
      <div className="stat-item">
        <div className="stat-num blue" id="statDays">{stats.days}</div>
        <div className="stat-lbl">Avg. Days to Resolve</div>
        {/* No historical baseline to compare against yet — hidden, matching vanilla build */}
      </div>
    </div>
  );
}
