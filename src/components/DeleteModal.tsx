interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({ open, onClose, onConfirm }: DeleteModalProps) => {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this user?</p>

        <div className="modal-actions">
          <button className="danger" onClick={onConfirm}>
            Delete
          </button>
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
