import styles from './RegisterForm.module.css';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { auth } from '../../utils/firebaseConfig';

function RegisterForm() {
  const history = useHistory();
  const { createUser } = useContext(UserContext);

  // Para almacenar los valores del input (c/u de los nuevos renders)
  const [values, setValues] = useState({
    name: '',
    email: '',
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
        role: 'admin',
      },
      response.user.uid // Se saca de response el uid
    );
    history.push('/'); // Devuelve al home

    console.log(response.user.uid);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Enter your name</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={values.name}
            onChange={handleOnChange} // Evento que "escucha" cada vez que el input cambia
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Enter your email</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleOnChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Enter your password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleOnChange}
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Send
        </button>
      </form>
      <button type="button" onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
}

export default RegisterForm;
