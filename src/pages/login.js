import React, { useState } from "react";
import { UserContext } from "../components/usercontext";
import Card from "../components/card";
import validator from "../components/validator";

function Login() {
  const ctx = React.useContext(UserContext);

  const currentUserCheck = () => {
    if (ctx.currentUser) {
      return false;
    } else {
      return true;
    }
  };

  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [show, setShow] = useState(currentUserCheck);

  function handleSubmit() {
    setErrorMessage(null);
    let foundUser;
    for (let i = 0; i < ctx.users.length; i++) {
      if (ctx.users[i].email == email) {
        if (ctx.users[i].password == password) {
          foundUser = ctx.users[i];
          ctx.currentUser = foundUser;
          ctx.userIndex = i;
          setShow(false);
          return;
        } else {
          setErrorMessage("Incorrect password!");
          return;
        }
      }
    }
    if (!foundUser) {
      setErrorMessage("No such user.");
      return;
    }
  }

  function clearForm() {
    setEmail("");
    setPassword("");
    setShow(true);
    ctx.currentUser = null;
    ctx.userIndex = null;
  }

  const validateThis = () => {
    if (
      validator(email, "Please enter your email address.", setStatus) &&
      validator(password, "Please enter your password.", setStatus)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="centered">
      {show ? (
        <Card
          bgcolor="primary"
          header="Login"
          status={status}
          body={
            <>
              Email
              <br />
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <br />
              Password
              <br />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleSubmit}
              >
                Log In
              </button>
              <br />
              <br />
              {errorMessage && <h5>{errorMessage}</h5>}
            </>
          }
        />
      ) : (
        <Card
          bgcolor="main"
          header="Login Successful!"
          status={status}
          body={
            <>
              <p>
                Welcome, {ctx.currentUser.name}! You are currently logged in.
              </p>
              <center>
                <button
                  type="submit"
                  className="btn btn-light"
                  onClick={clearForm}
                >
                  Log Out
                </button>
              </center>
            </>
          }
        />
      )}
    </div>
  );
}

export default Login;
