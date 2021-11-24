import styles from "./Dashboard.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import citas_image from "../../icons/dates.svg";
import perfil_image from "../../icons/profile.svg";
import pacientes_image from "../../icons/paciente.svg";
import mensajes_image from "../../icons/mensaje.svg";
import mensajes_rojo from "../../icons/mensajeS.svg";
import paciente_nor from "../../icons/paciente.svg";
import paciente_rojo from "../../icons/pacienteR.svg";
import date_nor from "../../icons/dates.svg";
import date_rojo from "../../icons/datesR.svg";
import prof_nor from "../../icons/profile.svg";
import prof_rojo from "../../icons/profileR.svg";
/*
function Dashboard() {
  const { user } = useContext(UserContext);
  const [showDash, setDash] = useState(false);
  const [normalImage, setImage] = useState(true);
  const [pacienState, setPacient] = useState(true);
  const [dateState, setDate] = useState(true);
  const [profileState, setProfile] = useState(true);
  const mensajeNormal = (
    <img id={styles["imagendash"]} src={mensajes_image} alt="mensajeselec" />
  );
  const mensajeRojo = (
    <img id={styles["imagendash"]} src={mensajes_rojo} alt="mensajeselec" />
  );
  const pacientNormal = (
    <img id={styles["imagendash"]} src={paciente_nor} alt="mensajeselec" />
  );
  const pacientRojo = (
    <img id={styles["imagendash"]} src={paciente_rojo} alt="mensajeselec" />
  );
  const dateNormal = (
    <img id={styles["imagendash"]} src={date_nor} alt="mensajeselec" />
  );
  const dateRoja = (
    <img id={styles["imagendash"]} src={date_rojo} alt="mensajeselec" />
  );
  const perfilNormal = (
    <img id={styles["imagendash"]} src={prof_nor} alt="mensajeselec" />
  );
  const perfilRoja = (
    <img id={styles["imagendash"]} src={prof_rojo} alt="mensajeselec" />
  );

  return (
    <>
      <div className={styles.maindiv}>
        {!!user && !(user.role == "pending") && !(user.role == "admin") ? (
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
                <Link to="/search" className={styles.link}>
                  Citas
                </Link>
              </li>

              <li id={styles["hidden_d"]}>
                <Link
                  to="/search"
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
                <Link to="/profi" leclassName={styles.link}>
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
    </>
  );
}*/
/*==================================================*/

function Dashboard() {
  const { user } = useContext(UserContext);
  const [showDash, setDash] = useState(false);
  const [normalImage, setImage] = useState(true);
  const [pacienState, setPacient] = useState(true);
  const [dateState, setDate] = useState(true);
  const [profileState, setProfile] = useState(true);
  const mensajeNormal = (
    <img id={styles["imagendash"]} src={mensajes_image} alt="mensajeselec" />
  );
  const mensajeRojo = (
    <img id={styles["imagendash"]} src={mensajes_rojo} alt="mensajeselec" />
  );
  const pacientNormal = (
    <img id={styles["imagendash"]} src={paciente_nor} alt="mensajeselec" />
  );
  const pacientRojo = (
    <img id={styles["imagendash"]} src={paciente_rojo} alt="mensajeselec" />
  );
  const dateNormal = (
    <img id={styles["imagendash"]} src={date_nor} alt="mensajeselec" />
  );
  const dateRoja = (
    <img id={styles["imagendash"]} src={date_rojo} alt="mensajeselec" />
  );
  const perfilNormal = (
    <img id={styles["imagendash"]} src={prof_nor} alt="mensajeselec" />
  );
  const perfilRoja = (
    <img id={styles["imagendash"]} src={prof_rojo} alt="mensajeselec" />
  );
  return (
    <>
      {!!user && !(user.role == "pending") && !(user.role == "admin") ? (
        <div className={styles.dashboard}>
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
            {user.role === "specialist" ? (
              <>
                {" "}
                <li id={styles["showdash"]}>
                  <Link to="/appointments" className={styles.link}>
                    Citas
                  </Link>
                </li>
                <li id={styles["hidden_d"]}>
                  <Link
                    to="/search"
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
              </>
            ) : (
              <li>
                <Link to="/profile" className={styles.link}>
                  Consultas
                </Link>
              </li>
            )}
            {user.role === "specialist" ? (
              <li>
                <Link to="/profile" className={styles.link}>
                  Pacientes
                </Link>
              </li>
            ) : (
              <>
                <li id={styles["showdash"]}>
                  <Link to="/search" className={styles.link}>
                    Especialistas
                  </Link>
                </li>
                <li id={styles["hidden_d"]}>
                  <Link
                    to="/search"
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
              </>
            )}
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
      ) : null}
    </>
  );
}

export default Dashboard;
