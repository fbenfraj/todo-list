import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { eraseCookie } from "../utils/cookies";

export default function ButtonAppBar() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logout = () => {
    eraseCookie("JWT");
    setIsLoggedOut(true);
  };

  return (
    <div>
      <Route
        exact
        path="/dashboard"
        render={() => (isLoggedOut ? <Redirect to="/" /> : null)}
      />
      <nav>
        <h6>TO DO</h6>
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
}
