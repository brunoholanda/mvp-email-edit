import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "80%",
          maxHeight: "80%",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          Fechar
        </button>
        <h2>HTML Gerado</h2>
        <textarea
          readOnly
          value={content}
          style={{ width: "100%", height: "300px", fontFamily: "monospace", fontSize: "14px" }}
        />
      </div>
    </div>
  );
};

export default Modal;
