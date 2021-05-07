import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
