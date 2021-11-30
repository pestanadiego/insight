import { useEffect } from "react";
import { useState } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  ViewsDirective,
  ViewDirective,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import "./Appointments.css";
import { setCulture } from "@syncfusion/ej2-base";
import { L10n } from "@syncfusion/ej2-base";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
setCulture("en-US");
L10n.load({
  "en-US": {
    schedule: {
      day: "Día",
      week: "Semana",
      workWeek: "Semana",
      month: "Mes",
      agenda: "Citas Agendadas",
      today: "Hoy",
      allDay: "Todo el Día",
      start: "Comienza",
      end: "Finaliza",
      delete: "Eliminar",
      edit: "Editar",
      editEvent: "Editar Cita",
      subject: "Asunto",
      createEvent: "Crear",
      save: "Guardar",
      saveButton: "Agregar",
      cancelButton: "Cancelar",
      deleteButton: "Eliminar",
      previous: "Antes",
      next: "Después",
      newEvent: "Nueva Cita",
      description: "Descripción",
    },
  },
});

function onPopupOpen(props) {
  props.cancel = true;
}

function Appointments() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); //Pantalla de carga
  const [workingHours, setWorkingHours] = useState([]); //Almacena la información referente al horario de trabajo del especialista
  const [workingDays, setWorkingDays] = useState([]); //Almacena la información referente a los días de trabajo del especialista
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
      sortable: true,
    },
    {
      name: "Paciente",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Contacto",
      selector: (row) => row.contact,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
    },
  ];

  const setScheduleData = async () => {
    //Se encarga de insertarle los parametros necesarios al calendario para que este muestre las citas, días de trabajo y horarios del especialista
    setIsLoading(true);
    const response = await user; //Obtiene los datos del especialista que escogió el paciente
    console.log("especialista", response);
    getWorkingHours(response);
    getWorkingDays(response);
    getAppointments(response);
    setData(response.appointments);
    setIsLoading(false);
  };

  const getWorkingHours = (response) => {
    //Obtiene el horario de trabajo del especialista
    console.log(response);
    setWorkingHours(response.hours);
  };

  const getWorkingDays = (response) => {
    //Obtiene los días de trabajo del especialista
    let workint = [];
    for (let i = 0; i < response.work.length; i++) {
      workint.push(parseInt(response.work[i]));
    }
    setWorkingDays(workint);
  };

  const getAppointments = (response) => {
    //Obtiene las citas agendadas del especialistas
    if (response.appointments === undefined) {
      setAppointments([]);
    } else {
      for (let i = 0; i < response.appointments.length; i++) {
        response.appointments[i].IsBlock = false;
        response.appointments[i].Subject =
          "Cita con " + response.appointments[i].pacient;
      }
      setAppointments(response.appointments);
    }
  };

  const setData = (response) => {
    let arrayData = [];
    for (let i = 0; i < response.length; i++) {
      const jsonData = {};
      jsonData.id = response[i].Id;
      jsonData.name = response[i].pacient;
      jsonData.contact =
        response[i].pacientEmail.toString() +
        "\n" +
        response[i].pacientPhone.toString();
      jsonData.date = getDate(response[i].StartTime);
      jsonData.hour = getTime(response[i]);
      jsonData.description = response[i].Description;
      arrayData.push(jsonData);
    }
    setTableData(arrayData);
  };

  const getDate = (date) => {
    console.log("PADNJAKSNS", date);
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
                <b>Paciente:</b> {data.name}
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
        <div className="appointmentsContainer">
          <h1>Citas Agendadas</h1>
          <div className="calendar">
            <ScheduleComponent
              height="auto"
              width="auto"
              className="calendarComp"
              eventSettings={{
                dataSource: appointments,
                fields: {
                  id: "Id",
                  subject: { name: "Subject", default: "Cita" },
                  startTime: {
                    name: "StartTime",
                    validation: { required: true },
                  },
                  endTime: { name: "EndTime", validation: { required: true } },
                  eventType: {
                    name: "EventType",
                    default: "Pending",
                  },
                  description: { name: "Description", default: "" },
                },
                enableTooltip: true,
              }}
              startHour={workingHours[0]}
              endHour={workingHours[1]}
              workDays={workingDays}
              firstDayOfWeek={1}
              showQuickInfo={false}
              timeScale={{ enable: true, interval: 45, slotCount: 1 }}
              popupOpen={onPopupOpen.bind(this)}
            >
              <ViewsDirective>
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Agenda" />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
          </div>
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
      )}
    </>
  );
}

export default Appointments;
