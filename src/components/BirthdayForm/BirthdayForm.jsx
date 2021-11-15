import styles from './BirthdayForm.module.css';
import { auth } from '../../utils/firebaseConfig';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';

function BirthdayForm(username, userEmail, uid) {
    const {createUser } = useContext(UserContext); // Lo que nos permite cambiar el estado
  const history = useHistory(); // Se utiliza para redirigir al usuario
  const [values, setValues] = useState( {date: ''} );

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await createUser(
        {
          name: {username},
          email: {userEmail},
          date: values.date,
          role: 'pacient',
          uid: {uid},
        },{uid});
        history.push('/profile');
      } catch {
          alert('No se pudo completar su usuario, intentelo mas tarde')
          history.push('/');
      }
  };

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    setValues({ ...values, [inputName]: value });
  };

  return (
    <div className={styles.pagePassword}>
        <div className={styles.sectionPassword}>
            <p className={styles.titlePassword}>Por favor complete sus datos</p>
            <p className={styles.messagePassword}>complete los siguientes espacios</p>
            <form onSubmit={handleSubmit}>
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
                <div className={styles.btnContainerPassword}>
                    <button type="submit" className={styles.emailBtnPassword} onClick={handleSubmit}>
                        Enviar un email
                    </button>
                </div>
            </form>
        </div>
    </div>
  );

}

export default BirthdayForm;