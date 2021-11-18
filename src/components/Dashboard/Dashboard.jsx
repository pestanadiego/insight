import styles from "./Dashboard.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import arrows from "../../images/icons/arrow.svg";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [showDash, setDash] = useState(false);

  return (
    <div>
      {!!user ? (
        <div id={styles[showDash ? "dash" : ""]} className={styles.dashboard}>
          <ul>
            <li>
              <Link
                onClick={() => setDash(!showDash)}
                to="/profile"
                className={styles.link}
              >
                Mi Perfil
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setDash(!showDash)}
                to="/profile"
                className={styles.link}
              >
                Citas
              </Link>
            </li>
            <li id={styles["arrow"]}>
              <button onClick={() => setDash(!showDash)}>
                {" "}
                <img src={arrows} alt="arrows" />{" "}
              </button>
            </li>
            <li>
              <Link
                onClick={() => setDash(!showDash)}
                to="/profile"
                className={styles.link}
              >
                Pacientes
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setDash(!showDash)}
                to="/profile"
                className={styles.link}
              >
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
