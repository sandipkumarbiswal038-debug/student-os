import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <div className="home-header">
        <h1>Upcoming College Events</h1>
        <p>Discover, create and manage college events easily.</p>
      </div>

      <div className="home-buttons">
        <Link to="/student-registration" className="btn">
          Student Registration
        </Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search events..."
        />
      </div>

      <div className="event-grid">

        <div className="event-card">
          <div className="emoji">🎉</div>

          <h3>Hackathon 2026</h3>

          <p>📅 10 Aug 2026</p>

          <p>📍 Computer Lab</p>
        </div>

        <div className="event-card">
          <div className="emoji">🤖</div>

          <h3>AI Workshop</h3>

          <p>📅 15 Aug 2026</p>

          <p>📍 Seminar Hall</p>

        </div>

        <div className="event-card">
          <div className="emoji">🏆</div>

          <h3>Sports Meet</h3>

          <p>📅 22 Aug 2026</p>

          <p>📍 College Ground</p>

        </div>

      </div>

    </div>
  );
}

export default Home;