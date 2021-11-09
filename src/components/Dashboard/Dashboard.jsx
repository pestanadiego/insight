import styles from './Dashboard.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

function Dashboard() {
    const { user } = useContext(UserContext);

    return(
        <div>
          {!!user ? (
            <div className={styles.dashboard}>
              <ul>
                <li>
                  <Link to="/profile" className={styles.link}>
                    Mi Perfil
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className={styles.link}>
                    Citas
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className={styles.link}>
                    Pacientes
                  </Link>
                </li>
                <li>
                    <Link to="/profile" className={styles.link}>
                      Mensajes
                    </Link>
                </li>
              </ul>
            </div>
            ) : (
              <div className={styles.nodisplay}></div>
            )}
        </div>
    )
}

export default Dashboard;