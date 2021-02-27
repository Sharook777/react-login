import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ token, path, children }) => {
  if (token) {
    return <Route path={path}>{children}</Route>;
  } else {
    return (
      <Route
        path={path}
        render={(props) => (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )}
      />
    );
  }
};

export default ProtectedRoute;
