import React, { useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toLogin, setToLogin] = useState(false);

  const createUser = async (firstname, lastname, email, password) => {
    const response = await axios.post("http://localhost:8000/users", {
      firstname,
      lastname,
      email,
      password
    });
    if (response.status === 200) {
      setToLogin(true);
    }
  };

  return (
    <div>
      <Route
        exact
        path="/register"
        render={() => (toLogin ? <Redirect to='/' /> : null)}
      />
      <div>
        <h1>Sign up</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            createUser(firstname, lastname, email, password);
          }}
        >
          <div>
            <div>
              <input
                type="text"
                autoComplete="fname"
                name="firstName"
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => {
                  setFirstname(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={e => {
                  setLastname(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="text"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div item xs={12}>
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
            </div>
          </div>
          <button type="submit">Sign Up</button>
          <div>
            <div>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
