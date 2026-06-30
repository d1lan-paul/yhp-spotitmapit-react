import { useApp } from '../context/AppContext.jsx';

export default function InfoModal() {
  const { infoModal, setInfoModal } = useApp();
  const open = !!infoModal;

  function close() { setInfoModal(null); }

  return (
    <>
      <div className={`info-modal-overlay ${open ? 'open' : ''}`} id="infoModalOverlay" onClick={close}></div>
      <div className={`info-modal ${open ? 'open' : ''}`} id="infoModal">
        <div className="info-modal-header">
          <div className="info-modal-title" id="infoModalTitle">{infoModal?.title || ''}</div>
          <button className="info-modal-close" onClick={close}><i className="fas fa-times"></i></button>
        </div>
        <div className="info-modal-body" id="infoModalBody">{infoModal?.body}</div>
      </div>
    </>
  );
}
