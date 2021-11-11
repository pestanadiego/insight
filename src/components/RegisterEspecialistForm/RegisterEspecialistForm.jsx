import styles from './RegisterEspecialistForm.module.css';
import { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { auth, storage } from '../../utils/firebaseConfig';

function RegisterEspecialistForm() {
  const history = useHistory();
  const { createUser } = useContext(UserContext);
  const [files, setFiles] = useState();
  // Para almacenar los valores del input (c/u de los nuevos renders)
  const [values, setValues] = useState({
    name: '',
    email: '',
    date: '',
    password: ''
  });

  // Esta función se encarga de subir los archivos al storage y guardar la dirección
  // de esos archivos en la base de datos. 
  const uploadFile = async (file) => {
    const uploadTask = storage.ref(`credentials/${file.name}`).put(file);
    const fileUrl = storage.ref('credentials').child(file.name).getDownloadURL();
    return(fileUrl);
  }

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target; // Se está escribiendo en n input, n value
    setValues({ ...values, [inputName]: value }); // Copia de los estados anteriores. Se le coloca a n input, n value
  };

  // Función que maneja los archivos subidos por el usuario
  const handlePick = (event) => {
    let pickedFile;
    let allFiles = [];
    if(event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        pickedFile = event.target.files[i];
        allFiles.push(pickedFile);
      }
      setFiles(allFiles);
    }
  }

  // Función del submit del botón
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Se sube al storage cada archivo
    let file;
    let fileUrl;
    let credentialsArray = [];
    for (let i = 0; i < files.length; i++) {
      file = files[i];
      fileUrl = await uploadFile(file);
      credentialsArray.push(fileUrl);
    }

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
        role: 'pending',
        uid: response.user.uid,
        credentials: credentialsArray
      },
      response.user.uid
    );
    history.push('/under_review'); // Envia a Pagina de review

  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.register}>
          <h1>Registro especialista</h1>
          <div className={styles.form_div}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Nombre y apellido</label><br/>
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleOnChange} // Evento que "escucha" cada vez que el input cambia
                />
              </div>
    
              <div className={styles.inputGroup}>
                <label htmlFor="email">Correo electrónico</label><br/>
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={handleOnChange}
                />
              </div>
    
              <div className={styles.inputGroup}>
                <label htmlFor="date">Fecha de nacimiento</label><br/>
                <input
                  name="date"
                  id="date"
                  type="date"
                  value={values.date}
                  onChange={handleOnChange}
                />
              </div>
    
              <div className={styles.inputGroup}>
                <label htmlFor="password">Contraseña</label><br/>
                <input
                  name="password"
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={handleOnChange}
                />
              </div>
    
              <div className={styles.inputGroup}>
                <label htmlFor="credentials">Cargar credenciales</label><br/>
                <input
                  name="credentials"
                  id="credentials"
                  type="file"
                  onChange={handlePick}
                  multiple="multiple"
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
                <label htmlFor="conditions">Acepto los términos y condiciones</label>
              </div>
    
              <div className={styles.btnDiv}><button type="submit" onClick={handleSubmit}>
                Confirmar
              </button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterEspecialistForm;
