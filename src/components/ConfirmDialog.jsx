import React from 'react';

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog">
      <p>{message}</p>
      <div>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}

export default ConfirmDialog;