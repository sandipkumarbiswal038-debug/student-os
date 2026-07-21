import "./NotificationToast.css";

function NotificationToast({ message, type, show }) {
  if (!show) return null;

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}

export default NotificationToast;