import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import "./AppointmentsPacient.css";

function AppointmentsPacient() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); //Pantalla de carga
  const [tableData, setTableData] = useState([]);
  const [appointments, setAppointments] = useState([]); //Almacena la información referente a las citas agendadas del especialista
  const columns = [
    {
      name: "Fecha",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Hora",
      selector: (row) => row.hour,
    },
    {
      name: "Especialista",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Contacto",
      selector: (row) => row.contact,
    },
    {
      name: "Motivo de Cita",
      selector: (row) => row.description,
    },
  ];

  const setScheduleData = async () => {
    //Se encarga de insertarle los parametros necesarios al calendario para que este muestre las citas, días de trabajo y horarios del especialista
    setIsLoading(true);
    const response = await user; //Obtiene los datos del especialista que escogió el paciente
    console.log("Hola, soy el usuario", response);
    setData(response.appointments);
    setIsLoading(false);
  };

  const setData = (response) => {
    let arrayData = [];
    for (let i = 0; i < response.length; i++) {
      const jsonData = {};
      console.log(i, response[i]);
      jsonData.id = response[i].Id;
      jsonData.name = response[i].specialist;
      jsonData.contact =
        response[i].specialistEmail.toString() +
        "\n" +
        response[i].specialistPhone.toString();
      jsonData.date = getDate(response[i].StartTime);
      jsonData.hour = getTime(response[i]);
      jsonData.description = response[i].Description;
      arrayData.push(jsonData);
    }
    setTableData(arrayData);
  };

  const getDate = (date) => {
    return getAppointmentDate(date);
  };
  const getExpandableDate = (date) => {
    let year = "";
    let month = "";
    let day = "";
    year = date.substring(0, 4);
    month = date.substring(5, 7);
    day = date.substring(8, 10);
    return day + "/" + month + "/" + year;
  };

  const getTime = (hour) => {
    let startHour = "";
    let endHour = "";
    startHour = getStartTime(hour.StartTime);
    endHour = getEndTime(hour.EndTime);
    return startHour + "-" + endHour;
  };

  const getAppointmentDate = (prop) => {
    let startHour = "";
    let year = "";
    let month = "";
    let day = "";
    year = prop.substring(0, 4);
    month = prop.substring(5, 7);
    day = prop.substring(8, 10);
    startHour = prop.substring(11, 16);
    const numStart = startHour.substring(0, 2);
    let num1 = parseInt(startHour.substring(0, 2));
    num1 = num1 - 4;
    let hour = num1.toString();
    const yesterday = parseInt(day) - 1;

    if (hour.length < 2 || (num1 * -1).toString().length < 2) {
      if (hour == "-1") {
        hour = "23";
        day = yesterday.toString();
      } else if (hour == "-2") {
        hour = "22";
        day = yesterday.toString();
      } else if (hour == "-3") {
        hour = "21";
        day = yesterday.toString();
      } else if (hour == "-4") {
        hour = "20";
        day = yesterday.toString();
      } else {
        hour = "0" + hour;
      }
    }

    startHour = startHour.replace(numStart, hour);

    return year + "/" + month + "/" + day;
  };

  const getStartTime = (prop) => {
    let startHour = "";
    let year = "";
    let month = "";
    let day = "";
    year = prop.substring(0, 4);
    month = prop.substring(5, 7);
    day = prop.substring(8, 10);
    startHour = prop.substring(11, 16);
    const numStart = startHour.substring(0, 2);
    let num1 = parseInt(startHour.substring(0, 2));
    num1 = num1 - 4;
    let hour = num1.toString();
    const yesterday = parseInt(day) - 1;

    if (hour.length < 2 || (num1 * -1).toString().length < 2) {
      if (hour == "-1") {
        hour = "23";
        day = yesterday.toString();
      } else if (hour == "-2") {
        hour = "22";
        day = yesterday.toString();
      } else if (hour == "-3") {
        hour = "21";
        day = yesterday.toString();
      } else if (hour == "-4") {
        hour = "20";
        day = yesterday.toString();
      } else {
        hour = "0" + hour;
      }
    }

    startHour = startHour.replace(numStart, hour);

    return startHour;
  };

  const getEndTime = (prop) => {
    let endHour = "";
    let year = "";
    let month = "";
    let day = "";
    year = prop.substring(0, 4);
    month = prop.substring(5, 7);
    day = prop.substring(8, 10);
    endHour = prop.substring(11, 16);
    const numEnd = endHour.substring(0, 2);
    let num2 = parseInt(endHour.substring(0, 2));
    const yesterday = parseInt(day) - 1;
    num2 = num2 - 4;
    let hour = num2.toString();

    if (hour.length < 2 || (num2 * -1).toString().length < 2) {
      if (hour == "-1") {
        hour = "23";
        day = yesterday.toString();
      } else if (hour == "-2") {
        hour = "22";
        day = yesterday.toString();
      } else if (hour == "-3") {
        hour = "21";
        day = yesterday.toString();
      } else if (hour == "-4") {
        hour = "20";
        day = yesterday.toString();
      } else {
        hour = "0" + hour;
      }
    }

    endHour = endHour.replace(numEnd, hour);

    return endHour;
  };

  const ExpandedComponent = ({ data }) => (
    <div className="expandable-container">
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <b>Especialista:</b> {data.name}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                {" "}
                <b>Correo: </b>{" "}
                {data.contact.substring(0, data.contact.length - 11)}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Teléfono: </b>
                {data.contact.substring(
                  data.contact.length - 11,
                  data.contact.length
                )}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Día de la cita:</b>{" "}
                {getExpandableDate(getAppointmentDate(data.date))}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Hora de inicio de la cita:</b> {data.hour.substring(0, 5)}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Hora de finalización de la cita:</b>{" "}
                {data.hour.substring(6, 11)}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Motivo de la cita:</b> {data.description}
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
        border: "none",
        borderRadius: "10px",
        backgroundColor: "#EBEFF2",
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

  const paginationComponentOptions = {
    noRowsPerPage: true,
    rangeSeparatorText: "de",
  };
  useEffect(() => {
    setScheduleData();
  }, []);

  console.log(appointments);
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="appointmentsTableContainer">
          <div className="tableContainer">
            <h1>Mis Consultas</h1>
            <div className="data-table">
              <DataTable
                customStyles={customStyles}
                className="tableComponent"
                columns={columns}
                data={tableData}
                highlightOnHover={true}
                expandableRows={true}
                pagination={true}
                paginationComponentOptions={paginationComponentOptions}
                expandableRowsComponent={ExpandedComponent}
              ></DataTable>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AppointmentsPacient;
