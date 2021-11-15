import styles from './PendingCard.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { db } from '../../utils/firebaseConfig';

function PendingCard({ id, name, email, date, credentials}) {
    const { getUserPending } = useContext(UserContext);

    // Si se acepta el usuario, se elimina de la colección de pending y se agrega 
    // a la colección de users y specialist
    const handleValidation = async () => {
        const pendingProfile = await getUserPending(email);
        pendingProfile.role = 'specialist';
        await db.collection('specialists').doc(pendingProfile.uid).set(pendingProfile);
        await db.collection('users').doc(pendingProfile.uid).set(pendingProfile);
        await db.collection('pendings').doc(pendingProfile.uid).delete();
    }

    // Si se rechaza el usuario, se agrega a la colección no valids.
    const handleRejection = async () => {
        const pendingProfile = await getUserPending(email);
        await db.collection('novalids').doc(pendingProfile.uid).set(pendingProfile);
    }
    return (
      <div className={styles.card}>
          <div className={styles.info}>
            <p><span>Nombre:</span> {name}</p>
            <p><span>ID:</span> {id}</p>
            <p><span>Correo electrónico:</span> {email}</p>
            <p><span>Fecha de nacimiento:</span> {date}</p>
            <p><span>Credenciales: </span>
            {credentials.map((credential) => (
              <a key={credential} href={credential} target="_blank">Link</a>))  
            }
            </p>
          </div>
          <div className={styles.buttons}>
            <button className={styles.validate} type="button" onClick={handleValidation}>Validar</button>
            <button className={styles.novalidate} type="button" onClick={handleRejection}>Eliminar</button>
          </div>
      </div>
    );
  }
  
  export default PendingCard;