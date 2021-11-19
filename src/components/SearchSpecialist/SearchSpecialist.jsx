import styles from './SearchSpecialist.module.css';
import { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import searchIcon from '../../icons/searchIcon.svg';
import Select from "react-select";
import { db } from '../../utils/firebaseConfig';
import SpecialistList from "../SpecialistList/SpecialistList";

function SearchSpecialist() {

    //Opciones para el dropdown
    const data = [
        {
            value: "1",
            label: "Nombre"
        },
        {
            value:"2",
            label: "Especialista"
        },
        {
            value:"3",
            label: "Valoraciones"
        }
    ]

    const [selectedValue, setSelectedValue] = useState(0);
    const [specialists, setSpecialists] = useState([]);
     const [inputValue, setInputValue] = useState({
    search: ""
  });

  const [specialistsSelection, setSpecialistsSelection] = useState([]);
    
    const fetchSpecialists = async () => {
        const response = await db.collection('specialists').get() // Trae la colección de especialistas desde Firestore
        setSpecialists(response.docs.map(doc => doc.data())); // Coloca cada specialist en un array
    }

    useEffect(() => {
      const unlisten = db.collection('specialists').onSnapshot(async () => fetchSpecialists());
    }, []);

    //Obtiene el valor del dropdown
    const handleChange = (Obj) =>{
        setSelectedValue(Obj.value);  
    }

    //Buscar en base de datos y generar componentes
    const handleSubmit = async (e) => { 
        e.preventDefault();
        if(selectedValue==="1"){
            console.log('VALOR DEL INPUT: ');
            console.log(inputValue);
            console.log('Especialistas en la base de datos ');
            console.log(specialists);
            for (let index = 0; index < specialists.length; index++) {
                const element = specialists[index];
                if(element.name === inputValue.search){
                    console.log('Found match');
                    console.log(element);
                    setSpecialistsSelection(element);
                    console.log(specialistsSelection);
                }else{}
            }
            console.log('Matches: ');
            console.log(specialistsSelection);
        }if(selectedValue==="2"){
            //busco por especialidad
        }if(selectedValue==="3"){
            //busco por feedback
        }
    }

    const handleOnChange = (event) => {
    const { value, name: inputName } = event.target; 
    setInputValue({ ...inputValue, [inputName]: value });
  };

    return(
        <div className={styles.sections}>
        <div class Name={styles.container}>
            <form className={styles.search_form}>
                <h2 className={styles.titleForm}>ENCUENTRA TU PSICÓLOGO IDEAL</h2>
                <div className={styles.inputs}>
                <div className={styles.inputGroup}>
                    <div className={styles.searchInput}><input type="text" name="search" id="search" value={inputValue.search}
                  onChange={handleOnChange}>
                  </input></div>
                    <div className={styles.searchIcon}>
                        <img src={searchIcon} onClick={handleSubmit} alt=""></img>
                    </div>
                </div>
                <div className={styles.filterContainer}>
                    <div className={styles.filter}>
                        <div><label>Buscar por: </label></div>
                        <div className={styles.dropdown}>
                        <Select
                        value={data.find(x => x.value ===selectedValue)}
                        options={data}
                        onChange={handleChange}
                        /></div>
                </div>
                </div>
                </div>
            </form>
            <SpecialistList 
            specialists={specialistsSelection}/>
        </div>
        </div>
    );
}

export default SearchSpecialist;