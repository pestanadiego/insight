import styles from "./Dashboard.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [showDash, setDash] = useState(true);

  return (
    <div>
      {!!user ? (
        <div id={styles[showDash ? "dash" : ""]} className={styles.dashboard}>
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
            <li id={styles["arrow"]}>
              <button onClick> menu </button>
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
  );
}

export default Dashboard;
