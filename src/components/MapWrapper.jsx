import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import MapView from './MapView.jsx';
import BottomSheet from './BottomSheet.jsx';
import RecentIssuesPanel from './RecentIssuesPanel.jsx';

export default function MapWrapper() {
  const { mapInstanceRef, showToast, setFiltersOpen, setReportOpen, wardTitle } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  function gotoMyLocation() {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          map.setView([pos.coords.latitude, pos.coords.longitude], 14);
          showToast('📍 Moved to your location');
        },
        () => {
          map.setView([9.9312, 76.2673], 14);
          showToast('📍 Showing Kochi, Kerala');
        }
      );
    } else {
      map.setView([9.9312, 76.2673], 14);
    }
  }

  function refreshMap() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 700);
    showToast('Map refreshed — Live data');
  }

  return (
    <div className="map-card-section" id="mapCardSection">
      <div className="map-card-row">
        {/* The map itself is now a compact, boxed card (not full-bleed) —
            see .map-card in styles.css for the size constraints
            (mobile: full-width / 280-320px tall, desktop: max-width
            480px / 340px tall). Everything that used to overlay the
            full-size map (ward panel, heatmap toggle, controls) now
            overlays this smaller box instead. */}
        <div className="map-wrapper map-card" id="mapWrapper">
          <div className="ward-panel" id="wardPanel">
            <div className="ward-header">
              <div className="ward-title">{wardTitle}</div>
              <div className="ward-sub">24 Issues &nbsp;·&nbsp; Top: Waste</div>
            </div>
            <button
              className="ward-details-btn"
              onClick={() => showToast('Ward 22 – Chokkasandra: 24 issues, Top: Waste')}
            >
              View Details
            </button>

            <div className="density-legend">
              <div className="legend-row"><span className="dot red-dot"></span> High</div>
              <div className="legend-row"><span className="dot orange-dot"></span> Medium</div>
              <div className="legend-row"><span className="dot yellow-dot"></span> Low</div>
              <div className="legend-row"><span className="dot green-dot"></span> Very Low</div>
            </div>
            <button className="boundaries-btn" onClick={() => showToast('Ward boundaries toggled')}>
              <i className="fas fa-draw-polygon"></i> View Boundaries
            </button>
            <div className="live-indicator">
              <span className="live-dot"></span> Live <span className="live-time">Updated 2m ago</span>
              <button className="refresh-btn" onClick={refreshMap}>
                <i className="fas fa-sync-alt" style={refreshing ? { transform: 'rotate(360deg)', transition: 'transform .6s' } : undefined}></i>
              </button>
            </div>
          </div>

          <MapView />

          <div className="map-top-right">
            <button className="heatmap-btn" onClick={() => showToast('Heatmap toggled')}>
              <i className="fas fa-layer-group"></i> Heatmap <i className="fas fa-chevron-down"></i>
            </button>
          </div>

          {/* Layers, my-location and zoom +/- all live in one cluster on
              the right edge, inside the map box, so every control stays
              visible and thumb-reachable even at the smallest phone
              widths — nothing is hidden on mobile. */}
          <div className="map-controls-right">
            <button className="map-ctrl-btn" title="Layers" onClick={() => setFiltersOpen(true)}>
              <i className="fas fa-layer-group"></i>
            </button>
            <button className="map-ctrl-btn" title="My Location" onClick={gotoMyLocation}>
              <i className="fas fa-crosshairs"></i>
            </button>
            <button className="map-ctrl-btn" title="Zoom In" onClick={() => mapInstanceRef.current?.zoomIn()}>
              <i className="fas fa-plus"></i>
            </button>
            <button className="map-ctrl-btn" title="Zoom Out" onClick={() => mapInstanceRef.current?.zoomOut()}>
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>

        <RecentIssuesPanel />
      </div>

      <div className="map-card-caption">
        <i className="fas fa-hand-pointer"></i> Pinch to zoom &middot; Drag to pan
      </div>

      <BottomSheet />

      <button className="report-fab" id="reportFab" onClick={() => setReportOpen(true)}>
        <i className="fas fa-plus"></i> Report &amp; Help
        <span className="fab-sub">Fix this area</span>
      </button>
    </div>
  );
}
