import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";

import axios from "../../axios";

function Chat({ messages }) {

  const [message, setMessage] = useState("");

  // Auto scrolling
  // useEffect(() => {
  //   let chatBodyId = document.getElementById("chatBodyId");
  //   chatBodyId.scrollTop = chatBodyId.scrollHeight;
  //   console.log("scrolling")
  // });

  const sendMessage = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/messages/new", {
        message: message,
        name: "Stefan Banach",
        timestamp: "15 minutes ago",
        recieved: true,
      })
      .then((resp) => {
        console.log(resp)
      });
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ... asdfjl kajsdf kj</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body" id="chatBodyId">
        {messages.map((message) => {
          return (
            <p
              className={`chat__message ${
                message.recieved && "chat__reciever"
              }`}
              key={message._id}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          );
        })}
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            placeholder="Type a message"
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if(e.key === 'Enter'){
                sendMessage(e)
              }
            }}
          />
          <button
            onClick={sendMessage}
            type="submit"
            className="_____chat__submitButton"
          >
            Send message
          </button>
          <IconButton>
            <MicIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default Chat;
