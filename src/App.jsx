import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import UserContextProvider from './context/UserContext';
import Routes from './Routes';
import './app.css';

function App() {

  return (
    <UserContextProvider>
      <Router>
        <Navbar />
        <div class="layout">
          <Dashboard />
          <div class="container">
            <Routes />
          </div>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
