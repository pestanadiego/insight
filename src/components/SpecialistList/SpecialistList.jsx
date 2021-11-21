import SpecialistCard from '../SpecialistCard/SpecialistCard';
import styles from './SpecialistList.module.css';

function SpecialistList({ specialists }) {

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
            <div className={styles.list}>
            {specialists?.map((specialist) => (
                <SpecialistCard
                    key={specialist.id}
                    id={specialist.id}
                    name={specialist.name}
                    speciality={handleSpecialities(specialist.speciality)}
                    email={specialist.email}
                    feedback={specialist.ratings}
                />
            ))}
        </div>
    );
}


export default SpecialistList;