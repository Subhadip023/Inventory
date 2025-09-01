// components/ConfirmModal.jsx
import React from "react";
import  {Modal as ReactModal , ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { Button } from "flowbite-react";

const ConfirmModal = ({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "red",
  onConfirm,
  onCancel,
}) => {
  return (
    <ReactModal dismissible show={open} onClose={onCancel}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 my-5">
            {message}
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color={confirmColor} onClick={onConfirm}>
          {confirmText}
        </Button>
        <Button color="alternative" onClick={onCancel}>
          {cancelText}
        </Button>
      </ModalFooter>
    </ReactModal>
  );
};

export default ConfirmModal;
