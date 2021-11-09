import styles from './RegisterEspecialistForm.module.css';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { auth, storage } from '../../utils/firebaseConfig';

function RegisterEspecialistForm() {
  const history = useHistory();
  const { createUser } = useContext(UserContext);
  const [file, setFile] = useState();
  // Para almacenar los valores del input (c/u de los nuevos renders)
  const [values, setValues] = useState({
    name: '',
    email: '',
    date: '',
    credentials: '',
    password: '',
  });

  const uploadFile = (file) => {
    const uploadTask = storage.ref(`credentials/${file.name}`).put(file);
    uploadTask.on('state_changed', 
    (snapshot) => {
      //
    }, 
    (error) => console.log(error),
    () => {
      storage
        .ref('credentials')
        .child(file.name)
        .getDownloadURL().
        then((url) => {
        console.log(url);
        values.credentials = url;
        });
      }
    );
  }

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target; // Se está escribiendo en n input, n value
    setValues({ ...values, [inputName]: value }); // Copia de los estados anteriores. Se le coloca a n input, n value
  };

  const handlePick = (event) => {
    let pickedFile;
    if(event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  }

  // Función del submit del botón
  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadFile(file);
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
        credentials: values.credentials,
        role: 'pending',
      },
      response.user.uid // Se saca de response el uid
    );
    history.push('/'); // Devuelve al home

    console.log(response.user.uid);
  };

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <h1>Registro especialista</h1>
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
            <label htmlFor="credentials">Cargar credenciales</label>
            <input
              name="credentials"
              id="credentials"
              type="file"
              onChange={handlePick}
              //multiple="multiple"
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
      </div>
    </div>
  );
}

export default RegisterEspecialistForm;
