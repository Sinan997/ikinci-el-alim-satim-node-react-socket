import classes from "./Welcome.module.css";

function Welcome({ currentUser }) {
  return (
    <div className={classes.container}>
      <h1>
        Welcome <span>{currentUser.name}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </div>
  );
}

export default Welcome;
