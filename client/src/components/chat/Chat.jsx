import classes from "./Chat.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatContainer from "./ChatContainer";
import { io } from "socket.io-client";
import Welcome from "./Welcome";
import Contacts from "./Contacts";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate("/");
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:8000");
      socket.current.emit("add-user", currentUser.userId);
    }
  }, [currentUser]);

  useEffect(() => {
    const getClients = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/message/getAllUserClients/" +
          currentUser?.userId
      );
      setContacts(res.data);
    };
    getClients();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div
          onClick={() => {
            navigate("/");
          }}
          className={classes.geriDon}
        >
          Geri Dön
          <BiArrowBack size="32px" />
        </div>
        <div className={classes.container}>
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentUser={currentUser}
              currentChat={currentChat}
              socket={socket}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
