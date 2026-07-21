import "./CancelEventModal.css";

function CancelEventModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="cancel-overlay">
      <div className="cancel-modal">

        <h2>Cancel Event</h2>

        <p>
          Are you sure you want to cancel this event?
        </p>

        <p className="warning-text">
          All registered students will be notified.
        </p>

        <div className="modal-buttons">

          <button
            className="back-btn"
            onClick={onClose}
          >
            Back
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
          >
            Cancel Event
          </button>

        </div>

      </div>
    </div>
  );
}

export default CancelEventModal;