import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const PrivateRoute = ({ component: View, ...args }) => {
  const { user, loading } = useContext(UserContext); // Para saber si hay un usuario logeado o no.
  console.log("Usuario", user);
  const isLoggedIn = !!user;
  const isLoading = loading;
  console.log("Logueado", isLoggedIn);
  console.log("loading", isLoading);

  if (isLoading && !isLoggedIn) {
    return (
      <Route
        {...args}
        render={({ location }) => (
          <Redirect to={{ pathname: "loading", state: { from: location } }} />
        )}
      />
    );
  }

  if (isLoggedIn && !isLoading) {
    return <Route {...args} render={() => <View />} />;
  }

  if (!isLoggedIn && !isLoading) {
    return (
      <Route
        {...args}
        render={({ location }) => (
          <Redirect to={{ pathname: "login", state: { from: location } }} />
        )}
      />
    );
  }
};

export default PrivateRoute;
