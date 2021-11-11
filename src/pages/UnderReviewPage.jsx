//Pagina de redireccionamiento al registrarse como especialista
import styles from "./UnderReviewPage.module.css";

function UnderReviewPage() {
    return (
        <>
        <div className={styles.underReviewContainer}>
            <h2 className={styles.underReviewTitle}>Hemos recibido tu información de registro</h2>
            <br/>
            <h2 className={styles.underReviewMessage}>¡Te notificaremos por correo lo antes posible!</h2>
            <br/>
            <button type='submit' className={styles.underReviewBtn}>Volver</button>
        </div>
        </>
    );
};

export default UnderReviewPage;