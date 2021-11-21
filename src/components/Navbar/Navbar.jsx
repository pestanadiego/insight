import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../utils/firebaseConfig";
import styles from "./Navbar.module.css";
import logo from "../../images/logo.svg";
import menu_desp from "../../icons/menu_desp.svg";
import x_svg from "../../images/x.svg";

function Navbar() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext); // Para poder acceder al estado global del sistema
  const [showMenu, setMenu] = useState(false);

  // Función para cerrar sesión. Se coloca el user en null y se devuelve al home page
  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    history.push("/");
  };

  return (
    <ul id={styles["ulstyles"]} className={styles.navbarContainer}>
      <li>
        <Link to="/" className={styles.link}>
          <img
            id={styles["imgstyles"]}
            className={styles.logo}
            src={logo}
            alt="logo"
          />
        </Link>

        <div className={styles.resboton}>
          <button
            id={styles["menuid"]}
            onClick={() => setMenu(!showMenu)}
            className={styles.login}
          >
            <img
              id={styles["imgstyles"]}
              className={styles.menu_desp}
              src={menu_desp}
              alt="menu_desp"
            />
          </button>
        </div>
      </li>

      <li id={styles[showMenu ? "hidden" : ""]} className={styles.rightSide}>
        {!!user ? (
          <div className={styles.container}>
            <button
              type="button"
              id={styles["buttonbig"]}
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              CERRAR SESIÓN
            </button>
            <button
              id={styles["hidden_button"]}
              type="button"
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              <img src={x_svg} alt="x_svg" />
              Cerrar sesión
            </button>
          </div>
        ) : (
          <>
            <div className={styles.container}>
              <Link to="/register_pacient" className={styles.link}>
                <button
                  onClick={() => setMenu(!showMenu)}
                  className={styles.register}
                >
                  PACIENTE
                </button>
              </Link>
            </div>

            <div className={styles.container}>
              <Link to="/register_especialist" className={styles.link}>
                <button
                  onClick={() => setMenu(!showMenu)}
                  className={styles.register}
                >
                  ESPECIALISTA
                </button>
              </Link>
            </div>

            <div className={styles.container}>
              <Link to="/login" className={styles.link}>
                <button
                  onClick={() => setMenu(!showMenu)}
                  className={styles.login}
                >
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
