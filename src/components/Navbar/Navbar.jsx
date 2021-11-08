import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { auth } from '../../utils/firebaseConfig';
import styles from './Navbar.module.css';

function Navbar() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    history.push('/');
  };

  return (
    <ul className={styles.navbarContainer}>
      <li>
        <Link to="/" className={styles.link}>
          Insight
        </Link>
      </li>

      {/*!!user && (
        <li>
          <Link to="/favorites" className={styles.link}>
            Favorites
          </Link>
        </li>
      )*/}

      <li className={styles.rightSide}>
        {!!user ? (
          <div className={styles.container}>
            <button type="button" onClick={handleLogout}>
              Logout, {user.name}
            </button>
          </div>
        ) : (
          <>
            <div className={styles.container}>
              <Link to="/register" className={styles.link}>
                ¿Eres paciente?
              </Link>
            </div>

            <div className={styles.container}>
              <Link to="/register" className={styles.link}>
                ¿Eres especialista?
              </Link>
            </div>

            <div className={styles.container}>
              <Link to="/login" className={styles.link}>
                Iniciar Sesión
              </Link>
            </div>
          </>
        )}
      </li>
    </ul>
  );
}

export default Navbar;
