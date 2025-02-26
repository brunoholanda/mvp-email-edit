import Sidebar from "./components/Sidebar";
import EmailEditor from "./components/EmailEditor";
import EmailPreview from "./components/EmailPreview";
import { EditorProvider } from "./context/EditorContext";

const App = () => {
  return (
    <EditorProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <EmailEditor />
        <EmailPreview />
      </div>
    </EditorProvider>
  );
};

export default App;
