import styles from "./Dashboard.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import citas_image from "../../images/icons/dates.svg";
import perfil_image from "../../images/icons/profile.svg";
import pacientes_image from "../../images/icons/paciente.svg";
import mensajes_image from "../../images/icons/mensaje.svg";
import mensajes_rojo from "../../images/icons/mensajeS.svg";
import paciente_nor from "../../images/icons/paciente.svg";
import paciente_rojo from "../../images/icons/pacienteR.svg";
import date_nor from "../../images/icons/dates.svg";
import date_rojo from "../../images/icons/datesR.svg";
import prof_nor from "../../images/icons/profile.svg";
import prof_rojo from "../../images/icons/profileR.svg";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [showDash, setDash] = useState(false);
  const [normalImage, setImage] = useState(true);
  const [pacienState, setPacient] = useState(true);
  const [dateState, setDate] = useState(true);
  const [profileState, setProfile] = useState(true);
  const mensajeNormal = <img src={mensajes_image} alt="mensajeselec" />;
  const mensajeRojo = <img src={mensajes_rojo} alt="mensajeselec" />;
  const pacientNormal = <img src={paciente_nor} alt="mensajeselec" />;
  const pacientRojo = <img src={paciente_rojo} alt="mensajeselec" />;
  const dateNormal = <img src={date_nor} alt="mensajeselec" />;
  const dateRoja = <img src={date_rojo} alt="mensajeselec" />;
  const perfilNormal = <img src={prof_nor} alt="mensajeselec" />;
  const perfilRoja = <img src={prof_rojo} alt="mensajeselec" />;

  return (
    <div className={styles.maindiv}>
      {!!user ? (
        <div id={styles["dash"]} className={styles.dashboard}>
          <ul>
            <li id={styles["showdash"]}>
              <Link to="/profile" className={styles.link}>
                Mi Perfil
              </Link>
            </li>
            <li id={styles["hidden_d"]}>
              <Link
                to="/profile"
                onClick={() => {
                  setImage(true);
                  setPacient(true);
                  setDate(true);
                  setProfile(false);
                }}
                className={styles.link}
              >
                {profileState ? perfilNormal : perfilRoja}
              </Link>
            </li>
            <li id={styles["showdash"]}>
              <Link to="/profile" className={styles.link}>
                Citas
              </Link>
            </li>
            <li id={styles["hidden_d"]}>
              <Link
                to="/profile"
                onClick={() => {
                  setImage(true);
                  setPacient(true);
                  setDate(false);
                  setProfile(true);
                }}
                className={styles.link}
              >
                {dateState ? dateNormal : dateRoja}
              </Link>
            </li>

            <li id={styles["showdash"]}>
              <Link to="/profile" className={styles.link}>
                Pacientes
              </Link>
            </li>
            <li id={styles["hidden_d"]}>
              <Link
                to="/profile"
                onClick={() => {
                  setImage(true);
                  setPacient(false);
                  setDate(true);
                  setProfile(true);
                }}
                className={styles.link}
              >
                {pacienState ? pacientNormal : pacientRojo}
              </Link>
            </li>
            <li id={styles["showdash"]}>
              <Link to="/profile" className={styles.link}>
                Mensajes
              </Link>
            </li>
            <li id={styles["hidden_d"]}>
              <Link
                to="/profile"
                onClick={() => {
                  setImage(false);
                  setPacient(true);
                  setDate(true);
                  setProfile(true);
                }}
                className={styles.link}
              >
                {normalImage ? mensajeNormal : mensajeRojo}
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
