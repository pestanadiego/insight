import { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

const PrivateRoute = ({ component: View, ...args }) => {
  const { user } = useContext(UserContext); // Para saber si hay un usuario logeado o no.

  const isLoggedIn = !!user;

  if (isLoggedIn) {
    return <Route {...args} render={() => <View />} />;
  }

  // Si no hay usuario, se redirige al login
  return (
    <Route
      {...args}
      render={({ location }) => (
        <Redirect to={{ pathname: 'login', state: { from: location } }} />
      )}
    />
  );
};

export default PrivateRoute;
