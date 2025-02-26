import { DragEvent, useContext } from "react";
import { EditorContext } from "../context/EditorContext";

const Sidebar = () => {
  const editor = useContext(EditorContext);

  if (!editor) return null;

  const handleDragStart = (e: DragEvent<HTMLDivElement>, type: string) => {
    e.dataTransfer.setData("blockType", type);
  };

  return (
    <aside style={{ width: "250px", padding: "10px", borderRight: "1px solid gray" }}>
      <h3>Blocos</h3>
      <p>Arraste para adicionar!</p>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "text")}
        style={{
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid gray",
          cursor: "grab",
          textAlign: "center",
          background: "#f0f0f0",
        }}
      >
        Texto
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "image")}
        style={{
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid gray",
          cursor: "grab",
          textAlign: "center",
          background: "#f0f0f0",
        }}
      >
        Imagem
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "button")}
        style={{
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid gray",
          cursor: "grab",
          textAlign: "center",
          background: "#f0f0f0",
        }}
      >
        Botão
      </div>
    </aside>
  );
};

export default Sidebar;
