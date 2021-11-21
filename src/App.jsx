import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import UserContextProvider from './context/UserContext';
import Routes from './Routes';
import { useContext } from 'react';
import { user } from './context/UserContext';

function App() {
  
  return (
    <UserContextProvider>
      <Router>
          <Navbar />
          <Dashboard />
          <div className="container">
            <Routes />
          </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
