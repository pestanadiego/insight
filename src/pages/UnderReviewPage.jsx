//Pagina de redireccionamiento al registrarse como especialista
import styles from "./UnderReviewPage.module.css";
import { useHistory } from 'react-router-dom';

function UnderReviewPage() {
    const history = useHistory();

    const handleClick = () => {
        history.push('/');
    }

    return (
        <>
        <div className={styles.page}>
          <div className={styles.underReviewContainer}>
              <h2 className={styles.underReviewTitle}>Hemos recibido tu información de registro</h2>
              <h2 className={styles.underReviewMessage}>¡Te notificaremos por correo lo antes posible!</h2>
              <button type='submit' className={styles.underReviewBtn} onClick={handleClick}>Volver</button>
          </div>
        </div>
        </>
    );
};

export default UnderReviewPage;