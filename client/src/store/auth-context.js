import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, expirationTime, username, userId, email) => {},
  logout: () => {},
});

const isTokenExpired = (tokenExpirationTime) => {
  const currentTime = new Date().getTime();
  if (tokenExpirationTime - currentTime < 0) {
    return true;
  } else {
    return false;
  }
};

const remainingTime = (tokenExpirationTime) => {
  const currentTime = new Date().getTime();
  return tokenExpirationTime - currentTime;
};

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    const expirationTime = JSON.parse(
      localStorage.getItem("user")
    )?.expirationTime;
    const validToken = isTokenExpired(expirationTime);
    const logoutTimer = remainingTime(expirationTime);

    if (validToken) {
      setToken(null);
    } else {
      setToken(token);
      setTimeout(logoutHandler, logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, username, userId, email) => {
    setToken(token);
    localStorage.setItem(
      "user",
      JSON.stringify({ token, expirationTime, username, userId, email })
    );
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("user");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
