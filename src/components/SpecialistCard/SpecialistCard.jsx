import styles from './SpecialistCard.module.css';
import { useHistory, Link } from "react-router-dom";
//import { useContext } from 'react';


function SpecialistCard({key, id, name, speciality, email, feedback}){
    const calcRating = (feedback) => {
        let rating = 0;
        if(feedback.length == 0) {
            return 'Sin rating';
        } else {
            for (let i = 0; i < feedback.length; i++) {
                const num = feedback[i];
                rating += parseInt(num);
            }
            const final = rating / feedback.length;
            return final;
        }
    }

    return(
        <div className={styles.specialistCard}>
            <div className={styles.specialistInfo}>
                <p><span>Nombre: </span>{name}</p>
                <p><span>Especialidad: </span>{speciality}</p>
                <p><span>Rating: </span>{calcRating(feedback)}</p>
                <p><span>Correo electrónico: </span>{email}</p>
            </div>
            <div className={styles.specialistButtons}>
                <Link to={`/specialists/${id}`}> <button type="button" className={styles.detailsbtn}>Ver Especialista</button></Link>
            </div>
        </div>
    );
}

export default SpecialistCard;