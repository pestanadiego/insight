import homePic from "../images/home_pic.jpg";
import styles from "./HomePage.module.css";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

function HomePage() {
  // const history = useHistory();
  // const { user } = useContext(UserContext);
  // if (user) {
  //   history.push("/profile");
  // }
  return <div className={styles.imgContainer}></div>;
}

export default HomePage;
