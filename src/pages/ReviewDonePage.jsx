import styles from "./ReviewDonePage.module.css";
import { useHistory } from 'react-router-dom';
import xIcon from "../icons/x_done_review.svg";

function ReviewDonePage() {
    const history = useHistory();

    const handleClick = () => {
        history.push('/');
    }

    return (
        <>
        <div className={styles.pageNoValid}>
          <div className={styles.noValidContainer}>
            <div className={styles.infoNoValid}>
              <div className={styles.imgContainer}>
                <img className={styles.x} src={xIcon} alt=""/>
              </div>
              <p className={styles.noValidTitle}>No ha sido admitido como especialista</p>
              <div className={styles.noValidBtnContainer}>
                <button type='submit' className={styles.doneReviewBtn} onClick={handleClick}>Volver</button>
              </div>
            </div>
          </div>
        </div>
        </>
    );
};

export default ReviewDonePage;