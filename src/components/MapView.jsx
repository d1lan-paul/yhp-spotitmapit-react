import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';

const KOCHI = [9.9312, 76.2673];

const HEAT_ZONES = [
  { lat: 9.9312, lng: 76.2673, color: 'rgba(239,68,68,0.18)', r: 1400 },
  { lat: 9.9440, lng: 76.2800, color: 'rgba(245,158,11,0.12)', r: 900 },
  { lat: 9.9200, lng: 76.2550, color: 'rgba(239,68,68,0.14)', r: 1100 },
  { lat: 9.9260, lng: 76.2720, color: 'rgba(239,68,68,0.10)', r: 800 },
];

const WARDS = [
  { name: 'Ward 22\nChokkasandra', lat: 9.9390, lng: 76.2590 },
  { name: 'Ward 21\nKakkanad', lat: 9.9500, lng: 76.2750 },
  { name: 'Ward 19\nKakkar', lat: 9.9430, lng: 76.2680 },
  { name: 'Ward 23\nMarine Drive', lat: 9.9200, lng: 76.2600 },
  { name: 'Ward 18\nVyttila', lat: 9.9350, lng: 76.2800 },
  { name: 'Ward 20\nPanampilly\nNagar', lat: 9.9240, lng: 76.2720 },
];

/* Imperative Leaflet wrapper — Leaflet owns its own DOM inside
   #leafletMap, React only mounts/unmounts the container and keeps
   markers in sync with `visibleIssues` via a plain useEffect. Uses the
   global `window.L` exposed by the CDN <script> tag in index.html
   (no npm leaflet/react-leaflet dependency). */
export default function MapView() {
  const mapElRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const initedRef = useRef(false);

  const {
    visibleIssues, setCurrentIssue, showToast,
    reportOpen, reportStep, setReportLocation,
    mapInstanceRef, setWardTitle,
  } = useApp();

  /* Create the map exactly once */
  useEffect(() => {
    if (initedRef.current || !mapElRef.current || !window.L) return;
    initedRef.current = true;
    const L = window.L;

    const map = L.map(mapElRef.current, {
      center: KOCHI,
      zoom: 13,
      minZoom: 11,
      maxZoom: 19,
      zoomControl: false,
      attributionControl: true,
      tap: true,
      tapTolerance: 22,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
      inertia: true,
      inertiaDeceleration: 3000,
      bounceAtZoomLimits: false,
      // Half-step zoom = smoother pinch-to-zoom on touch devices instead
      // of jumping a whole zoom level per gesture.
      zoomSnap: 0.5,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 90,
      fadeAnimation: true,
      markerZoomAnimation: true,
    });
    mapRef.current = map;
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    HEAT_ZONES.forEach((z) => {
      L.circle([z.lat, z.lng], {
        radius: z.r, color: 'transparent', fillColor: z.color, fillOpacity: 1, interactive: false,
      }).addTo(map);
    });

    const userIcon = L.divIcon({
      className: '',
      html: `<div style="width:16px;height:16px;background:#3b82f6;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 6px rgba(59,130,246,0.2)"></div>`,
      iconSize: [16, 16], iconAnchor: [8, 8],
    });
    L.marker([9.9370, 76.2640], { icon: userIcon, interactive: false }).addTo(map);

    WARDS.forEach((w) => {
      L.marker([w.lat, w.lng], {
        icon: L.divIcon({
          className: '',
          html: `<div style="font-size:9px;font-weight:700;color:#374151;text-align:center;white-space:pre;line-height:1.3;text-shadow:0 1px 3px rgba(255,255,255,.9)">${w.name}</div>`,
          iconSize: [80, 30], iconAnchor: [40, 15],
        }),
        interactive: false,
      }).addTo(map);
    });

    setTimeout(() => map.invalidateSize(), 50);

    return () => {
      map.remove();
      mapRef.current = null;
      mapInstanceRef.current = null;
      initedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Forward clicks to the Report flow when it's open on step 1 (pin
     placement) — mirrors the vanilla map.on('click', ...) wiring. */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    function onClick(e) {
      if (reportOpen && reportStep === 1) {
        setReportLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    }
    map.on('click', onClick);
    return () => map.off('click', onClick);
  }, [reportOpen, reportStep, setReportLocation]);

  /* Keep issue markers in sync with the live, filtered/sorted list */
  useEffect(() => {
    const map = mapRef.current;
    const L = window.L;
    if (!map || !L) return;

    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    visibleIssues.forEach((issue) => {
      const colorClass = issue.severity === 'high' ? 'cluster-red cluster-red-ring'
        : issue.severity === 'medium' ? 'cluster-orange cluster-orange-ring'
        : 'cluster-green cluster-green-ring';

      const icon = L.divIcon({
        className: '',
        html: `<div class="cluster-marker ${colorClass}">${issue.cluster || 1}</div>`,
        iconSize: [36, 36], iconAnchor: [18, 18],
      });

      const marker = L.marker([issue.lat, issue.lng], { icon })
        .addTo(map)
        .on('click', () => {
          setCurrentIssue(issue);
          setWardTitle(issue.ward);
          showToast(`📍 ${issue.title}`);
        });

      markersRef.current.push(marker);
    });
  }, [visibleIssues, setCurrentIssue, showToast, setWardTitle]);

  return <div id="leafletMap" ref={mapElRef} style={{ width: '100%', height: '100%', touchAction: 'none' }} />;
}

export function useLeafletMap() {
  // Reserved for future use (e.g. exposing zoomIn/zoomOut to other components
  // via a ref forwarded from MapView) — currently the map controls call
  // window's Leaflet instance directly via the exported ref pattern below.
}
