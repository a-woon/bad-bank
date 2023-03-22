import React, { useState } from "react";
import { UserContext } from "../components/usercontext";
import Card from "../components/card";
import validator from "../components/validator";
import { datedTransaction } from "../components/transaction-history";

function Deposit() {
  const ctx = React.useContext(UserContext);

  const currentUserCheck = () => {
    if (ctx.currentUser) {
      return true;
    } else {
      return false;
    }
  };
  const [status, setStatus] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(currentUserCheck);

  const fieldCheck = () => {
    if (
      validator(
        deposit,
        "Please enter the amount you wish to deposit",
        setStatus
      )
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
    if (deposit <= 0 || isNaN(deposit)) {
      setMessage(`Your deposit must be a number and cannot be $0.00`);
      return;
    }
    let i = ctx.userIndex;
    let currentBalance = Number(ctx.users[i].balance);
    ctx.users[i].balance = currentBalance + Number(deposit);
    ctx.currentUser = ctx.users[i];
    const currentTransaction = datedTransaction(deposit);
    ctx.users[i].history.splice(0, 0, currentTransaction);
    setMessage(`Deposit of $${deposit} was successful!`);
    setDeposit(0);
  };
  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      body={
        show ? (
          <>
            <h5>Welcome, {ctx.currentUser.name}!</h5>
            <h6>Your current balance is:</h6>
            <h6>${ctx.currentUser.balance}</h6>
            Deposit
            <br />
            <input
              type="text"
              className="form-control"
              id="deposit"
              placeholder="Please enter a valid deposit."
              value={deposit}
              onChange={(e) => setDeposit(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleSubmit}
              disabled={!deposit}
            >
              Deposit
            </button>
            <br />
            <br />
            {message && <p>{message}</p>}
          </>
        ) : (
          <>
            <h5>Please log in to proceed.</h5>
          </>
        )
      }
    ></Card>
  );
}
export default Deposit;
