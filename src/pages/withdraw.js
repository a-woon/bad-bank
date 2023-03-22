import React, { useState } from "react";
import { UserContext } from "../components/usercontext";
import Card from "../components/card";
import { datedTransaction } from "../components/transaction-history";
import validator from "../components/validator";

function Withdraw() {
  const ctx = React.useContext(UserContext);

  const currentUserCheck = () => {
    if (ctx.currentUser) {
      return true;
    } else {
      return false;
    }
  };

  const [status, setStatus] = useState("");
  const [withdraw, setWithdraw] = useState(0);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(currentUserCheck);

  const fieldCheck = () => {
    if (validator(withdraw, "Please enter withdrawal amount.", setStatus)) {
      return true;
    } else {
      return false;
    }
  };

  function handleSubmit() {
    let i = ctx.userIndex;
    let currentBalance = Number(ctx.users[i].balance);

    if (currentBalance < Number(withdraw)) {
      setMessage(`You can't withdraw more than what you have!`);
      setWithdraw(0);
      return;
    }

    if (withdraw <= 0 || isNaN(withdraw)) {
      setMessage(`Your withdrawal must be a valid number and cannot be $0.00 `);
      return;
    }
    ctx.users[i].balance = currentBalance - Number(withdraw);
    const currentTransaction = datedTransaction(0 - Number(withdraw));
    ctx.users[i].history.splice(0, 0, currentTransaction);
    ctx.currentUser = ctx.users[i];
    setMessage(`Withdrawal of $${withdraw} successful.`);
    setWithdraw(0);
  }

  return (
    <Card
      bgcolor="primary"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <>
            <h5>Welcome, {ctx.currentUser.name}!</h5>
            <h6>Your current balance is:</h6>
            <h6>${ctx.currentUser.balance}</h6>
            Withdraw
            <br />
            <input
              type="text"
              className="form-control"
              id="withdraw"
              placeholder="Please enter amount to withdraw."
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleSubmit}
              disabled={!withdraw}
            >
              Withdraw
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
    />
  );
}
export default Withdraw;
