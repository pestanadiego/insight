import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { auth, googleProvider, facebookProvider } from '../../utils/firebaseConfig';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';
import googleIcon from '../../icons/Google_Icon.svg'
import facebIcon from "../../icons/cib_facebook.svg"
import twitterIcon from "../../icons/twitter_icon.svg"

function LoginForm() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };

  // Inicio de sesión con Google
  const handleGoogleLogin = async () => {
    await auth.signInWithPopup(googleProvider);
    history.push('/');
  };

  //Inicio de sesion con Facebook
  const handleFacebookLogin = async () => {
    await auth.signInWithPopup(facebookProvider);
    history.push('/');
  };

  //TODO INICIO DE SESION CON TWITTER

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.signInWithEmailAndPassword(values.email, values.password);
    history.push('/');
  };

  return (
    <div className={styles.section}>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <ul>

          <li>
            <div className={styles.btnimage}><img src={googleIcon} alt=""/></div>
            <div className={styles.btnlogin}><button type="button" onClick={handleGoogleLogin}>
             <span>Iniciar Sesión con Google</span></button></div></li>

          <li>
            <div className={styles.btnimage}><img src={facebIcon} alt=""/></div>
            <div className={styles.btnlogin}><button type="button" onClick={handleFacebookLogin}>
             <span>Iniciar Sesión con Facebook</span>
          </button></div></li>

          <li>
            <div className={styles.btnimage}><img src={twitterIcon} alt=""/></div>
            <div className={styles.btnlogin}><button type="button" onClick={handleFacebookLogin}>
             <span>Iniciar Sesión con Twitter</span></button></div>
          </li>
          </ul>
          <h1>Inicia Sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Ingrese su correo electrónico</label>
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
              <label htmlFor="password">Ingrese su contraseña</label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="contraseña"
                value={values.password}
                onChange={handleOnChange}
              />
            </div>

            <button type="submit" className={styles.login} onClick={handleSubmit}>
              Iniciar Sesión
            </button>
          </form>
          <div className={styles.registration}>
            <h5>¿No estas registrado?</h5>
            <br/>
            <Link to="/register"><h5 className={styles.pacient}>Regístrate como Paciente</h5></Link><h5 className={styles.letter}>o</h5>
            <Link to="/register"><h5 className={styles.specialist}>Regístrate como Especialista</h5></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
