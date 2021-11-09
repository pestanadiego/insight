import styles from './RegisterForm.module.css';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { auth } from '../../utils/firebaseConfig';
import googleIcon from "../../icons/Google_Icon.svg";
import facebIcon from "../../icons/cib_facebook.svg";
import twitterIcon from "../../icons/twitter_icon.svg";

function RegisterForm() {
  const history = useHistory();
  const { createUser } = useContext(UserContext);

  // Para almacenar los valores del input (c/u de los nuevos renders)
  const [values, setValues] = useState({
    name: '',
    email: '',
    date: '',
    password: '',
  });

  const handleGoogleLogin = async () => {
    console.log('Google login');
  };

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target; // Se está escribiendo en n input, n value
    setValues({ ...values, [inputName]: value }); // Copia de los estados anteriores. Se le coloca a n input, n value
  };

  // Función del submit del botón
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        role: 'pacient',
      },
      response.user.uid // Se saca de response el uid
    );
    history.push('/'); // Devuelve al home

    console.log(response.user.uid);
  };

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <h1>Registro paciente</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nombre y apellido</label>
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
            <input
              name="password"
              id="password"
              type="password"
              value={values.password}
              onChange={handleOnChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="conditions">Acepto los términos y condiciones</label>
            <input
              name="conditions"
              id="conditions"
              type="checkbox"
              value={values.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <button type="submit" onClick={handleSubmit}>
            Confirmar
          </button>
        </form>
        <p>O regístrate a través de: </p>
        <button type="button" onClick={handleGoogleLogin}>
          <img src={googleIcon} alt=""/>
        </button>
        <button type="button" onClick={handleGoogleLogin}>
          <img src={facebIcon} alt=""/> 
        </button>
        <button type="button" onClick={handleGoogleLogin}>
          <img src={twitterIcon} alt=""/>
        </button>
        <p>¿Ya estás registrado? <a href="/login">Inicia sesión</a></p>
      </div>
    </div>
  );
}

export default RegisterForm;
