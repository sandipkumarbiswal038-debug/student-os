import "./Notifications.css";

function Notifications() {

  const notifications = [

    {
      id: 1,
      title: "Registration Successful",
      message: "You have successfully registered for AI Workshop.",
      time: "2 hours ago",
      type: "success",
    },

    {
      id: 2,
      title: "Event Reminder",
      message: "Hackathon 2026 starts tomorrow at 10:00 AM.",
      time: "5 hours ago",
      type: "info",
    },

    {
      id: 3,
      title: "Waitlist Update",
      message: "Congratulations! You have been moved from the waitlist to the registered list.",
      time: "Yesterday",
      type: "warning",
    },

    {
      id: 4,
      title: "Event Cancelled",
      message: "Sports Meet has been cancelled by the organizer.",
      time: "2 days ago",
      type: "danger",
    },

  ];

  return (
    <div className="notifications">

      <h1>Notifications</h1>

      <p>Stay updated with all your event activities.</p>

      <div className="notification-list">

        {notifications.map((item) => (

          <div className={`notification-card ${item.type}`} key={item.id}>

            <h3>{item.title}</h3>

            <p>{item.message}</p>

            <span>{item.time}</span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Notifications;