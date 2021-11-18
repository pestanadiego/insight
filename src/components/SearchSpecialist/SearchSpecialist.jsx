import styles from './SearchSpecialist.module.css';
import { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import searchIcon from '../../icons/searchIcon.svg';
import arrowIcon from '../../icons/arrowIcon.svg';
import Select from "react-select";

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

    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);

    //Obtiene el valor del dropdown
    const handleChange = (Obj) =>{
        setSelectedValue(Obj.value);
        console.log(Obj.label);   
    }
    
    //Buscar en base de datos y generar componentes
    const handleSubmit = (e) => {

    }

    return(
        <div class Name={styles.container}>
            <form className={styles.search_form}>
                <h2 className={styles.titleForm}>ENCUENTRA TU PSICÓLOGO IDEAL</h2>
                <div className={styles.inputs}>
                <div className={styles.inputGroup}>
                    <div><input type="text" placeholder="Juanito Perez"></input></div>
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
                <p></p>
                </div>
                </div>
            </form>
        </div>
    );
}

export default SearchSpecialist;