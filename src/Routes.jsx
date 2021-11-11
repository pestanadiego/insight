import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterEspecialistPage from './pages/RegisterEspecialistPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/ProtectedRoutes/PrivateRoute';
import AdminPage from './pages/AdminPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register_pacient" component={RegisterPage} />
      <Route exact path="/register_especialist" component={RegisterEspecialistPage} />
      {/* Protected Route */}
      <PrivateRoute exact path="/profile" component={ProfilePage} />
      <PrivateRoute exact path="/admin" component={AdminPage} />
      <Route exact path="/" component={HomePage} />
      <Route path="*">
        <h1>404</h1>
      </Route>
    </Switch>
  );
}

export default Routes;