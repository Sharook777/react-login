import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import useForm from "../../hooks/useForm";
import validate from "../__helper/validationRules";

import Toast from "../__helper/toast/Toast";

import "./Login.css";

async function loginUser(credentials) {
  const updateUserToken = (users, user) => {
    const restUser = users.filter((u) => u.username !== user.username);

    user.token = user.token ?? new Date().getTime();

    localStorage.setItem("app_users", JSON.stringify([...restUser, user]));
    return { token: user.token };
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
        ? resolve(updateUserToken(users, user))
        : reject(new Error("Invalid Username and Password"));
    }, 1000);
  });
  // return fetch("http://localhost:8080/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(credentials),
  // }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  let history = useHistory();

  const onSubmit = async (e) => {
    setLoading(true);
    setError(null);

    try {
      const token = await loginUser({
        ...values,
      });
      setToken(token);
      history.push("/home");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const { handleChange, handleSubmit, values, errors, trySubmit } = useForm(
    onSubmit,
    validate
  );

  return (
    <>
      {error && (
        <Toast
          toastList={[
            {
              id: 1,
              title: "Failed",
              description: error,
              backgroundColor: "red",
              icon: "",
            },
          ]}
          position="top-right"
        />
      )}

      <div className="login-wrapper">
        <div className="login-container">
          <div className="width-100">
            <h1 className="login-head">Log In</h1>
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
                    "is-danger"
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
                  Log In
                </button>
              </div>
              <div className="links">
                <button
                  className="link-btn"
                  onClick={() => history.push("/signup")}
                >
                  New User? Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
