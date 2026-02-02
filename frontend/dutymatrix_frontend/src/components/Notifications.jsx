import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getNotifications } from "../services/api";
import "../styles/notifications.css";

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getNotifications(user.userId)
      .then(setNotifications)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <p className="text-center">Loading notifications...</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">🔔 Notifications</h3>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul className="list-group">
          {notifications.map((n) => (
            <li key={n.id} className="list-group-item">
              <strong>{n.message}</strong>
              <div className="text-muted small">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
