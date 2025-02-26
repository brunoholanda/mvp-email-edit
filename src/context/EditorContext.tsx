import { createContext, useState, ReactNode } from "react";

interface Block {
  id: string;
  type: "text" | "image" | "button";
  content: string;
  fontSize?: string;
  fontFamily?: string;
  color?: string;
  link?: string;
}

interface EditorContextProps {
    blocks: Block[];
    addBlock: (type: "text" | "image" | "button") => void;
    updateBlock: (id: string, updates: Partial<Block>) => void;
    removeBlock: (id: string) => void;
    setBlocks: (blocks: Block[]) => void; 
  }
  

export const EditorContext = createContext<EditorContextProps | null>(null);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const addBlock = (type: "text" | "image" | "button") => {
    setBlocks([...blocks, { id: Date.now().toString(), type, content: "", fontSize: "16px", fontFamily: "Arial", color: "#000000", link: "" }]);
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => (block.id === id ? { ...block, ...updates } : block))
    );
  };

  const removeBlock = (id: string) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  return (
    <EditorContext.Provider value={{ blocks, addBlock, updateBlock, removeBlock, setBlocks }}>
      {children}
    </EditorContext.Provider>
  );
};
