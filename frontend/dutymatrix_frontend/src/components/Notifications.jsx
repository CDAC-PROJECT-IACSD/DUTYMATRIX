import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getNotifications } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Clock } from "lucide-react";
import "../styles/notifications.css";

export default function Notifications() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getNotifications(user.userId)
      .then(setNotifications)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const handleBack = () => {
    if (!user) {
      navigate("/");
      return;
    }

    switch (user.role) {
      case "POLICE_OFFICER":
        navigate("/dashboard/officer");
        break;
      case "STATION_INCHARGE":
        navigate("/dashboard/stationIncharge");
        break;
      case "COMMISSIONER":
        navigate("/dashboard/commissioner");
        break;
      default:
        navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="notifications-container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Retrieving secure notifications...</p>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="d-flex align-items-center">
          <Bell className="text-warning me-2" size={24} />
          <h3 className="notifications-title">Notifications</h3>
        </div>
        <button className="back-btn" onClick={handleBack}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="empty-notifications">
          <p>Your notification log is currently clear.</p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map((n) => (
            <div key={n.id} className="notification-item">
              <div className="notification-msg">{n.message}</div>
              <div className="notification-time d-flex align-items-center gap-1">
                <Clock size={12} />
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
