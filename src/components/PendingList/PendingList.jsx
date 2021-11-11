import PendingCard from '../PendingCard/PendingCard';
import styles from './PendingList.module.css';

function PendingList({ pendingUsers }) {
    return(
        <div className={styles.list}>
            {pendingUsers.map((pendingUser) => (
                <PendingCard
                    id={pendingUser.id}
                    email={pendingUser.email}
                    name={pendingUser.name}
                    date={pendingUser.date}
                    credentials={pendingUser.credentials}
                />
            ))}
        </div>
    );
}


export default PendingList;