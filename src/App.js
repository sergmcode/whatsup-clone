import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import axios from "./axios";
import Pusher from "pusher-js";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher("a2efa7c1bc8874dea1a3", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      console.log('Unsubscribed!')
    }
  }, [messages]);

  console.log(messages)

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
