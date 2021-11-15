import styles from './PasswordForm.module.css';
import { auth } from '../../utils/firebaseConfig';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';

function PasswordForm() {
  const { getUserByEmail, getUserPending, setUser, createUser } = useContext(UserContext); // Lo que nos permite cambiar el estado
  const history = useHistory(); // Se utiliza para redirigir al usuario
  const [values, setValues] = useState( {email: ''} );

  const passwordReset = async (email) => {
      return auth.sendPasswordResetEmail(email);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await passwordReset(values.email);
      } catch {
          alert('No se pudo reestablecer la contraseña. Verifique que usted es un usuario registrado.')
          setValues({email: ''});
      }
  };

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    setValues({ ...values, [inputName]: value });
  };

  return (
    <div className={styles.page}>
        <div className={styles.section}>
            <p className={styles.title}>Reestablezca su contraseña</p>
            <p className={styles.message}>Le enviaremos un correo electrónico con más instrucciones sobre cómo reestablecer su contraseña.</p>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                      <label htmlFor="email">Correo electrónico</label>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={values.email}
                        onChange={handleOnChange}
                      />
                </div>
                <div className={styles.btnContainer}>
                    <button type="submit" className={styles.emailBtn} onClick={handleSubmit}>
                        Enviar un email
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}
export default PasswordForm;