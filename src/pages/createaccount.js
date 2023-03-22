import React, { useState } from "react";
import Card from "../components/card";
import { UserContext } from "../components/usercontext";
import validator from "../components/validator";

function CreateAccount() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ctx = React.useContext(UserContext);

  const fieldCheck = () => {
    if (
      validator(name, "Please enter your name", setStatus) &&
      validator(email, "Please enter your email", setStatus) &&
      validator(password, "Please enter your password", setStatus)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    if (!fieldCheck()) {
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (!/^[A-Za-z]\w{8,25}$/.test(password)) {
      setErrorMessage(
        "Please enter a password that's at least 8 characters long"
      );
      return;
    }
    setErrorMessage(null);
    ctx.users.push({ name, email, password, balance: 0, history: [] });
    const newUserIndex = ctx.users.length - 1;
    ctx.currentUser = ctx.users[newUserIndex];
    ctx.userIndex = newUserIndex;
    setShow(false);
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  };

  return (
    <>
      <Card
        header="Create Account"
        bgcolor="primary"
        status={status}
        body={
          show ? (
            <>
              Name
              <br />
              <input
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <br />
              Email
              <br />
              <input
                type="input"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <br />
              Password
              <br />
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <br />
              <button
                className="btn btn-light"
                type="submit"
                onClick={handleSubmit}
                disabled={!name && !email && !password}
              >
                Create Account
              </button>
              <br />
              {errorMessage && <p>{errorMessage}</p>}
            </>
          ) : (
            <>
              <h5>Account registration successful!</h5>
              <p>Welcome {name}! You are currently logged in.</p>

              <button
                type="submit"
                className="btn btn-light"
                onClick={clearForm}
              >
                Add another account
              </button>
            </>
          )
        }
      ></Card>
    </>
  );
}

export default CreateAccount;
