import styles from "./SearchSpecialist.module.css";
import { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import searchIcon from "../../icons/searchIcon.svg";
import Select from "react-select";
import { db } from "../../utils/firebaseConfig";
import SpecialistList from "../SpecialistList/SpecialistList";

function SearchSpecialist() {
  //Opciones para el dropdown
  const data = [
    {
      value: "1",
      label: "Nombre",
    },
    {
      value: "2",
      label: "Especialidad",
    },
    {
      value: "3",
      label: "Rating",
    },
  ];

  const [selectedValue, setSelectedValue] = useState(0); //Almacena el valor del dropdown
  const [specialists, setSpecialists] = useState([]); //Almacena todos los especialistas en la bd
  const [inputValue, setInputValue] = useState({
    search: "",
  }); //Almaena el string ingresado en el input

  const [specialistsSelection, setSpecialistsSelection] = useState([]); //Almacena el match entre el search y la bd

  const fetchSpecialists = async () => {
    const response = await db.collection("specialists").get(); // Trae la colección de especialistas desde Firestore
    setSpecialists(response.docs.map((doc) => doc.data())); // Coloca cada specialist en un array
  };

  useEffect(() => {
    const unlisten = db
      .collection("specialists")
      .onSnapshot(async () => fetchSpecialists());
  }, []);

  //Obtiene el valor del dropdown
  const handleChange = (Obj) => {
    setSelectedValue(Obj.value);
  };

  //Buscar en base de datos y generar componentes
  const handleSubmit = async (e) => {
    e.preventDefault();
    const helperA = [];
    if (selectedValue === "1") {
      //Si se busca por nombre
      for (let index = 0; index < specialists.length; index++) {
        const element = specialists[index];
        if (element.status === "yes" && element.name === inputValue.search) {
          helperA.push(element);
        } else {
        }
      }
      setSpecialistsSelection(helperA);
    }
    if (selectedValue === "2") {
      //Si se busca por especialidad
      const helperB = [];
      for (let index = 0; index < specialists.length; index++) {
        const element = specialists[index];
        if (element.status === "yes") {
          for (let index = 0; index < element.speciality.length; index++) {
            const speciality = element.speciality[index];

            if (speciality === inputValue.search) {
              helperB.push(element);
            } else {
            }
          }
        } else {
        }
      }
      setSpecialistsSelection(helperB);
    }
    if (selectedValue === "3") {
      //Muestra los especialistas por rating
      var i, j;
      var u;
      let ordered = [];
      for (u = 0; u < specialists.length; u++) {
        if (specialists[u].status === "yes") {
          ordered.push(specialists[u]);
        } else {
        }
      }
      for (i = 0; i < ordered.length - 1; i++) {
        for (j = 0; j < ordered.length - i - 1; j++) {
          if (ordered[j].ratings < ordered[j + 1].ratings) {
            var temp = ordered[j];
            ordered[j] = ordered[j + 1];
            ordered[j + 1] = temp;
          }
        }
      }
      setSpecialistsSelection(ordered);
    }
  };

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    setInputValue({ ...inputValue, [inputName]: value });
  };

  return (
    <div className={styles.searchSections}>
      <div class Name={styles.searchContainer}>
        <form className={styles.search_form}>
          <h2 className={styles.titleForm}>ENCUENTRA TU PSICÓLOGO IDEAL</h2>
          <div className={styles.searchInputs}>
            <div className={styles.inputGroup}>
              <div className={styles.searchInput}>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={inputValue.search}
                  onChange={handleOnChange}
                ></input>
              </div>
              <div className={styles.searchIcon}>
                <img src={searchIcon} onClick={handleSubmit} alt=""></img>
              </div>
            </div>
            <div className={styles.filterContainer}>
              <div className={styles.filter}>
                <div>
                  <label>Buscar por: </label>
                </div>
                <div className={styles.dropdown}>
                  <Select
                    value={data.find((x) => x.value === selectedValue)}
                    options={data}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className={styles.selectionList}>
          <SpecialistList specialists={specialistsSelection} />
        </div>
      </div>
    </div>
  );
}

export default SearchSpecialist;
