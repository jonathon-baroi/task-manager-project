import React, { useContext, useRef } from "react";

const DialogModal = () => {
  const dialogRef = useRef();

  const openModal = () => {
    dialogRef.current.showModal(); // opens the dialog
  };

  const closeModal = () => {
    dialogRef.current.close(); // closes the dialog
  };
  return (
    <div>
      <button onClick={openModal}>Open Dialog</button>

      <dialog ref={dialogRef} className="modal">
        <h2>Native Dialog</h2>
        <p>This is a native HTML5 dialog!</p>
        <button onClick={closeModal}>Close</button>
      </dialog>
    </div>
  );
};

export default DialogModal;
