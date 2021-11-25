import styles from "./SpecialistCard.module.css";
import { useHistory, Link } from "react-router-dom";
//import { useContext } from 'react';

function SpecialistCard({ key, id, name, speciality, email, feedback }) {
  return (
    <div className={styles.specialistCard}>
      <div className={styles.specialistInfo}>
        <p>
          <span>Nombre: </span>
          {name}
        </p>
        <p>
          <span>Especialidad: </span>
          {speciality}
        </p>
        <p>
          <span>Rating: </span>
          {feedback}
        </p>
        <p>
          <span>Correo electrónico: </span>
          {email}
        </p>
      </div>
      <div className={styles.specialistButtons}>
        <Link to={`/specialists/${id}`}>
          {" "}
          <button type="button" className={styles.detailsbtn}>
            Ver Especialista
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SpecialistCard;
