import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import classes from "./ChatInput.module.css";

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const inputChangeHandler = (e) => {
    setMsg(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <div className={classes.container}>
      <form onSubmit={sendChat} className={classes.inputContainer}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={inputChangeHandler}
        />
        <button type="submit" className={classes.submit}>
          <BiSend />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
