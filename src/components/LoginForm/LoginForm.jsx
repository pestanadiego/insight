import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./LoginForm.module.css";
import {
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
} from "../../utils/firebaseConfig";
import { UserContext } from "../../context/UserContext";
import { useState } from "react";
import googleIcon from "../../icons/Google_Icon.svg";
import facebIcon from "../../icons/cib_facebook.svg";
import twitterIcon from "../../icons/twitter_icon.svg";

function LoginForm() {
  const {
    getUserByName,
    getUserByEmail,
    getUserPending,
    getNoValidUser,
    setUser,
    createUser,
  } = useContext(UserContext); // Lo que nos permite cambiar el estado
  const history = useHistory(); // Se utiliza para redirigir al usuario
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    setValues({ ...values, [inputName]: value });
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await auth.signInWithPopup(googleProvider); // Se le envía el proveedor de Google
      //console.log("Respuesta de googleProvider", response);
      //console.log("Email: ", response.user.email);
      const loggedUser = await getUserByEmail(response.user.email);
      setUser(loggedUser);
      //console.log(loggedUser);
      history.push("/profile");
    } catch {
      alert("Hubo un error!");
    }
  };

  //Inicio de sesion con Facebook
  const handleFacebookLogin = async () => {
    try {
      const response = await auth.signInWithPopup(facebookProvider); //Se le envia al proveedor de Facebook
      setUser({
        name: response.user.displayName,
        email: response.user.email,
      });
      // Para que se almacene en la base de datos y no sólo en el módulo de autenticación
      await createUser(
        {
          name: response.user.displayName,
          email: response.user.email,
          phone: response.user.phoneNumber,
          role: "pacient",
          uid: response.user.uid,
        },
        response.user.uid
      );
      history.push("/profile");
    } catch (error) {
      alert("Se ha producido un error por favor inténtelo más tarde.");
    }
  };

  //Inicio de sesion con Twitter
  const handleTwitterLogin = async () => {
    try {
      const response = await auth.signInWithPopup(twitterProvider); //Se le envia al proveedor de Twitter
      //console.log("Usuario twitter: ", response);
      if (response.user.email !== null) {
        const loggedUser = await getUserByEmail(response.user.email);
        setUser(loggedUser);
        history.push("/profile");
      } else {
        const loggedUser = await getUserByName(response.user.displayName);
        setUser(loggedUser);
        history.push("/profile");
      }
      /*setUser({
        name: response.user.displayName,
        email: "null@email.com",
      });*/
    } catch {
      console.log("Error");
      alert("Hubo un error!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.signInWithEmailAndPassword(values.email, values.password);
    const loggedUser = await getUserByEmail(values.email);
    console.log(loggedUser);
    if (!!!loggedUser) {
      const pendingUser = await getUserPending(values.email);
      const noValidUser = await getNoValidUser(values.email);
      if (noValidUser) {
        setUser(null);
        history.push("/done_review");
        auth.signOut();
        setUser(null);
      } else if (pendingUser) {
        history.push("/under_review");
      } else {
        history.push("/");
      }
    } else {
      if (loggedUser.role === "admin") {
        history.push("/admin");
      } else {
        history.push("/profile");
      }
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.section_alternatives}>
            <div className={styles.containerLoginbtn}>
              <ul id={styles["hidden_signfire"]}>
                <li>
                  <button type="button" onClick={handleGoogleLogin}>
                    {" "}
                    {/* Acción cuando se le da clic */}
                    <div className={styles.btnDiv}>
                      <img
                        className={styles.btnImage}
                        src={googleIcon}
                        alt=""
                      />
                      <span className={styles.btnText}>
                        Iniciar sesión con Google
                      </span>
                    </div>
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleFacebookLogin}>
                    <div className={styles.btnDiv}>
                      <img className={styles.btnImage} src={facebIcon} alt="" />
                      <span className={styles.btnText}>
                        Iniciar sesión con Facebook
                      </span>
                    </div>
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleTwitterLogin}>
                    <div className={styles.btnDiv}>
                      <img
                        className={styles.btnImage}
                        src={twitterIcon}
                        alt=""
                      />
                      <span className={styles.btnText}>
                        Iniciar sesión con Twitter
                      </span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <h1>Inicia sesión</h1>
          <p id={styles["titles"]}>Ingresa tu correo y contraseña</p>
          <div className={styles.formDiv}>
            <div className={styles.form_Div}>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label id={styles["titles"]} htmlFor="email">
                    Correo electrónico
                  </label>
                  <br />
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={values.email}
                    onChange={handleOnChange}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label id={styles["titles"]} htmlFor="password">
                    Contraseña
                  </label>
                  <br />
                  <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="contraseña"
                    value={values.password}
                    onChange={handleOnChange}
                  />
                </div>

                <div className={styles.btnSubmit}>
                  <button
                    type="submit"
                    className={styles.login}
                    onClick={handleSubmit}
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
            <div id={styles["lowerzone"]} className={styles.registration}>
              <h5>¿No estas registrado?</h5>
              <Link to="/register_pacient">
                <h5 className={styles.pacient}>Regístrate como Paciente</h5>
              </Link>
              <h5 className={styles.letter}>o</h5>
              <Link to="/register_especialist">
                <h5 className={styles.specialist}>
                  Regístrate como Especialista
                </h5>
              </Link>
              <Link to="/forgotten_password">
                <h5 className={styles.password}>Olvidé mi contraseña</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
