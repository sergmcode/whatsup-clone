import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React from "react";
import "./Chat.css";

function Chat() {
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("sendMessage()");
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
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className="chat__message">
          <span className="chat__name">John</span>
          message here ...
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat__message chat__reciever">
          <span className="chat__name">me</span>
          message here ...
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat__message">
          <span className="chat__name">John</span>
          message here ...
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input placeholder="Type a message" type="text" />
          {/* <div className="chat__footerRecButton" onClick={sendMessage}>
            <MicIcon />
          </div> */}
          <IconButton>
            <MicIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default Chat;
