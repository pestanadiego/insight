import styles from "./RegisterForm.module.css";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../utils/firebaseConfig";
import googleIcon from "../../icons/Google_Icon.svg";
import facebIcon from "../../icons/cib_facebook.svg";
import twitterIcon from "../../icons/twitter_icon.svg";
import {
  googleProvider,
  facebookProvider,
  twitterProvider,
} from "../../utils/firebaseConfig";

function RegisterForm() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const { createUser } = useContext(UserContext);

  // Para almacenar los valores del input (c/u de los nuevos renders)
  const [values, setValues] = useState({
    name: "",
    email: "",
    date: "",
    password: "",
  });

  // Registro con Google
  const handleGoogleLogin = async () => {
    try {
      const response = await auth.signInWithPopup(googleProvider); // Se le envía el proveedor de Google
      setUser({
        name: response.user.displayName,
        email: response.user.email,
      });
      // Para que se almacene en la base de datos y no sólo en el módulo de autenticación
      const user_email = await response.user.email;
      if (!user_email) {
        await createUser(
          {
            name: response.user.displayName,
            email: response.user.email,
            date: "",
            role: "pacient",
            uid: response.user.uid,
          },
          response.user.uid
        );
        history.push("/profile");
      } else {
        history.push("/profile");
      }
    } catch (error) {
      alert("Se ha producido un error por favor inténtelo más tarde.");
    }
  };


  //Inicio de sesion con Facebook
  const handleFacebookLogin = async () => {
    try{
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
          date: "",
          role: "pacient",
          uid: response.user.uid,
        },
        response.user.uid
      );
      history.push("/profile");
    } catch(error) {
      alert("Se ha producido un error por favor inténtelo más tarde.");
    }
  };

  //Inicio de sesion con Twitter
  const handleTwitterLogin = async () => {
    try {
      const response = await auth.signInWithPopup(twitterProvider); //Se le envia al proveedor de Twitter
      setUser({
        name: response.user.displayName,
        email: response.user.email,
      });
      console.log(response.user.displayName);
      console.log(response.user.email);
      console.log(response.user.uid);
      // Para que se almacene en la base de datos y no sólo en el módulo de autenticación
      await createUser(
        {
          name: response.user.displayName,
          email: "example@email.com",
          date: "",
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

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target; // Se está escribiendo en n input, n value
    setValues({ ...values, [inputName]: value }); // Copia de los estados anteriores. Se le coloca a n input, n value
  };

  // Función del submit del botón
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      // Para que se almacene en la base de datos y no sólo en el módulo de autenticación
      await createUser(
        {
          name: values.name,
          email: values.email,
          date: values.date,
          role: "pacient",
          uid: response.user.uid,
        },
        response.user.uid // Se saca de response el uid
      );
      history.push("/profile"); // Devuelve al home
    } catch (error) {
      alert("Se ha producido un error por favor inténtelo más tarde.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.register}>
          <h1>
            Registro <span className={styles.tituloPaciente}>paciente</span>
          </h1>
          <div className={styles.formDiv}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Nombre y apellido</label>
                <br />
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleOnChange} // Evento que "escucha" cada vez que el input cambia
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Correo electrónico</label>
                <br />
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={handleOnChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="date">Fecha de nacimiento</label>
                <br />
                <input
                  name="date"
                  id="date"
                  type="date"
                  value={values.date}
                  onChange={handleOnChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Contraseña</label>
                <br />
                <input
                  name="password"
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={handleOnChange}
                />
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  name="conditions"
                  id="conditions"
                  type="checkbox"
                  value={values.password}
                  onChange={handleOnChange}
                  required
                />
                <label htmlFor="conditions">
                  Acepto los términos y condiciones
                </label>
              </div>
              <div className={styles.btn_div}>
                <button type="submit" onClick={handleSubmit}>
                  Confirmar
                </button>
              </div>
            </form>
          </div>
          <div className={styles.alternatives_div}>
            <p>O regístrate a través de: </p>
            <div className={styles.containerAlternatives}>
              <div className={styles.alternative} onClick={handleGoogleLogin}>
                <img src={googleIcon} alt="" />
              </div>
              <div className={styles.alternative} onClick={handleFacebookLogin}>
                <img src={facebIcon} alt="" />
              </div>
              <div className={styles.alternative} onClick={handleTwitterLogin}>
                <img src={twitterIcon} alt="" />
              </div>
            </div>
            <p className={styles.question}>
              ¿Ya estás registrado? <br />
              <a href="/login">Inicia sesión</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
