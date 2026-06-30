import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

const KOCHI = [9.9312, 76.2673];
const TYPES = ['Waste', 'Water', 'Roads', 'Electricity', 'Pollution', 'Animals', 'Health', 'Safety'];
const TYPE_ICONS = { Waste: '🗑️', Water: '💧', Roads: '🛣️', Electricity: '⚡', Pollution: '🌫️', Animals: '🐾', Health: '❤️', Safety: '🛡️' };

export default function ReportModal() {
  const {
    reportOpen, setReportOpen, reportStep, setReportStep,
    reportLocation, setReportLocation, addIssue, issues, showToast,
  } = useApp();

  const miniMapElRef = useRef(null);
  const miniMapRef = useRef(null);
  const markerRef = useRef(null);

  const [selectedType, setSelectedType] = useState(null);
  const [selectedPrio, setSelectedPrio] = useState('low');
  const [reportToAuth, setReportToAuth] = useState(true);
  const [locationText, setLocationText] = useState('');
  const [desc, setDesc] = useState('');
  const [affects, setAffects] = useState('');
  const [photoSrc, setPhotoSrc] = useState(null);
  const [submittedCount, setSubmittedCount] = useState(0);

  /* Mount the mini location-picker map once the modal opens */
  useEffect(() => {
    if (!reportOpen || !window.L || miniMapRef.current) return;
    const t = setTimeout(() => {
      if (!miniMapElRef.current || miniMapRef.current) return;
      const L = window.L;
      const map = L.map(miniMapElRef.current, { center: KOCHI, zoom: 13, zoomControl: false });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 19 }).addTo(map);
      map.on('click', (e) => setReportLocation({ lat: e.latlng.lat, lng: e.latlng.lng }));
      miniMapRef.current = map;
      setTimeout(() => map.invalidateSize(), 50);
    }, 300);
    return () => clearTimeout(t);
  }, [reportOpen, setReportLocation]);

  /* Tear down the mini map when the modal closes so it can be recreated cleanly next time */
  useEffect(() => {
    if (!reportOpen && miniMapRef.current) {
      miniMapRef.current.remove();
      miniMapRef.current = null;
      markerRef.current = null;
    }
  }, [reportOpen]);

  /* Reflect reportLocation (set either from this mini map or the main MapView while step===1) as a marker */
  useEffect(() => {
    const map = miniMapRef.current;
    const L = window.L;
    if (!map || !L || !reportLocation) return;
    if (markerRef.current) map.removeLayer(markerRef.current);
    const icon = L.divIcon({
      className: '',
      html: `<div style="width:20px;height:20px;background:#10b981;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>`,
      iconSize: [20, 20], iconAnchor: [10, 20],
    });
    markerRef.current = L.marker([reportLocation.lat, reportLocation.lng], { icon }).addTo(map);
    setLocationText(`${reportLocation.lat.toFixed(4)}, ${reportLocation.lng.toFixed(4)}`);
  }, [reportLocation]);

  if (!reportOpen) return null;

  function close() { setReportOpen(false); resetWizard(); }

  function resetWizard() {
    setReportStep(1);
    setSelectedType(null);
    setSelectedPrio('low');
    setReportToAuth(true);
    setLocationText('');
    setDesc('');
    setAffects('');
    setPhotoSrc(null);
    setReportLocation(null);
  }

  function goStep(step) {
    setReportStep(step);
    if (step === 5) submit();
  }

  function submit() {
    const next = submittedCount + 1;
    setSubmittedCount(next);

    let lat = reportLocation?.lat, lng = reportLocation?.lng;
    if (!lat) {
      lat = 9.9312 + (Math.random() - 0.5) * 0.02;
      lng = 76.2673 + (Math.random() - 0.5) * 0.02;
    }

    const newIssue = {
      id: Date.now(),
      title: selectedType ? `${selectedType} Issue` : 'New Issue',
      cat: (selectedType || 'waste').toLowerCase(),
      lat, lng,
      severity: selectedPrio === 'high' ? 'high' : selectedPrio === 'medium' ? 'medium' : 'low',
      status: 'open', affected: 0, reports: 1,
      ward: locationText || 'Your Location',
      dist: 'Just added', distMeters: 0,
      desc: desc || 'New report',
      img: photoSrc || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      updated: 'Just now', postedAt: new Date().toISOString(), cluster: 1, color: 'green',
    };
    addIssue(newIssue);
    showToast('🌿 Report submitted! Thank you, Happiness Angel!');
  }

  function selectType(type) { setSelectedType(type); }
  function selectPrio(prio) { setSelectedPrio(prio); }
  function selectAuth(yes) { setReportToAuth(yes); }

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoSrc(ev.target.result);
    reader.readAsDataURL(file);
  }

  return (
    <>
      <div className="modal-overlay open" id="modalOverlay" onClick={close}></div>
      <div className="report-modal open" id="reportModal">
        <div className="modal-header">
          <button className="modal-back" onClick={close}><i className="fas fa-arrow-left"></i></button>
          <span className="modal-title">Add Issue</span>
          <button className="modal-close" onClick={close}><i className="fas fa-times"></i></button>
        </div>

        <div className="modal-steps">
          {[1, 2, 3, 4, 5].map((i, idx) => (
            <Fragment key={i}>
              <div className={`mstep ${reportStep === i ? 'active' : ''} ${reportStep > i ? 'done' : ''}`} id={`mstep${i}`}>
                <span className="mstep-num">{i}</span>
                <span className="mstep-lbl">{['Move', 'Select Type', 'Add Details', 'Review', 'Submit'][idx]}</span>
              </div>
              {i < 5 && <div className={`mstep-line ${reportStep > i ? 'done' : ''}`}></div>}
            </Fragment>
          ))}
        </div>

        {reportStep === 1 && (
          <div className="modal-step-content" id="stepContent1">
            <h3 className="step-heading">Pin the location</h3>
            <p className="step-sub">Click on the map below to drop a pin at the exact waste location</p>
            <div id="reportMiniMap" ref={miniMapElRef} style={{ height: 220, borderRadius: 12, overflow: 'hidden', margin: '1rem 0', border: '1.5px solid #e5e7eb' }}></div>
            <div className="location-display" id="reportLocDisplay">
              <i className="fas fa-map-marker-alt" style={{ color: '#10b981' }}></i>
              <span id="reportLocText">{locationText || 'Click map to select location'}</span>
            </div>
            <button className="step-next-btn" onClick={() => goStep(2)}>Continue <i className="fas fa-arrow-right"></i></button>
          </div>
        )}

        {reportStep === 2 && (
          <div className="modal-step-content" id="stepContent2">
            <h3 className="step-heading">Select issue type</h3>
            <p className="step-sub">What kind of issue did you find?</p>
            <div className="issue-type-grid">
              {TYPES.map((type) => (
                <button
                  key={type}
                  className={`issue-type-btn ${selectedType === type ? 'selected' : ''}`}
                  onClick={() => selectType(type)}
                >
                  <span>{TYPE_ICONS[type]}</span><span>{type === 'Animals' ? 'Stray Animals' : type}</span>
                </button>
              ))}
            </div>
            <div className="step-nav-row">
              <button className="step-back-btn" onClick={() => goStep(1)}><i className="fas fa-arrow-left"></i> Back</button>
              <button className="step-next-btn" onClick={() => goStep(3)}>Continue <i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
        )}

        {reportStep === 3 && (
          <div className="modal-step-content" id="stepContent3">
            <h3 className="step-heading">Add details</h3>

            <label className="modal-label">Location</label>
            <input
              className="modal-input" id="locationInput" type="text" placeholder="Andheri, North, Mumbai"
              value={locationText} onChange={(e) => setLocationText(e.target.value)}
            />

            <label className="modal-label" style={{ marginTop: '1rem' }}>Add Photo / Video</label>
            <div className="photo-upload-area" onClick={() => document.getElementById('photoFile').click()}>
              <i className="fas fa-camera"></i>
              <span>Upload photo or video</span>
              <input
                type="file"
                id="photoFile"
                accept="image/*,video/*"
                capture="environment"
                style={{ display: 'none' }}
                onChange={handlePhotoUpload}
              />
            </div>
            <div className="photo-preview-row" id="photoPreviewRow">
              {photoSrc && <img src={photoSrc} alt="Preview" loading="lazy" decoding="async" />}
            </div>

            <label className="modal-label" style={{ marginTop: '1rem' }}>Description</label>
            <textarea className="modal-textarea" id="issueDesc" placeholder="Describe the issue in detail..." value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>

            <label className="modal-label" style={{ marginTop: '1rem' }}>What does this affect?</label>
            <input className="modal-input" id="affectsInput" type="text" placeholder="e.g. residents nearby, traffic" value={affects} onChange={(e) => setAffects(e.target.value)} />

            <label className="modal-label" style={{ marginTop: '1rem' }}>Priority</label>
            <div className="priority-selector">
              <button className={`prio-btn safe ${selectedPrio === 'low' ? 'active' : ''}`} onClick={() => selectPrio('low')}>Safe</button>
              <button className={`prio-btn medium ${selectedPrio === 'medium' ? 'active' : ''}`} onClick={() => selectPrio('medium')}>Medium</button>
              <button className={`prio-btn high ${selectedPrio === 'high' ? 'active' : ''}`} onClick={() => selectPrio('high')}>High</button>
            </div>

            <div className="step-nav-row">
              <button className="step-back-btn" onClick={() => goStep(2)}><i className="fas fa-arrow-left"></i> Back</button>
              <button className="step-next-btn" onClick={() => goStep(4)}>Continue <i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
        )}

        {reportStep === 4 && (
          <div className="modal-step-content" id="stepContent4">
            <h3 className="step-heading">Review &amp; Submit</h3>

            <div className="authority-choice">
              <div className={`auth-option yes ${reportToAuth ? 'selected' : ''}`} onClick={() => selectAuth(true)}>
                <div className="auth-icon"><i className="fas fa-check-circle"></i></div>
                <div className="auth-text">
                  <div className="auth-title">Yes, report to authority</div>
                  <ul className="auth-list">
                    <li>Official action taken</li>
                    <li>Track progress</li>
                    <li>Formal escalation</li>
                    <li>You get updates</li>
                  </ul>
                </div>
              </div>
              <div className={`auth-option no ${!reportToAuth ? 'selected' : ''}`} onClick={() => selectAuth(false)}>
                <div className="auth-icon no"><i className="fas fa-times-circle"></i></div>
                <div className="auth-text">
                  <div className="auth-title">No, keep as story local</div>
                  <ul className="auth-list no-list">
                    <li>Community aware only</li>
                    <li>No official tracking</li>
                    <li>You can add later</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="report-summary" id="reportSummary">
              <div className="summary-row"><span>Type:</span> <b id="sumType">{selectedType || '—'}</b></div>
              <div className="summary-row"><span>Location:</span> <b id="sumLocation">{locationText || '—'}</b></div>
              <div className="summary-row"><span>Priority:</span> <b id="sumPriority">{selectedPrio || '—'}</b></div>
              <div className="summary-row"><span>Coordinates:</span> <b id="sumCoords">{reportLocation ? `${reportLocation.lat.toFixed(4)}, ${reportLocation.lng.toFixed(4)}` : '—'}</b></div>
            </div>

            <div className="step-nav-row">
              <button className="step-back-btn" onClick={() => goStep(3)}><i className="fas fa-arrow-left"></i> Back</button>
              <button className="step-next-btn save" onClick={() => goStep(5)}>Save &amp; Continue <i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
        )}

        {reportStep === 5 && (
          <div className="modal-step-content" id="stepContent5">
            <div className="success-state">
              <div className="success-icon"><i className="fas fa-check-circle"></i></div>
              <h3>Report Submitted!</h3>
              <p>Your issue has been pinned on the map and reported to the community.</p>

              <div className="track-progress-box">
                <div className="tp-title">Track Progress</div>
                <div className="tp-row"><i className="fas fa-check-circle green-i"></i> Issue Submitted <span className="tp-time">Just now</span></div>
                <div className="tp-row dim"><i className="fas fa-circle-notch grey-i"></i> Under Review <span className="tp-time">Pending</span></div>
                <div className="tp-row dim"><i className="fas fa-circle-notch grey-i"></i> Authority Assigned <span className="tp-time">Pending</span></div>
                <div className="tp-row dim"><i className="fas fa-circle-notch grey-i"></i> Resolved <span className="tp-time">Pending</span></div>
              </div>

              <div className="quick-updates-box">
                <div className="qu-title">Quick Updates</div>
                <div className="qu-row"><i className="fas fa-check green-i"></i> Issue Corporation <span className="qu-check active"></span></div>
                <div className="qu-row"><i className="fas fa-check green-i"></i> Daily Updates <span className="qu-check active"></span></div>
                <div className="qu-row"><i className="fas fa-check green-i"></i> Resolution Notice <span className="qu-check active"></span></div>
              </div>

              <div className="ticket-info">
                <div>Estimated Resolution: <b>5 days</b></div>
                <div>Reports: <b id="totalReports">{issues.length}</b></div>
                <div>Happiness Score Impact: <b>+2%</b></div>
              </div>

              <div className="share-row">
                <button className="share-btn" onClick={shareReport}><i className="fas fa-share-alt"></i> Share</button>
                <button className="share-btn" onClick={close}><i className="fas fa-map"></i> Back to Map</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  function shareReport() {
    if (navigator.share) {
      navigator.share({ title: 'YesHappinessProject — Spot It, Map It', text: 'I reported a civic issue on the community map!', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => showToast('Link copied to clipboard!'));
    }
  }
}

function Fragment({ children }) { return <>{children}</>; }
