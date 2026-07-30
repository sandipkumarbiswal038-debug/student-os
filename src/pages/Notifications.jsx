import { useEffect, useState } from "react";
import api from "../api/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/api/notifications/");
        console.log("Notifications:", response.data);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Notifications Page</h1>

      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((notification, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <pre>{JSON.stringify(notification, null, 2)}</pre>
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;