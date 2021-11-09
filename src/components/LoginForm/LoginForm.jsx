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
  const { setUser } = useContext(UserContext); // Lo que nos permite cambiar el estado
  const history = useHistory(); // Se utiliza para redirigir al usuario
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
    const response = await auth.signInWithPopup(googleProvider); // Se le envía el proveedor de Google
    setUser({
      name: response.user.displayName,
      email: response.user.email
    });
    history.push('/');
  };

  //Inicio de sesion con Facebook
  const handleFacebookLogin = async () => {
    await auth.signInWithPopup(facebookProvider);  //Se le envia al proveedor de Facebook
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
          <li><button type="button" onClick={handleGoogleLogin}> {/* Acción cuando se le da clic */}
            <img src={googleIcon} alt=""/> <span>Iniciar Sesión con Google</span>
          </button></li>
          <li><button type="button" onClick={handleFacebookLogin}> {/* Acción cuando se le da clic */}
            <img src={facebIcon} alt=""/> <span>Iniciar Sesión con Facebook</span>
          </button></li>
          <li><button type="button" onClick={handleFacebookLogin}> {/* Acción cuando se le da clic */}
            <img src={twitterIcon} alt=""/> <span>Iniciar Sesión con Twitter</span>
          </button></li>
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
            <Link to="/register"><h5 className={styles.pacient}>Regístrate como Paciente</h5></Link><h5>o</h5>
            <Link to="/register"><h5 className={styles.specialist}>Regístrate como Especialista</h5></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
