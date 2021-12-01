import styles from "./SpecialistDetails.module.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useHistory, Link } from "react-router-dom";
import { db } from "../../utils/firebaseConfig";

function SpecialistDetails({ specialist }) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [rating, setRating] = useState(false);

  useEffect(() => {
    // Se ven los chats que tiene el usuario
    const chatUsersRef = db.collection("chats");
    chatUsersRef.where('id', 'in', user.chats).get().then((snapshot) => {
        let chats = [];
        snapshot.docs.forEach((doc) => {
            chats.push(doc.data());
        })
        for (let i = 0; i < chats.length; i++) {
          const chat = chats[i];
          if(chat.status === "finished") {
            if(chat.specialistName === specialist.name) {
              setRating(true);
            }
          }
        }
    });
    // Se ve si uno de los chats ya fue finalizado
    }, []);

  // Promedio rating
  const average = (rating) => {
    let sum = 0;
    if(rating.length === 0) {
      return 'No hay rating';
    } else {
      for (let i = 0; i < rating.length; i++) {
        const element = rating[i];
        sum += parseInt(element);
      }
        const final = sum / rating.length;
        return final;
    }
  }

  //Para concatenar las especialidades
  function handleSpecialities(array) {
    let string = "";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      string += element;
      string += ". ";
    }
    return string;
  }

  function handleHours(workHours) {
    let hours = "";
    let hoursfixed = "";
    for (let index = 0; index < workHours.length; index++) {
      const element = workHours[index];
      hours += element;
      hours += "-";
    }
    for (let j = 0; j < hours.length - 1; j++) {
      const element = hours[j];
      hoursfixed += element;
    }
    return hoursfixed;
  }

  const handleBack = async (e) => {
    history.push("/search");
  };

  const giveFeedback = (rating) => {
    
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsSection}>
        <h2 className={styles.specialistName}>{specialist.name}</h2>
        <p className={styles.detailsInfo}>
          <span className={styles.detail}>Especialidad: </span>
          {handleSpecialities(specialist.speciality)}
        </p>
        <p className={styles.detailsInfo}>
          <span className={styles.detail}>Rating: </span>
          {average(specialist.rating)}
        </p>
        <p className={styles.detailsInfo}>
          <span className={styles.detail}>Descripcion: </span>
          {specialist.description}
        </p>
        <p className={styles.detailsInfo}>
          <span className={styles.detail}>Correo electrónico: </span>
          {specialist.email}
        </p>
        <p className={styles.detailsInfo}>
          <span className={styles.detail}>Horas de trabajo: </span>
          {handleHours(specialist.hours)}
        </p>
        <p className={styles.detailsInfo}>
          <span className={styles.detail}>Tarifa: </span>$ {specialist.payment}
        </p>
        <p className={styles.detailsInfo}>
          <span className={styles.detail}>Credenciales: </span>
          {specialist.credentials.map((credential) => (
            <a key={credential} href={credential} target="_blank">
              Link
            </a>
          ))}
        </p>
        <div className={styles.detailsButtons}>
          <button type="button" className={styles.back} onClick={handleBack}>
            Regresar
          </button>
          <Link to={`/schedule_appointment/${specialist.id}`}>
            <button type="button" className={styles.appointment}>
              Agendar cita
            </button>
          </Link>
          {(rating) && (
            <button type="button" className={styles.ratingBtn} onClick={giveFeedback}>
               Rating
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpecialistDetails;
