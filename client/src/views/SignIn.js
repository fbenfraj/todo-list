import React, { useState } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../utils/cookies";

export default function SignIn(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function authenticate(email, password) {
    const response = await axios.post("http://localhost:8000/login", {
      email,
      password
    });
    if (response.status === 200) {
      setCookie("JWT", response.data.token, 7);
      setIsLoggedIn(true);
    }
  }

  return (
    <div>
      <Route
        exact
        path="/"
        render={() => (isLoggedIn ? <Redirect to="/dashboard" /> : null)}
      />
      <div>
        <h1>Sign in</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            authenticate(email, password);
          }}
        >
          <input
            type="text"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <input
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign In
          </button>
          <div>
            <div></div>
            <div>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
