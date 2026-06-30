/* ════════════════════════════════════════════════════════════════
   AppContext — replaces the vanilla app's mutable globals (Shared's
   currentIssue/subView/activeCategories, IssuesModule's activeCats/
   activeSort/userPos, ModeRouter's mode, ReportModal's wizard state)
   with React state so the component tree re-renders correctly.

   ISSUES starts empty — there is no fake/hardcoded data. New issues
   are added only via the Report flow (addIssue).
   ════════════════════════════════════════════════════════════════ */
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { DataUtil } from '../data.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const mapInstanceRef = useRef(null); // set by MapView once Leaflet mounts; read by map control buttons
  const [issues, setIssues] = useState([]);
  const [mode, setModeState] = useState('issues');           // 'issues' | 'solutions' | 'impact'
  const [activeTab, setActiveTab] = useState('issues');      // mirrors which mode-tab is highlighted (nearme is its own tab but maps to mode='issues')
  const [subView, setSubView] = useState('map');              // 'map' | 'list' — only meaningful in 'issues' mode
  const [activeCategories, setActiveCategories] = useState([]); // category-bar chips, [] = all
  const [activeSort, setActiveSort] = useState('latest');
  const [userPos, setUserPos] = useState(null);
  const [currentIssue, setCurrentIssue] = useState(null);
  const [wardTitle, setWardTitle] = useState('Ward 22 - Chokkasandra');
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailContent, setDetailContent] = useState(null);   // { kind: 'issue'|'solution', id }
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportStep, setReportStep] = useState(1);            // 1-5, read by MapView to know whether clicks should drop a pin
  const [reportLocation, setReportLocation] = useState(null); // {lat,lng} | null
  const [infoModal, setInfoModal] = useState(null);           // { title, body: ReactNode } | null
  const [toast, setToastState] = useState('');

  const showToast = useCallback((msg) => {
    setToastState(msg);
    window.clearTimeout(window._yhpToastTimer);
    window._yhpToastTimer = window.setTimeout(() => setToastState(''), 2800);
  }, []);

  const setMode = useCallback((requested) => {
    const next = requested === 'nearme' ? 'issues' : requested;
    setActiveTab(requested);
    setModeState(next);
    if (requested === 'nearme') setActiveSort('nearme');
  }, []);

  const addIssue = useCallback((issue) => {
    setIssues((prev) => [issue, ...prev]);
  }, []);

  const locateUser = useCallback(() => {
    if (!navigator.geolocation) return;
    showToast('📍 Locating you…');
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserPos(null),
      { timeout: 6000 }
    );
  }, [showToast]);

  const NEARME_RADIUS_M = 2000;

  /* Derived, filtered + sorted issue list — recomputed whenever any
     dependency changes, mirrors IssuesModule.applyFiltersAndSort() */
  const visibleIssues = useMemo(() => {
    let list = activeCategories.length
      ? issues.filter((i) => activeCategories.includes(i.cat))
      : issues.slice();

    if (userPos) {
      list = list.map((i) => {
        const m = DataUtil.distanceMeters(userPos.lat, userPos.lng, i.lat, i.lng);
        return { ...i, distMeters: m, dist: DataUtil.formatDist(m) };
      });
    }

    switch (activeSort) {
      case 'severity': {
        const rank = { high: 0, medium: 1, low: 2 };
        list.sort((a, b) => rank[a.severity] - rank[b.severity]);
        break;
      }
      case 'status': {
        const rank = { open: 0, 'in-progress': 1, resolved: 2 };
        list.sort((a, b) => rank[a.status] - rank[b.status]);
        break;
      }
      case 'nearme':
        list = list.filter((i) => i.distMeters != null && i.distMeters <= NEARME_RADIUS_M);
        list.sort((a, b) => a.distMeters - b.distMeters);
        break;
      case 'latest':
      default:
        list.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        break;
    }
    return list;
  }, [issues, activeCategories, activeSort, userPos]);

  const stats = useMemo(() => DataUtil.computeStats(issues), [issues]);

  const openIssueDetail = useCallback((id) => {
    const issue = issues.find((i) => i.id === id);
    if (!issue) return;
    setCurrentIssue(issue);
    setDetailContent({ kind: 'issue', id });
    setDetailOpen(true);
  }, [issues]);

  const openSolutionDetail = useCallback((id) => {
    setDetailContent({ kind: 'solution', id });
    setDetailOpen(true);
  }, []);

  const closeDetail = useCallback(() => setDetailOpen(false), []);

  const setSort = useCallback((sortKey) => {
    setActiveSort(sortKey);
    if (sortKey === 'nearme') locateUser();
  }, [locateUser]);

  const toggleCategory = useCallback((cat) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  const value = {
    mapInstanceRef,
    issues, setIssues, addIssue,
    mode, setMode, activeTab,
    subView, setSubView,
    activeCategories, toggleCategory,
    activeSort, setSort,
    userPos, locateUser,
    currentIssue, setCurrentIssue,
    wardTitle, setWardTitle,
    detailOpen, detailContent, openIssueDetail, openSolutionDetail, closeDetail,
    filtersOpen, setFiltersOpen,
    reportOpen, setReportOpen,
    reportStep, setReportStep,
    reportLocation, setReportLocation,
    infoModal, setInfoModal,
    toast, showToast,
    visibleIssues, stats,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
