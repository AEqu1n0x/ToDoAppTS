import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const InfoModal: React.FC<ModalProps> = ({ children, open, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        onClose();
      }
    };

    if (open) {
      dialog?.showModal();
      dialog?.addEventListener("click", handleBackdropClick);
    } else {
      dialog?.close();
      dialog?.removeEventListener("click", handleBackdropClick);
    }

    return () => {
      dialog?.removeEventListener("click", handleBackdropClick);
    };
  }, [open, onClose]);

  return createPortal(
    <dialog ref={dialogRef} className="rounded-lg shadow-lg">
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default InfoModal;
