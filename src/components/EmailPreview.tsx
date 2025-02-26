import { useContext, useState } from "react";
import { EditorContext } from "../context/EditorContext";
import Modal from "./Modal";

// Definição dos tipos dos blocos
interface Block {
  id: string;
  type: "text" | "image" | "button";
  content: string;
  link?: string;
  fontSize?: string;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  textColor?: string;
  size?: "small" | "medium" | "large";
}

// Definição do contexto do editor
interface EditorContextType {
  blocks: Block[];
}

const EmailPreview = () => {
  const editor = useContext(EditorContext) as EditorContextType | null;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [htmlContent, setHtmlContent] = useState<string>("");

  if (!editor) return null;

  const generateHTML = (): string => {
    return `
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Template de E-mail</title>
        <style>
          body { font-family: Arial, sans-serif; }
          button {
            border: none;
            cursor: pointer;
            border-radius: 5px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        ${editor.blocks
          .map((block) => {
            if (block.type === "text") {
              return `<p style="font-size: ${block.fontSize ?? "14px"}; font-family: ${block.fontFamily ?? "Arial"}; color: ${block.color ?? "black"};">${block.content}</p>`;
            }
            if (block.type === "image") {
              return `<img src="${block.content}" width="100%" alt="Imagem" />`;
            }
            if (block.type === "button") {
              return `
                <a href="${block.link || "#"}" target="_blank">
                  <button style="
                    padding: ${block.size === "small" ? "5px 10px" : block.size === "medium" ? "10px 20px" : "15px 30px"};
                    background-color: ${block.backgroundColor ?? "blue"};
                    color: ${block.textColor ?? "white"};
                    font-size: ${block.size === "small" ? "12px" : block.size === "medium" ? "16px" : "20px"};
                  ">
                    ${block.content}
                  </button>
                </a>`;
            }
            return "";
          })
          .join("")}
      </body>
      </html>
    `;
  };

  return (
    <div style={{ width: "30%", padding: "10px", borderLeft: "1px solid gray", backgroundColor: "#f9f9f9" }}>
      <h3>Pré-visualização</h3>

      {/* Botão para abrir o modal */}
      <button
        onClick={() => {
          setHtmlContent(generateHTML());
          setModalOpen(true);
        }}
        style={{ padding: "10px", marginBottom: "10px", cursor: "pointer" }}
      >
        Gerar HTML
      </button>

      {/* Renderiza a prévia corretamente */}
      <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />

      {/* Modal com o HTML gerado */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} content={htmlContent} />
    </div>
  );
};

export default EmailPreview;
