import { useApp } from '../context/AppContext.jsx';

export default function Toast() {
  const { toast } = useApp();
  return (
    <div className="toast-wrap" id="toastWrap">
      <div className={`toast ${toast ? 'show' : ''}`} id="toast">{toast}</div>
    </div>
  );
}
