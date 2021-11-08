import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/ProtectedRoutes/PrivateRoute';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      {/* Protected Route */}
      <PrivateRoute exact path="/profile" component={ProfilePage} />
      <Route exact path="/" component={HomePage} />
      <Route path="*">
        <h1>404</h1>
      </Route>
    </Switch>
  );
}

export default Routes;