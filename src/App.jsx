import { useApp } from './context/AppContext.jsx';
import TopNav from './components/TopNav.jsx';
import ModeTabs from './components/ModeTabs.jsx';
import CategoryBar from './components/CategoryBar.jsx';
import FilterSortBar from './components/FilterSortBar.jsx';
import StatsRow from './components/StatsRow.jsx';
import MapWrapper from './components/MapWrapper.jsx';
import ListView from './components/ListView.jsx';
import SolutionsView from './components/SolutionsView.jsx';
import ImpactView from './components/ImpactView.jsx';
import DetailPanel from './components/DetailPanel.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import ReportModal from './components/ReportModal.jsx';
import InfoModal from './components/InfoModal.jsx';
import Toast from './components/Toast.jsx';
import BottomNav from './components/BottomNav.jsx';

/* Mirrors vanilla ModeRouter.render(): which top sections are visible
   depends on `mode` (issues/solutions/impact) and, within 'issues',
   on `subView` (map/list). */
export default function App() {
  const { mode, subView } = useApp();

  const isIssues = mode === 'issues';

  return (
    <>
      <TopNav />
      <ModeTabs />

      {isIssues && <CategoryBar />}
      {isIssues && <FilterSortBar />}
      {isIssues && <StatsRow />}

      <div className="main-content" id="mainContent">
        {isIssues && subView === 'map' && <MapWrapper />}
        {isIssues && subView === 'list' && <ListView />}
        {mode === 'solutions' && <SolutionsView />}
        {mode === 'impact' && <ImpactView />}
      </div>

      <DetailPanel />
      <FilterPanel />
      <ReportModal />
      <InfoModal />
      <Toast />
      <BottomNav />
    </>
  );
}
