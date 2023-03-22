import React from "react";
import { UserContext } from "../components/usercontext";
import Card from "../components/card";
import "../styles/alldata.css";
import { Transaction } from "../components/transaction-history";

function AllData() {
  const ctx = React.useContext(UserContext);
  const maskPwd = (pwd) => pwd.substring(0, 1) + "*".repeat(pwd.length - 1);

  return (
    <>
      <Card
        bgcolor="primary"
        header="All Data"
        width="50rem"
        body={
          <>
            <div className="alldata">
              <div className="offset">
                <h5>Name</h5>
              </div>
              <div>
                <h5>Email</h5>
              </div>
              <div>
                <h5>Password</h5>
              </div>
              <div>
                <h5>Transactions</h5>
              </div>
            </div>
            {ctx.users.map((user, i) => {
              return (
                <>
                  <div key={i} className="alldata data-item">
                    <div className="offset padded">{user.name}</div>
                    <div className="padded">{user.email}</div>
                    <div className="padded">{maskPwd(user.password)}</div>
                    <div className="padded">
                      {user.history.map((transaction, i) => (
                        <Transaction key={i} t={transaction} />
                      ))}
                    </div>
                  </div>
                </>
              );
            })}
          </>
        }
      />
    </>
  );
}
export default AllData;
