import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './Profile.module.css';

function Profile() {
    const { user } = useContext(UserContext);
  
    return (
      <div className={styles.profile}>
        {(user.role === "pacient") ? (
          <div>
              <h1>{user.name}</h1>
              <h1>{user.email}</h1>
              <h1>{user.role}</h1>
              <h1>{user.phone}</h1>
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