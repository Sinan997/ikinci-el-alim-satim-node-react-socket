import classes from "./ChatContainer.module.css";
import ChatInput from "./ChatInput";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  console.log(messages);

  useEffect(() => {
    const getAllMessages = async () => {
      const response = await axios.post(
        "http://localhost:8000/api/message/getAllMessages",
        {
          from: currentUser?.userId,
          to: currentChat?._id,
        }
      );
      setMessages(response.data);
    };
    getAllMessages();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post("http://localhost:8000/api/message/addMessage", {
      from: currentUser.userId,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-message", {
      to: currentChat._id,
      from: currentUser.userId,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message-receive", (msg) => {
        console.log("received message", msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <div className={classes.container}>
          <div className={classes.chatHeader}>
            <div className={classes.userDetails}>
              <div className={classes.username}>
                <h3>{currentChat.name}</h3>
              </div>
            </div>
          </div>
          <div className={classes.chatMessages}>
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`${classes.message} ${
                      message.fromSelf ? classes.sended : classes.received
                    }`}
                  >
                    <div className={classes.content}>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
}

export default ChatContainer;
