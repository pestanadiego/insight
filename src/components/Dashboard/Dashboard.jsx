import styles from './Dashboard.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

function Dashboard() {
    const { user } = useContext(UserContext);
    return(
        <>
          {(!!user && !(user.role == "pending") && !(user.role == "admin")) ? (
            <div className={styles.dashboard}>
              <ul>
                <li>
                  <Link to="/profile" className={styles.link}>
                    Mi Perfil
                  </Link>
                </li>
                {(user.role === "specialist") ? (
                  <li>
                    <Link to="/profile" className={styles.link}>
                      Citas
                    </Link>
                  </li>
                    ) : (
                  <li>
                    <Link to="/profile" className={styles.link}>
                      Consultas
                    </Link>
                  </li>
                )}
                {(user.role === "specialist") ? (
                  <li>
                    <Link to="/profile" className={styles.link}>
                      Pacientes
                    </Link>
                  </li>
                    ) : (
                  <li>
                    <Link to="/profile" className={styles.link}>
                      Especialistas
                    </Link>
                  </li>
                )}
                <li>
                    <Link to="/profile" className={styles.link}>
                      Mensajes
                    </Link>
                </li>
              </ul>
            </div>
            ) : (
              null
            )}
        </>
    )
}

export default Dashboard;