import SpecialistCard from '../SpecialistCard/SpecialistCard';
import styles from './SpecialistList.module.css';

function SpecialistList({ specialists }) {
    return(
        <div className={styles.list}>
            {specialists.map((specialist) => (
                <SpecialistCard
                    key={specialist.uid}
                    name={specialist.name}
                    speciality={specialist.role}
                    email={specialist.email}
                />
            ))}
        </div>
    );
}


export default SpecialistList;