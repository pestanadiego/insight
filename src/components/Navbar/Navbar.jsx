import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../utils/firebaseConfig";
import styles from "./Navbar.module.css";
import logo from "../../images/logo.svg";
import homelogo from "../../icons/home_logo.svg";
import loginLogo from "../../icons/login_logo.svg";
import especialisLogo from "../../icons/especialist_logo.svg";
import pacientLogo from "../../icons/paciente_logo.svg";

function Navbar() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext); // Para poder acceder al estado global del sistema
  const [showMenu, setMenu] = useState(true);

  // Función para cerrar sesión. Se coloca el user en null y se devuelve al home page
  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    history.push("/");
  };

  return (
    <div className={styles.main_navContainer}>
      <ul className={styles.navbarContainer}>
        <li id={styles["logoshow"]}>
          <Link to="/" className={styles.link}>
            <img className={styles.logo} src={logo} alt="logo" />
          </Link>
        </li>

        <li id={styles[showMenu ? "hidden" : ""]} className={styles.rightSide}>
          {!!user ? (
            <div className={styles.container}>
              <button
                type="button"
                className={styles.logoutBtn}
                onClick={handleLogout}
              >
                CERRAR SESIÓN
              </button>
            </div>
          ) : (
            <>
              <div className={styles.container}>
                <Link to="/register_pacient" className={styles.link}>
                  <button id={styles["show"]} className={styles.register}>
                    PACIENTE
                  </button>
                </Link>
                <Link to="/register_pacient" className={styles.link}>
                  <button id={styles["hidden"]} className={styles.register}>
                    <img src={pacientLogo} alt="pacientLogo" />
                  </button>
                </Link>
              </div>

              <div className={styles.container}>
                <Link to="/register_especialist" className={styles.link}>
                  <button id={styles["show"]} className={styles.register}>
                    ESPECIALISTA
                  </button>
                </Link>
                <Link to="/register_especialist" className={styles.link}>
                  <button id={styles["hidden"]} className={styles.register}>
                    <img src={especialisLogo} alt="especialistLogo" />
                  </button>
                </Link>
              </div>

              <div className={styles.container}>
                <Link to="/login" className={styles.link}>
                  <button id={styles["show"]} className={styles.login}>
                    INICIAR SESIÓN
                  </button>
                </Link>
                <Link to="/login" className={styles.link}>
                  <button id={styles["hidden"]} className={styles.login}>
                    <img src={loginLogo} alt="loginLogo" />
                  </button>
                </Link>
              </div>
              <div>
                <Link to="/" className={styles.link}>
                  <button id={styles["hidden"]} className={styles.login}>
                    <img alt="homelogo" src={homelogo} />
                  </button>
                </Link>
              </div>
            </>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
