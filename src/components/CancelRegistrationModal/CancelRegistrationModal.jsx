import "./CancelRegistrationModal.css";

function CancelRegistrationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>Cancel Registration</h2>

        <p>
          Are you sure you want to cancel your
          registration for this event?
        </p>

        <div className="modal-buttons">

          <button
            className="cancel-button"
            onClick={onClose}
          >
            No
          </button>

          <button
            className="confirm-button"
            onClick={onConfirm}
          >
            Yes, Cancel
          </button>

        </div>

      </div>
    </div>
  );
}

export default CancelRegistrationModal;