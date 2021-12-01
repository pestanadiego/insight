import "./PacientHistory.css";
import { useEffect, useMemo, useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import DataTable from "react-data-table-component";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { db } from "../../utils/firebaseConfig";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import trashIcon from "../../icons/trashIcon.svg";
import editIcon from "../../icons/editIcon.svg";

function PacientHistory() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState(user.histories);

  const [insertDataStatus, setInsertDataStatus] = useState(false);
  const [editDataStatus, setEditDataStatus] = useState(false);
  const [values, setValues] = useState({
    id: "",
    pacient_name: "",
    history_description: "",
  });

  const columns = [
    {
      name: "Paciente",
      selector: (row) => row.pacient_name,
    },
    {
      name: "Descripción de Historia",
      selector: (row) => row.history_description,
      minWidth: "50px",
      maxWidth: "500px",
    },
  ];

  const openInsertHistory = () => {
    setInsertDataStatus(true);
  };
  const closeInsertHistory = () => {
    setInsertDataStatus(false);
  };
  const openEditHistory = () => {
    setEditDataStatus(true);
  };
  const closeEditHistory = () => {
    setEditDataStatus(false);
  };

  const jumpMaker = (text) => {
    let counter = 0;
    for (let i = 1; i < text.length; i++) {
      counter++;
      if (counter == 100) {
        text = [text.slice(0, i), "\n", text.slice(i)].join("");
        counter = 1;
        i = i + 2;
      }
    }
    return text;
  };

  const ExpandedComponent = ({ data }) => (
    <div className="expandable-container">
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <b>Paciente:</b> {data.pacient_name}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Descripción de la Historia:</b>{" "}
                {jumpMaker(data.history_description)}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const customStyles = {
    headRow: {
      style: {
        borderRadius: "10px",
      },
    },
    headCells: {
      style: {
        color: "#202124",
        fontSize: "14px",
        fontweight: "bold",
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "#F2F6F9",
        borderBottomColor: "#FFFFFF",
        borderRadius: "8px",
        outline: "1px solid #FFFFFF",
      },
    },
  };

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target; // Se está escribiendo en n input, n value
    setValues({ ...values, [inputName]: value }); // Copia de los estados anteriores. Se le coloca a n input, n value
  };

  const confirmDelete = (items) => {
    const arr = [];
    let count = 0;
    for (let index = 0; index < data.length; index++) {
      arr.push(data[index]);
    }
    console.log("antes", items);
    if (arr.length == 1) {
      arr.pop();
    } else if (items.length == 1) {
      arr.splice(items[0] - 1, 1);
    } else if (items.length == data.length) {
      return [];
    } else {
      count = 1;
      for (let index = 0; index < items.length; index++) {
        arr.splice(items[index] - count, 1);
        count += 1;
      }
      console.log("Sirve coñóó", arr);
    }
    count = 0;
    for (let index = 0; index < arr.length; index++) {
      arr[index].id = count + 1;
      count += 1;
    }
    setData(arr);
    updateDb(arr);
  };

  const createHistory = () => {
    const arr = [];
    const id = data.length + 1;
    for (let index = 0; index < data.length; index++) {
      arr.push(data[index]);
    }
    const add = {
      id: "",
      pacient_name: "",
      history_description: "",
    };
    add.id = id;
    add.pacient_name = values.pacient_name;
    add.history_description = values.history_description;
    console.log("ID DEL PANA", values.id);
    arr.push(add);
    setData(arr);
    updateDb(arr);
    setInsertDataStatus(false);
    setValues({
      id: 0,
      pacient_name: "",
      history_description: "",
    });
  };

  const confirmEdit = (item) => {
    const arr = [];
    let count = 0;
    for (let index = 0; index < data.length; index++) {
      arr.push(data[index]);
    }
    const edit = {
      id: "",
      pacient_name: "",
      history_description: "",
    };
    edit.id = item;
    edit.pacient_name = values.pacient_name;
    edit.history_description = values.history_description;
    arr.splice(item - 1, 1, edit);
    setData(arr);
    console.log("Soy arr antes de updae", arr);
    setEditDataStatus(false);
    updateDb(arr);
    setValues({
      id: "",
      pacient_name: "",
      history_description: "",
    });
  };

  const setDefaultValues = (val) => {
    const defVal = {
      id: val.id,
      pacient_name: val.pacient_name,
      history_description: val.history_description,
    };

    setValues(defVal);
  };

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          "Está seguro de que desea eliminar el historial de " +
            selectedRows.map((r) => r.pacient_name) +
            "?"
        )
      ) {
        console.log(selectedRows.map((r) => r.id)[0]);
        setToggleCleared(!toggleCleared);
        confirmDelete(selectedRows.map((r) => r.id));
      }
    };
    const handleEdit = () => {
      if (selectedRows.map((r) => r).length > 1) {
        alert("Solo puede editar un historial a la vez!");
      } else {
        console.log(selectedRows.map((r) => r.id)[0]);
        setToggleCleared(!toggleCleared);
        setDefaultValues(selectedRows.map((r) => r)[0]);
        setEditDataStatus(true);
      }
    };

    return (
      <div className="actionsContainer">
        <Button key="delete" onClick={handleDelete} className="deleteHistory">
          <img src={trashIcon} alt="Eliminar" />
        </Button>
        <Button key="edit" onClick={handleEdit} className="editHistory">
          <img src={editIcon} alt="Editar" />
        </Button>
      </div>
    );
  }, [data, selectedRows, toggleCleared]);

  const updateDb = async (arr) => {
    console.log("Entree", arr);
    //Actualiza el UsexContext
    user.histories = arr;
    //Base de datos epecialista
    console.log(user.uid);
    await db.collection("specialists").doc(user.uid).update({ histories: arr });
    await db.collection("users").doc(user.uid).update({ histories: arr });
  };

  return (
    <div className="appointmentsTableContainer">
      <div className="tableContainer">
        <h1>Mis Pacientes</h1>
        <div className="createButtonContainer">
          <Button
            key="create"
            className="createHistory"
            onClick={openInsertHistory}
          >
            Nueva Historia
          </Button>
        </div>
        <div className="data-table">
          <DataTable
            title="Historiales de Pacientes"
            customStyles={customStyles}
            columns={columns}
            data={data}
            selectableRows
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
            pagination
            highlightOnHover={true}
            expandableRows={true}
            expandableRowsComponent={ExpandedComponent}
          />
          <Popup
            open={insertDataStatus}
            closeOnDocumentClick
            onClose={() => closeInsertHistory()}
            modal
            className="insert-popup"
          >
            <div className="modal">
              <div className="header">
                <h2>Agregar un Nuevo Historial</h2>
              </div>

              <div className="content">
                <FormGroup>
                  <input
                    className="form-control"
                    readOnly
                    name="history_id"
                    type="text"
                    value={data.length + 1}
                    style={{
                      display: "none",
                    }}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Nombre del Paciente: <br />
                  </label>
                  <input
                    className="pacient_name"
                    name="pacient_name"
                    type="text"
                    onChange={handleOnChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label> Descripción de la Historia:</label>
                  <textarea
                    className="history_description"
                    name="history_description"
                    type="text"
                    style={{}}
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </div>

              <div className="actions">
                <Button className="confirm" onClick={() => createHistory()}>
                  Insertar
                </Button>
                <Button className="cancel" onClick={() => closeInsertHistory()}>
                  Cancelar
                </Button>
              </div>
            </div>
          </Popup>

          {/* PopUp para editar de historia */}
          <Popup
            open={editDataStatus}
            closeOnDocumentClick
            onClose={() => closeEditHistory()}
            modal
          >
            <div className="modal">
              <div className="header">
                <h2>
                  Editar Historial de {selectedRows.map((r) => r.pacient_name)}
                </h2>
              </div>

              <div className="content">
                <FormGroup>
                  <input
                    className="form-control"
                    readOnly
                    name="history_id"
                    type="text"
                    value={values.id}
                    style={{
                      display: "none",
                    }}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Nombre del Paciente: <br />
                  </label>
                  <input
                    className="pacient_name"
                    name="pacient_name"
                    type="text"
                    onChange={handleOnChange}
                    value={values.pacient_name}
                  />
                </FormGroup>

                <FormGroup>
                  <label> Descripción de la Historia:</label>
                  <textarea
                    className="history_description"
                    name="history_description"
                    type="text"
                    onChange={handleOnChange}
                    value={values.history_description}
                  />
                </FormGroup>
              </div>

              <div className="actions">
                <Button
                  className="confirm"
                  onClick={() => confirmEdit(selectedRows.map((r) => r.id)[0])}
                >
                  Confirmar
                </Button>
                <Button className="cancel" onClick={() => closeEditHistory()}>
                  Cancelar
                </Button>
              </div>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
}
export default PacientHistory;
