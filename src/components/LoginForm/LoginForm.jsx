import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { auth, googleProvider, facebookProvider } from '../../utils/firebaseConfig';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';
import googleIcon from "../../icons/Google_Icon.svg";
import facebIcon from "../../icons/cib_facebook.svg";
import twitterIcon from "../../icons/twitter_icon.svg";

function LoginForm() {
  const { getUserByEmail, setUser } = useContext(UserContext); // Lo que nos permite cambiar el estado
  const history = useHistory(); // Se utiliza para redirigir al usuario
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    setValues({ ...values, [inputName]: value });
  };

  // Inicio de sesión con Google
  const handleGoogleLogin = async () => {
    const response = await auth.signInWithPopup(googleProvider); // Se le envía el proveedor de Google
    setUser({
      name: response.user.displayName,
      email: response.user.email
    });
    history.push('/profile');
  };

  //Inicio de sesion con Facebook
  const handleFacebookLogin = async () => {
    await auth.signInWithPopup(facebookProvider);  //Se le envia al proveedor de Facebook
    history.push('/');
  };

  //TODO INICIO DE SESION CON TWITTER

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loggedUser;
    await auth.signInWithEmailAndPassword(values.email, values.password);
    loggedUser = await getUserByEmail(values.email);
    if(loggedUser.role === "admin") {
      history.push('/admin');
    } else {
      history.push('/');
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.section_alternatives}>
            <div className={styles.containerLoginbtn}>
              <ul>
                 {/* Acción cuando se le da clic */}
                <li><button type="button" onClick={handleGoogleLogin}><div className={styles.btnDiv}><img className={styles.btnImage} src={googleIcon} alt=""/>
                 <span className={styles.btnText}>Iniciar Sesión con Google</span></div></button></li>

                 {/* Acción cuando se le da clic */}
                <li><button type="button" onClick={handleFacebookLogin}><div className={styles.btnDiv}><img className={styles.btnImage} src={facebIcon} alt=""/>
                 <span className={styles.btnText}>Iniciar Sesión con Facebook</span></div></button></li>

                 {/* Acción cuando se le da clic */}
                <li><button type="button" onClick={handleGoogleLogin}><div className={styles.btnDiv}><img className={styles.btnImage} src={twitterIcon} alt=""/>
                 <span className={styles.btnText}>Iniciar Sesión con Twitter</span></div></button></li>
              </ul>
            </div>
          </div>
          <h1>Inicia Sesión</h1>
          <div className={styles.formDiv}>
            <div className={styles.form_Div}>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Ingrese su correo electrónico</label><br/>
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
                  <label htmlFor="password">Ingrese su contraseña</label><br/>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="contraseña"
                    value={values.password}
                    onChange={handleOnChange}
                  />
                </div>

              <div className={styles.btnSubmit}><button type="submit" className={styles.login} onClick={handleSubmit}>
                Iniciar Sesión
              </button></div>
            </form>
          </div>
          <div className={styles.registration}>
            <h5>¿No estas registrado?</h5>
            <Link to="/register_pacient"><h5 className={styles.pacient}>Regístrate como Paciente</h5></Link><h5 className={styles.letter}>o</h5>
            <Link to="/register_especialist"><h5 className={styles.specialist}>Regístrate como Especialista</h5></Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
export default LoginForm;
