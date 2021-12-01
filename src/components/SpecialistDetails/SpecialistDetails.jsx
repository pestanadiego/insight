import styles from "./SpecialistDetails.module.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useHistory, Link } from "react-router-dom";
import { db } from "../../utils/firebaseConfig";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function SpecialistDetails({ specialist }) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [rating, setRating] = useState(false);
  const [chatRating, setChatRating] = useState("");
  const [modal, setModal] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [rangeval, setRangeval] = useState("5");

  const giveFeedback = async () => {
    // Se almacena en la base de datos
    await db.collection("users").doc(specialist.uid).update({ rating: [...specialist.rating, rangeval] });
    await db.collection("specialists").doc(specialist.uid).update({ rating: [...specialist.rating, rangeval] });
    // Para que no aparezca más el boton
    chatRating.rated = true;
    await db.collection("chats").doc(chatRating.id).set(chatRating);
    toggleModal();
    alert(`Su rating a ${specialist.name} fue agregado. ¡Muchas gracias!`);
    history.push('/profile');
  }

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
            if(chat.specialistName === specialist.name && (!!!chat.rated)) {
              setRating(true);
              setChatRating(chat);
            }
          }
        }
    });

    db.collection("specialists").doc(specialist.uid).onSnapshot((doc) => {
      const data = doc.data();
      setRatings(data.rating);
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

  const toggleModal = () => {
    setModal(!modal);
  }

  // Para que no se pueda scrollear cuando esté abierto el pop-up
  if(modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
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
          {average(ratings)}
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
            <button type="button" className={styles.ratingBtn} onClick={toggleModal}>
               Rating
            </button>
          )}
        </div>
        {modal && (
          <Popup open={modal} closeOnDocumentClick onClose={toggleModal}>
            <div className={styles.modal}>
              <p>¿Qué puntuación le da al especialista?</p>
              <input type="range" min="0" max="5" step="0.5" onChange={(event) => setRangeval(event.target.value)}/>
              <p>{rangeval}</p>
            </div>
            <button type="button" onClick={giveFeedback}>
              Feedback
            </button>
          </Popup>
        )}
      </div>
    </div>
  );
}

export default SpecialistDetails;
