import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import useToken from "./hooks/useToken";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";

import ProtectedRoute from "./components/__helper/protectedRoute";

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path="/home" token={token}>
            <Home token={token} />
          </ProtectedRoute>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
