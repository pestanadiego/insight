import styles from "./SpecialistDetails.module.css";
import {useHistory} from "react-router-dom";
import { db } from '../../utils/firebaseConfig';


function SpecialistDetails({specialist}){
    
    console.log(specialist);
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

    return(
        <div className={styles.container}>
            <div className={styles.section}>
                <h2>{specialist.name}</h2>
                <p><span>Especialidad: </span>{handleSpecialities(specialist.speciality)}</p>
                <p><span>Rating: </span>{specialist.ratings}</p>
                <p><span>Correo electrónico: </span>{specialist.email}</p>
            </div>
        </div>
    );
}

export default SpecialistDetails;