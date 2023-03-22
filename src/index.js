import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./components/usercontext";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Withdraw from "./pages/withdraw";
import AllData from "./pages/alldata";
import CreateAccount from "./pages/createaccount";
import Deposit from "./pages/deposit";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext.Provider
        value={{
          users: [
            {
              name: "default",
              email: "default@email.com",
              password: "abcde12345",
              balance: 100,
              history: [],
            },
          ],
          currentUser: null,
          userIndex: null,
        }}
      >
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="alldata" element={<AllData />} />
            <Route path="createaccount" element={<CreateAccount />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="deposit" element={<Deposit />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
