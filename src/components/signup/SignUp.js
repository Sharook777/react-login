import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";

import useForm from "../../hooks/useForm";
import validate from "../__helper/validationRules";
import Toast from "../__helper/toast/Toast";

import "./SignUp.css";

async function signupUser(credentials) {
  const addNewUser = (users, user) => {
    localStorage.setItem("app_users", JSON.stringify([...users, user]));
    return {
      status: "success",
      message: "Registration complete, Please Login",
    };
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let users = localStorage.getItem("app_users")
        ? JSON.parse(localStorage.getItem("app_users"))
        : [];

      const user = users.find(
        (user) =>
          user.username === credentials.username?.value &&
          user.password === credentials.password?.value
      );
      user
        ? reject({
            status: "success",
            message: new Error("Username already used"),
          })
        : resolve(
            addNewUser(users, {
              username: credentials.username?.value,
              password: credentials.password?.value,
            })
          );
    }, 1000);
  });
  // return fetch("http://localhost:8080/signup", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(credentials),
  // }).then((data) => data.json());
}

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState(null);

  let history = useHistory();

  const onSubmit = async (e) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await signupUser({
        ...values,
      });

      setMessage(response);
      reset();
    } catch (err) {
      setMessage(err.message);
    }

    setLoading(false);
  };

  const {
    handleChange,
    handleSubmit,
    reset,
    values,
    errors,
    trySubmit,
  } = useForm(onSubmit, validate);

  return (
    <>
      {message && (
        <Toast
          toastList={[
            {
              id: 1,
              title: message.status || "Failed",
              description: message.message,
              backgroundColor: message.status === "success" ? "green" : "red",
              icon: "",
            },
          ]}
          position="top-right"
        />
      )}
      <div className="signup-wrapper">
        <div className="signup-container">
          <div className="width-100">
            <h1 className="signup-head">Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <input
                  type="text"
                  onChange={handleChange}
                  className={`text-input ${
                    (trySubmit || values.username?.touch) &&
                    errors.username &&
                    "is-danger"
                  }`}
                  name="username"
                  value={values.username?.value || ""}
                  placeholder="Username"
                />
              </div>
              {(trySubmit || values.username?.touch) && errors.username && (
                <p className="danger-text">{errors.username}</p>
              )}
              <div className="input-wrapper">
                <input
                  type="password"
                  onChange={handleChange}
                  className={`text-input ${
                    (trySubmit || values.password?.touch) &&
                    errors.password &&
                    "Is-Danger"
                  }`}
                  name="password"
                  value={values.password?.value || ""}
                  placeholder="Password"
                />
              </div>
              {(trySubmit || values.password?.touch) && errors.password && (
                <p className="danger-text">{errors.password}</p>
              )}
              <div>
                <button
                  className="btn-primary"
                  disabled={loading}
                  type="submit"
                >
                  Sign Up
                </button>
              </div>{" "}
              <div className="links">
                <button
                  className="link-btn"
                  onClick={() => history.push("/login")}
                >
                  Already Member Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
