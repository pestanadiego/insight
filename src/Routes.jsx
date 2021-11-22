import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterEspecialistPage from "./pages/RegisterEspecialistPage";
import UnderReviewPage from "./pages/UnderReviewPage";
import ReviewDonePage from "./pages/ReviewDonePage";
import PasswordPage from "./pages/PasswordPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/ProtectedRoutes/PrivateRoute";
import AdminPage from "./pages/AdminPage";
import ScheduleAppointmentPage from "./pages/ScheduleAppointmentPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import LoadingPage from "./pages/LoadingPage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register_pacient" component={RegisterPage} />
      <Route
        exact
        path="/register_especialist"
        component={RegisterEspecialistPage}
      />
      <Route exact path="/under_review" component={UnderReviewPage} />
      <Route exact path="/forgotten_password" component={PasswordPage} />
      <Route exact path="/done_review" component={ReviewDonePage} />
      <Route exact path="/loading" component={LoadingPage} />
      {/* Protected Routes */}
      <PrivateRoute exact path="/profile" component={ProfilePage} />
      <PrivateRoute exact path="/admin" component={AdminPage} />
      <Route
        exact
        path="/schedule_appointment"
        component={ScheduleAppointmentPage}
      />
      <Route exact path="/appointments" component={AppointmentsPage} />
      <Route exact path="/" component={HomePage} />
      <Route path="*">
        <h1>404</h1>
      </Route>
    </Switch>
  );
}

export default Routes;
