import styles from './PendingCard.module.css';

function PendingCard({ id, name, email, date, credentials}) {
    return (
      <div className={styles.card}>
          <p><span>Nombre:</span> {name}</p>
          <p><span>ID:</span> {id}</p>
          <p><span>Correo electrónico:</span> {email}</p>
          <p><span>Fecha de nacimiento:</span> {date}</p>
          <p><span>Credenciales: </span></p>
          <ul>
          {credentials.map((credential) => (
              <li>{credential}</li>
            ))  
          }
          </ul>
          <button className={styles.validate} type="button" onClick = {console.log('Validar')}>Validar</button>
          <button className={styles.novalidate} type="button" onClick = {console.log('Eliminar')}>Eliminar</button>
      </div>
    );
  }
  
  export default PendingCard;