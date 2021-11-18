import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './Profile.module.css';

function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [edit, setEdit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const [values, setValues] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      description: ""
    });

    const handleProfileChanges = () => {

    };

    // Para cambiar de vista 
    const editProfile = (boolean) => {
      setEdit(boolean);
    };

    // Mostrar o no la contraseña 
    const togglePassword = () => {
      setShowPassword(!showPassword);
    }

    // Se encarga de los cambios que ocurren en los input
    const handleOnChange = (event) => {
      const { value, name: inputName } = event.target; 
      setValues({ ...values, [inputName]: value }); 
    };
  
    return (
      <div className={styles.profile}>
        <h1>Mi perfil</h1>
        {(user.role === "pacient") ? (
          <div className={styles.profileInformation}>
            {(!edit) ? (
              <>
              <div className={styles.profileInfo}>
                <p>Nombre:</p>
                <p>{user.name}</p>
              </div>
              <div className={styles.profileInfo}>
                <p>Correo electrónico:</p>
                <p>{user.email}</p>
              </div>
              <div className={styles.profileInfo}>
                <p>Número telefónico:</p>
                <p>{user.phone}</p>
              </div>
              <div className={styles.profileInfo}>
                <p>Password:</p>
                <p> </p>
              </div>
              <div className={styles.profileInfo}>
                <p>Descripción:</p>
                <p>{user.description}</p>  
              </div>
              <button type="button" onClick={() => editProfile(true)}>Modificar perfil</button>
              </>
            ) : (
              <form onSubmit={() => handleSubmit(handleProfileChanges)} className={styles.formProfile} action="submit">
                <div className={styles.inputProfile}>
                  <label htmlFor="name">Nombre:</label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder={user.name}
                    value={values.name}
                    onChange={handleOnChange}
                  />
                </div>  
                <div className={styles.inputProfile}>
                  <label htmlFor="email">Correo electrónico:</label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder={user.email}
                    value={values.email}
                    onChange={handleOnChange}
                  />
                </div>
                <div className={styles.inputProfile}>
                  <label htmlFor="phone">Número telefónico:</label>
                  <input
                    name="phone"
                    id="phone"
                    type="tel"
                    placeholder={user.phone}
                    value={values.phone}
                    onChange={handleOnChange}
                  />
                </div>
                <div className={styles.inputProfile}>
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    name="password"
                    id="password"
                    type={ showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleOnChange}
                  />
                  <input type="checkbox" onClick={togglePassword} />Ver 
                </div>
                <div className={styles.inputProfile}>
                  <label htmlFor="description">Descripción:</label>
                  <textarea name="description" placeholder={user.description} rows="10" cols="50" onChange={handleOnChange}></textarea>
                </div>
                <button type="submit" onClick={() => console.log('hey')/*handleProfileChanges() editProfile(false)*/}>Guardar cambios</button>        
              </form>
            )}
          </div>
            ) : (
          <div>
              <h1>{user.name}</h1>
              <h1>{user.email}</h1>
              <h1>{user.role}</h1>
              <h1>{user.phone}</h1>
           </div>
        )}
      </div>
    );
  }
  
  export default Profile;