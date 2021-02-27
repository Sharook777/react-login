import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Home.css";

async function getUser(token) {
  const updateUserToken = (users, user) => {
    const restUser = users.filter((u) => u.username !== user.username);

    user.token = user.token ?? new Date().getTime();

    localStorage.setItem("app_users", JSON.stringify([...restUser, user]));
    return user;
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let users = localStorage.getItem("app_users")
        ? JSON.parse(localStorage.getItem("app_users"))
        : [];

      const user = users.find((user) => user.token === token);
      user
        ? resolve(updateUserToken(users, user))
        : reject(new Error("Invalid Token"));
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

export default function Home({ token }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  let history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUser(token);
        setUser(user);
        setLoading(false);
      } catch (err) {
        history.push("/login");
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="home-wrapper">
      <div className="navbar">
        {!loading && user && (
          <div className="user-icon">{user.username?.[0]}</div>
        )}
      </div>
      <div className="content-box">
        {!loading && user ? "Under Construction" : "Loading"}
      </div>
    </div>
  );
}
