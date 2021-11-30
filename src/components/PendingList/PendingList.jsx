import PendingCard from '../PendingCard/PendingCard';
import styles from './PendingList.module.css';

function PendingList({ pendingUsers }) {
    return(
        <div className={styles.list}>
            {pendingUsers.map((pendingUser) => (
                <PendingCard
                    key={pendingUser.uid}
                    id={pendingUser.uid}
                    email={pendingUser.email}
                    name={pendingUser.name}
                    phone={pendingUser.phone}
                    credentials={pendingUser.credentials}
                />
            ))}
        </div>
    );
}


export default PendingList;