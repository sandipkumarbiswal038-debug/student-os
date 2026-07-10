import "./Notes.css";
import { useNavigate } from "react-router-dom";

import {
  FaBook,
  FaSearch,
} from "react-icons/fa";

function Notes() {

  const navigate = useNavigate();

  return (
    <div className="notes-page">

      {/* Header */}
      <div className="page-header">

        <div>
          <h1>📚 Notes & Assignments</h1>
          <p>Download study materials and submit assignments.</p>
        </div>

        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search subject..."
          />
        </div>

      </div>

      {/* Study Notes */}

      <div className="section">

        <h2>Study Notes</h2>

        <div className="notes-grid">

          {/* Web Technology */}

          <div className="note-card">

            <div className="icon yellow">
              <FaBook />
            </div>

            <h3>Web Technology</h3>

            <p>HTML, CSS, JavaScript Notes</p>

            <button onClick={() => navigate("/webtechnology")}>
              View
            </button>

          </div>

          {/* Python */}

          <div className="note-card">

            <div className="icon blue">
              <FaBook />
            </div>

            <h3>Python Programming</h3>

            <p>Complete Python Notes</p>

            <button onClick={() => navigate("/python")}>
              View
            </button>

          </div>

          {/* Machine Learning */}

          <div className="note-card">

            <div className="icon green">
              <FaBook />
            </div>

            <h3>Machine Learning</h3>

            <p>Lecture Notes & PPT</p>

            <button onClick={() => navigate("/ml")}>
              View
            </button>

          </div>
          {/* Theory Of Computations */}

          <div className="note-card">

            <div className="icon yellow">
              <FaBook />
            </div>

            <h3>Theory Of Computations</h3>

            <p>Theory Of Computations Notes</p>

            <button onClick={() => navigate("/Theory Of Computations")}>
              View
            </button>

          </div>
          {/* Software Engineering */}

          <div className="note-card">

            <div className="icon yellow">
              <FaBook />
            </div>

            <h3>Software Engineering</h3>

            <p>Software Engineering Notes</p>

            <button onClick={() => navigate("/Software Engineering")}>
              View
            </button>

          </div>
          {/* Data Structures */}

          <div className="note-card">

            <div className="icon yellow">
              <FaBook />
            </div>

            <h3>Data Structures</h3>

            <p>Data Structures Notes</p>

            <button onClick={() => navigate("/Data Structures")}>
              View
            </button>

          </div>
        </div>

      </div>

      {/* Assignments */}

      <div className="section">

        <h2>Assignments</h2>

        <div className="assignment-card">

          <div>
            <h3>Python Lab Assignment</h3>
            <p>Due Date : 15 July 2026</p>
            <span className="pending">Pending</span>
          </div>

        </div>

        <div className="assignment-card">

          <div>
            <h3>DBMS Project</h3>
            <p>Due Date : 20 July 2026</p>
            <span className="completed">Completed</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Notes;