import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

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
    addBlock: (type: Block["type"]) => void;
    updateBlock: (id: string, changes: Partial<Block>) => void;
    removeBlock: (id: string) => void;
}

const EmailEditor = () => {
    const editor = useContext(EditorContext) as EditorContextType | null;

    if (!editor) return null;

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const blockType = e.dataTransfer.getData("blockType") as Block["type"];
        if (blockType) {
            editor.addBlock(blockType);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const addVariableToText = (blockId: string, variable: string) => {
        const block = editor.blocks.find((b) => b.id === blockId);
        if (block) {
            editor.updateBlock(blockId, { content: block.content + " " + variable });
        }
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                width: "70%",
                height: "80vh",
                border: "2px dashed gray",
                padding: "10px",
                background: "white",
            }}
        >
            <h2>Construa seu e-mail</h2>

            {editor.blocks.map((block) => (
                <div key={block.id} style={{ padding: "10px", marginBottom: "10px", border: "1px solid gray", position: "relative" }}>
                    
                    {/* Botão para remover */}
                    <button
                        onClick={() => editor.removeBlock(block.id)}
                        style={{
                            position: "absolute",
                            top: "-10px",
                            right: "-8px",
                            background: "orange",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            padding: "2px 6px",
                            borderRadius: "50%",
                            fontSize: "12px"
                        }}
                    >
                        x
                    </button>

                    {block.type === "text" && (
                        <>
                            <div style={{ marginBottom: '15px', display: "flex", gap: "5px", flexWrap: "wrap" }}>
                                <button onClick={() => addVariableToText(block.id, "{{portador.nome}}")}>+ Nome do portador</button>
                                <button onClick={() => addVariableToText(block.id, "{{fatura.data_vencimento}}")}>+ Vencimento</button>
                                <button onClick={() => addVariableToText(block.id, "{{fatura.linha_digitavel}}")}>+ Linha digitável</button>
                                <button onClick={() => addVariableToText(block.id, "{{fatura.valor_total}}")}>+ Valor Total</button>
                            </div>
                            <textarea
                                value={block.content}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                                    editor.updateBlock(block.id, { content: e.target.value })
                                }
                                style={{
                                    width: "100%",
                                    minHeight: "50px",
                                    fontSize: block.fontSize,
                                    fontFamily: block.fontFamily,
                                    color: block.color,
                                }}
                                placeholder="Digite seu texto..."
                            />
                        </>
                    )}

                    {block.type === "image" && (
                        <input
                            type="text"
                            value={block.content}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                editor.updateBlock(block.id, { content: e.target.value })
                            }
                            placeholder="Cole a URL da imagem"
                            style={{ width: "100%" }}
                        />
                    )}

                    {block.type === "button" && (
                        <>
                            <input
                                type="text"
                                value={block.content}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                    editor.updateBlock(block.id, { content: e.target.value })
                                }
                                placeholder="Texto do botão"
                                style={{ width: "100%" }}
                            />
                            <input
                                type="text"
                                value={block.link || ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                    editor.updateBlock(block.id, { link: e.target.value })
                                }
                                placeholder="URL do botão"
                                style={{ width: "100%", marginTop: "5px" }}
                            />

                            {/* Personalização do botão */}
                            <div style={{ marginTop: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
                                <label>
                                    Cor de Fundo:
                                    <input
                                        type="color"
                                        value={block.backgroundColor || "#ff6600"}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                            editor.updateBlock(block.id, { backgroundColor: e.target.value })
                                        }
                                        style={{ marginLeft: "5px" }}
                                    />
                                </label>

                                <label>
                                    Cor do Texto:
                                    <input
                                        type="color"
                                        value={block.textColor || "#ffffff"}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                            editor.updateBlock(block.id, { textColor: e.target.value })
                                        }
                                        style={{ marginLeft: "5px" }}
                                    />
                                </label>

                                <label>
                                    Tamanho:
                                    <select
                                        value={block.size || "medium"}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                                            editor.updateBlock(block.id, { size: e.target.value as "small" | "medium" | "large" })
                                        }
                                        style={{ marginLeft: "5px" }}
                                    >
                                        <option value="small">Pequeno</option>
                                        <option value="medium">Médio</option>
                                        <option value="large">Grande</option>
                                    </select>
                                </label>
                            </div>

                            {/* Botão com estilos aplicados */}
                            <button
                                style={{
                                    backgroundColor: block.backgroundColor || "#ff6600",
                                    color: block.textColor || "#ffffff",
                                    padding: block.size === "small" ? "5px 10px" : block.size === "medium" ? "10px 20px" : "15px 30px",
                                    fontSize: block.size === "small" ? "12px" : block.size === "medium" ? "16px" : "20px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                    display: "block",
                                    width: "100%",
                                }}
                            >
                                {block.content || "Exemplo de Botão"}
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default EmailEditor;
