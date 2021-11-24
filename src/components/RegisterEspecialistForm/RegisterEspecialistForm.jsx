import styles from "./RegisterEspecialistForm.module.css";
import { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { auth, storage } from "../../utils/firebaseConfig";

function RegisterEspecialistForm() {
  const history = useHistory();
  const { createUser } = useContext(UserContext);
  const [files, setFiles] = useState();
  // Para almacenar los valores del input (c/u de los nuevos renders)
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Esta función se encarga de subir los archivos al storage y guardar la dirección
  // de esos archivos en la base de datos.
  const uploadFile = async (file) => {
    try {
      const uploadTask = storage.ref(`credentials/${file.name}`).put(file);
      const fileUrl = storage
        .ref("credentials")
        .child(file.name)
        .getDownloadURL();
      return fileUrl;
    } catch (error) {
      alert("Se ha producido un error por favor inténtelo más tarde.");
    }
  };

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target; // Se está escribiendo en n input, n value
    setValues({ ...values, [inputName]: value }); // Copia de los estados anteriores. Se le coloca a n input, n value
  };

  // Función que maneja los archivos subidos por el usuario
  const handlePick = (event) => {
    try {
      let pickedFile;
      let allFiles = [];
      if (event.target.files) {
        for (let i = 0; i < event.target.files.length; i++) {
          pickedFile = event.target.files[i];
          allFiles.push(pickedFile);
          console.log(pickedFile);
        }
        setFiles(allFiles);
      }
    } catch (error) {
      alert("Se ha producido un error por favor inténtelo más tarde.");
    }
  };

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
    // Para que se almacene en la base de datos y no sólo en el módulo de autenticación.
    await createUser(
      {
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: "pending",
        uid: response.user.uid,
        credentials: credentialsArray,
      },
      response.user.uid
    );
    history.push("/under_review"); // Envia a Pagina de review
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.register}>
          <h1>Registro especialista</h1>
          <div className={styles.form_div}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label id={styles["titulosEspecialista"]} htmlFor="name">
                  Nombre y apellido
                </label>
                <br />
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleOnChange} // Evento que "escucha" cada vez que el input cambia (Observer)
                />
              </div>

              <div className={styles.inputGroup}>
                <label id={styles["titulosEspecialista"]} htmlFor="email">
                  Correo electrónico
                </label>
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
                <label id={styles["titulosEspecialista"]} htmlFor="date">
                  Número telefónico
                </label>
                <br />
                <input
                  name="phone"
                  id="phone"
                  type="tel"
                  value={values.phone}
                  onChange={handleOnChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label id={styles["titulosEspecialista"]} htmlFor="password">
                  Contraseña
                </label>
                <br />
                <input
                  name="password"
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={handleOnChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label id={styles["titulosEspecialista"]} htmlFor="credentials">
                  Cargar credenciales
                </label>
                <br />
                <input
                  name="credentials"
                  id="credentials"
                  type="file"
                  onChange={handlePick}
                  multiple="multiple"
                  required
                />
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  name="oldenough"
                  id="oldenough"
                  type="checkbox"
                  required
                />
                <label id={styles["titulosEspecialista"]} htmlFor="conditions">
                  Confirmo que tengo más de 18 años
                </label>
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  name="conditions"
                  id="conditions"
                  type="checkbox"
                  required
                />
                <label id={styles["titulosEspecialista"]} htmlFor="conditions">
                  Acepto los términos y condiciones
                </label>
              </div>

              <div className={styles.btnDiv}>
                <button type="submit" onClick={handleSubmit}>
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterEspecialistForm;
