import styles from "./HomeEspecialistCard.module.css";
import pictures from "../../images/imagenes";

function EspecialistCard({ name, email, phone }) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cont}>
          <img src={pictures.perfil} alt="card-perfil" />
        </div>

        <p>{name}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <p>Especialista en: Traumas de pareja</p>
      </div>
    </>
  );
}

export default EspecialistCard;
