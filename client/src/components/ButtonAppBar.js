import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { eraseCookie } from "../utils/cookies";
import '../styles/ButtonAppBar.scss';

export default function ButtonAppBar() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logout = () => {
    eraseCookie("JWT");
    setIsLoggedOut(true);
  };

  return (
    <>
      <Route
        exact
        path="/dashboard"
        render={() => (isLoggedOut ? <Redirect to="/" /> : null)}
      />
      <nav>
        <h1>TODO LIST</h1>
        <button onClick={logout}>Logout</button>
      </nav>
    </>
  );
}
