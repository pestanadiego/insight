import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { auth } from '../../utils/firebaseConfig';
import styles from './Navbar.module.css';
import logo from '../../images/logo.svg';

function Navbar() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext); // Para poder acceder al estado global del sistema

  // Función para cerrar sesión. Se coloca el user en null y se devuelve al home page
  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    history.push('/');
  };

  return (
    <ul className={styles.navbarContainer}>
      <li>
        <Link to="/" className={styles.link}>
          <img src={logo} alt="logo" />
        </Link>
      </li>

      <li className={styles.rightSide}>
        {!!user ? (
          <div className={styles.container}>
            <button type="button" className={styles.logoutBtn}onClick={handleLogout}>
              CERRAR SESIÓN
            </button>
          </div>
        ) : (
          <>
            <div className={styles.container}>
              <Link to="/register" className={styles.link}>
                <button className={styles.register}>
                  PACIENTE
                </button>
              </Link>
            </div>

            <div className={styles.container}>
              <Link to="/register" className={styles.link}>
                <button className={styles.register}>
                  ESPECIALISTA
                </button>
              </Link>
            </div>

            <div className={styles.container}>
                <Link to="/login" className={styles.link}>
                  <button className={styles.login}>
                    INICIAR SESIÓN
                  </button>
                </Link>
            </div>
          </>
        )}
      </li>
    </ul>
  );
}

export default Navbar;
