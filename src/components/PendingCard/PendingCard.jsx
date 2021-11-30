import styles from "./PendingCard.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebaseConfig";
import emailjs from "emailjs-com";

function PendingCard({ id, name, email, phone, credentials }) {
  const { getUserPending } = useContext(UserContext);

  const templateRejections = {
    title: "Usted no ha sido admitido en Insight",
    name: name,
    email: email,
    notes: "Usted no ha sido admitido como especialista.",
  };

  const templateValidations = {
    title: "Usted ha sido admitido en Insight",
    name: name,
    email: email,
    notes: "Usted ha sido admitido como especialista. ¡Felicitaciones!",
  };

  const sendStatus = (templateParams) => {
    emailjs
      .send(
        "service_rkywh23",
        "template_ob227vk",
        templateParams,
        "user_A1eEQeCvsHGleoXo5JDz3"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  // Si se acepta el usuario, se elimina de la colección de pending y se agrega
  // a la colección de users y specialist
  const handleValidation = async () => {
    const pendingProfile = await getUserPending(email);
    pendingProfile.role = "specialist";
    pendingProfile.status = "no"; // Status del especialista
    pendingProfile.appointments = [];
    pendingProfile.rating = "0";
    pendingProfile.work = [];
    pendingProfile.hours = [];
    pendingProfile.speciality = [];
    await db
      .collection("specialists")
      .doc(pendingProfile.uid)
      .set(pendingProfile);
    await db.collection("users").doc(pendingProfile.uid).set(pendingProfile);
    await db.collection("pendings").doc(pendingProfile.uid).delete();
    sendStatus(templateValidations);
  };

  // Si se rechaza el usuario, se agrega a la colección no valids y se elimina de pendings.
  const handleRejection = async () => {
    const pendingProfile = await getUserPending(email);
    pendingProfile.role = "pending";
    await db.collection("novalids").doc(pendingProfile.uid).set(pendingProfile);
    await db.collection("pendings").doc(pendingProfile.uid).delete();
    sendStatus(templateRejections);
    //eliminateUser(pendingProfile.uid);
  };

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <p>
          <span>Nombre:</span> {name}
        </p>
        <p>
          <span>Correo electrónico:</span> {email}
        </p>
        <p>
          <span>Número de teléfono:</span> {phone}
        </p>
        <p>
          <span>Credenciales: </span>
          {credentials.map((credential) => (
            <a key={credential} href={credential} target="_blank">
              Link
            </a>
          ))}
        </p>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.validate}
          type="button"
          onClick={handleValidation}
        >
          Validar
        </button>
        <button
          className={styles.novalidate}
          type="button"
          onClick={handleRejection}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default PendingCard;
