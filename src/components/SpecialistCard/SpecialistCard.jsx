import styles from './SpecialistCard.module.css';
//import { useContext } from 'react';

//<img src={img} alt="" className={styles.cardImg}></img>
//<p><span>Valoraciones</span>{feedback}</p>

function SpecialistCard({name, speciality, email}){

    return(
        <div className={styles.card}>
            <div className={styles.info}>
                <p><span>Nombre: </span>{name}</p>
                <p><span>Especialidad: </span>{speciality}</p>
                <p><span>Correo electrónico: </span>{email}</p>
            </div>
            <div className={styles.buttons}>
                <button type="button" className={styles.detailsbtn}>Ver Especialista</button>
            </div>
        </div>
    );
}

export default SpecialistCard;