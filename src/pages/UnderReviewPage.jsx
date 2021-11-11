//Pagina de redireccionamiento al registrarse como especialista
import styles from "./UnderReviewPage.module.css";
import { useHistory } from 'react-router-dom';
import checkmarkIcon from "../icons/checkmark_under_review.svg";

function UnderReviewPage() {
    const history = useHistory();

    const handleClick = () => {
        history.push('/');
    }

    return (
        <>
        <div className={styles.page}>
          <div className={styles.underReviewContainer}>
              <img className={styles.checkmark} src={checkmarkIcon} alt=""/>
              <h2 className={styles.underReviewTitle}>Hemos recibido tu información de registro</h2>
              <p className={styles.underReviewMessage}>¡Te notificaremos por correo lo antes posible!</p>
              <button type='submit' className={styles.underReviewBtn} onClick={handleClick}>Volver</button>
          </div>
        </div>
        </>
    );
};

export default UnderReviewPage;