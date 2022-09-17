import classes from "./Contacts.module.css";
import { useState, useEffect } from "react";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <div className={classes.container}>
          <div className={classes.brand}></div>
          <div className={classes.contacts}>
            {contacts.map((contact, index) => {
              return (
                <div
                  onClick={() => changeCurrentChat(index, contact)}
                  key={index}
                  className={`${classes.contact} ${
                    index === currentSelected ? classes.selected : ""
                  }`}
                >
                  <div className={classes.username}>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={classes.currentUser}>
            <div className={classes.username}>
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;
