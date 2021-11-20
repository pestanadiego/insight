import styles from "./HomeEspecialistCard.module.css";

function EspecialistCard({ name, email, phone }) {
  return (
    <>
      <div className={styles.specialistCard}>
        <p>{name}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <p>Especialista en: Traumas de pareja</p>
      </div>
    </>
  );
}

export default EspecialistCard;
