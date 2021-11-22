import styles from "./SpecialistDetails.module.css";
import {useHistory, Link} from "react-router-dom";
import { db } from '../../utils/firebaseConfig';


function SpecialistDetails({specialist}){
    const history = useHistory();
   
    //Para concatenar las especialidades
    function handleSpecialities(array){
        let string = "";
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            string += element;
            string += (". ");
        }
        return string;
    }

    function handleHours(workHours){
        let hours ="";
        let hoursfixed="";
        for (let index = 0; index < workHours.length; index++) {
            const element = workHours[index];
            hours+= element;
            hours+="-";
        }
        for (let j = 0; j < hours.length-1; j++) {
            const element = hours[j];
            hoursfixed+= element;
        }
        return hoursfixed;
    }

    const handleBack =async (e)=>{
        history.push("/search");
    }


    return(
        <div className={styles.detailsContainer}>
            <div className={styles.detailsSection}>
                <h2 className={styles.specialistName}>{specialist.name}</h2>
                <p className={styles.detailsInfo}><span className={styles.detail}>Especialidad: </span>{handleSpecialities(specialist.speciality)}</p>
                <p className={styles.detailsInfo}><span className={styles.detail}>Rating: </span>{specialist.ratings}</p>
                <p className={styles.detailsInfo}><span className={styles.detail}>Descripcion: </span>{specialist.description}</p>
                <p className={styles.detailsInfo}><span className={styles.detail}>Correo electrónico: </span>{specialist.email}</p>
                <p className={styles.detailsInfo}><span className={styles.detail}>Horas de trabajo: </span>{handleHours(specialist.hours)}</p>
                <p className={styles.detailsInfo}><span className={styles.detail}>Tarifa: </span>$ {specialist.payment}</p>
                <p className={styles.detailsInfo}><span className={styles.detail}>Credenciales: </span>
                  {specialist.credentials.map((credential) => (
                    <a key={credential} href={credential} target="_blank">Link</a>))
                  }
                </p>
                <div className={styles.detailsButtons}>
                    <button type="button" className={styles.back} onClick={handleBack}>Regresar</button>
                    <Link to={`/appointments/${specialist.id}`}><button type="button" className={styles.appointment}>Agendar cita</button></Link>
                </div>
            </div>
        </div>
    );
}

export default SpecialistDetails;