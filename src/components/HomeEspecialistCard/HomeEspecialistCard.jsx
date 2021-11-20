import { Link } from "react-router-dom";

import styles from "./HomeEspecialistCard.module.css";

function EspecialistCard({ name, email, phone }) {
  return (
    <>
      <div className={styles.specialistCard}>
        <p>{name}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <p>Especialista en: Traumas de pareja</p>
        <Link to="/register_pacient">
          <button type="button">HACER CITA</button>
        </Link>
      </div>
    </>
  );
}

export default EspecialistCard;
