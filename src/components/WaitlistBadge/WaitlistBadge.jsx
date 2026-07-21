import "./WaitlistBadge.css";

function WaitlistBadge({ status, position }) {
  return (
    <div className="waitlist-container">
      {status === "waitlisted" ? (
        <>
          <span className="waitlist-badge">
            Waitlisted
          </span>

          <p className="position">
            Position: {position}
          </p>
        </>
      ) : (
        <span className="signedup-badge">
          Signed Up
        </span>
      )}
    </div>
  );
}

export default WaitlistBadge;