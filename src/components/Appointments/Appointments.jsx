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
  const { user, getUserByEmail, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); //Pantalla de carga
  const [workingHours, setWorkingHours] = useState([]); //Almacena la información referente al horario de trabajo del especialista
  const [workingDays, setWorkingDays] = useState([]); //Almacena la información referente a los días de trabajo del especialista
  const [tableData, setTableData] = useState([]);
  const [appointments, setAppointments] = useState([
    {
      Subject: "Cita",
      Description: "Hola, toy enfermo",
      pacient: "Mariano",
      pacientEmail: "mariano.moran@email.com",
      pacientPhone: "04265108131",
      StartTime: "2021-11-24T15:45:00.000Z",
      EndTime: "2021-11-24T16:30:00.000Z",
      Id: 1,
    },
    {
      Subject: "Cita",
      Description: "Hola, Ayudaaaa",
      pacient: "Pedro Sanchez",
      pacientEmail: "pedrito@email.com",
      pacientPhone: "04265108131",
      StartTime: "2021-12-12T17:45:00.000Z",
      EndTime: "2021-12-12T18:30:00.000Z",
      Id: 2,
    },
    {
      Subject: "Cita",
      Description: "Marico no entiendo",
      pacient: "Jaimito",
      pacientEmail: "jaimito@email.com",
      pacientPhone: "04265108131",
      StartTime: "2021-11-27T14:45:00.000Z",
      EndTime: "2021-11-27T15:30:00.000Z",
      Id: 3,
    },
  ]); //Almacena la información referente a las citas agendadas del especialista
  const columns = [
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
    // getAppointments(response);
    setData(appointments);
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
        "Correo: " +
        response[i].pacientEmail.toString() +
        "\n" +
        "Teléfono: " +
        response[i].pacientPhone.toString();
      jsonData.date = getDate(response[i].StartTime);
      jsonData.hour = getTime(response[i]);
      jsonData.description = response[i].Description;
      arrayData.push(jsonData);
    }
    setTableData(arrayData);
  };

  const getDate = (date) => {
    let year = "";
    let month = "";
    let day = "";
    year = date.substring(0, 4);
    month = date.substring(5, 7);
    day = date.substring(8, 10);
    // return day + "/" + month + "/" + year;
    return year + "/" + month + "/" + day;
  };

  const getTime = (hour) => {
    let startHour = "";
    let endHour = "";
    startHour = hour.StartTime.substring(11, 16);
    endHour = hour.EndTime.substring(11, 16);
    return startHour + "-" + endHour;
  };

  const ExpandedComponent = ({ data }) => (
    <div>
      <p>Paciente: {data.name}</p>
      <p>{data.contact}</p>
      <p>Día de la cita: {data.date}</p>
      <p>Hora de inicio de la cita: {data.hour.substring(0, 5)}</p>
      <p>Hora de finalización de la cita: {data.hour.substring(6, 11)}</p>
      <p>Motivo de la cita: {data.description}</p>
    </div>
  );
  useEffect(() => {
    setScheduleData();
  }, []);

  console.log(appointments);
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
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "#F2F6F9",
        borderBottomColor: "#FFFFFF",
        borderRadius: "25px",
        outline: "1px solid #FFFFFF",
      },
    },
    pagination: {
      style: {
        border: "none",
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="appointmentsContainer">
          <div className="calendar">
            <h1>Citas Agendadas</h1>
            <ScheduleComponent
              className="calendarComponent"
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
              expandableRowsComponent={ExpandedComponent}
            ></DataTable>
          </div>
        </div>
      )}
    </>
  );
}

export default Appointments;
