import styles from "./Dashboard.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import citas_image from "../../images/icons/dates.svg";
import perfil_image from "../../images/icons/profile.svg";
import pacientes_image from "../../images/icons/paciente.svg";
import mensajes_image from "../../images/icons/mensaje.svg";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [showDash, setDash] = useState(false);

  return (
    <div className={styles.maindiv}>
      {!!user ? (
        <div id={styles["dash"]} className={styles.dashboard}>
          <ul>
            <li id={styles["showdash"]}>
              <Link
                onClick={() => setDash(!showDash)}
                to="/profile"
                className={styles.link}
              >
                Mi Perfil
              </Link>
            </li>
            <li id={styles["hidden_d"]}>
              <Link to="/profile" className={styles.link}>
                <img src={perfil_image} alt="Mi perfil" />
              </Link>
            </li>
            <li id={styles["showdash"]}>
              <Link to="/profile" className={styles.link}>
                Citas
              </Link>
            </li>
            <li id={styles["hidden_d"]}>
              <Link to="/profile" className={styles.link}>
                <img src={citas_image} alt="imagen_cita" />
              </Link>
            </li>

            <li id={styles["showdash"]}>
              <Link to="/profile" className={styles.link}>
                Pacientes
              </Link>
            </li>
            <li id={styles["hidden_d"]}>
              <Link to="/profile" className={styles.link}>
                <img src={pacientes_image} alt="paciente_image" />
              </Link>
            </li>
            <li id={styles["showdash"]}>
              <Link to="/profile" className={styles.link}>
                Mensajes
              </Link>
            </li>
            <li id={styles["hidden_d"]}>
              <Link to="/profile" className={styles.link}>
                <img src={mensajes_image} alt="mensajes_image" />
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
