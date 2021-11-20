import EspecialistCard from "../components/HomeEspecialistCard/HomeEspecialistCard";
//import HomeComment from "../../components/HomeComment/HomeComment";
import styles from "./HomeSlide.module.css";

function HomeSlide({ list }) {
  return (
    <div className={styles.especialistCard}>
      {list.map((especialist) => (
        <EspecialistCard
          name={especialist.name}
          email={especialist.email}
          phone={especialist.phone}
        />
      ))}
    </div>
  );
}

export default HomeSlide;
