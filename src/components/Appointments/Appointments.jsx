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
import "./Appointments.module.css";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { setCulture } from "@syncfusion/ej2-base";
import { L10n } from "@syncfusion/ej2-base";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
setCulture("en-US");
L10n.load({
  "en-US": {
    schedule: {
      day: "Día",
      week: "Semana",
      workWeek: "Semana",
      month: "Mes",
      agenda: "Citas",
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
  const [appointments, setAppointments] = useState([
    {
      Id: "1",
      Subject: "Cita",
      StartTime: new Date(2021, 10, 23, 10, 30),
      EndTime: new Date(2021, 10, 23, 11, 30),
      EventType: "Pending",
      pacient: "Cristiano Ronaldo",
      description: "",
    },
    {
      Id: "2",
      Subject: "Cita",
      StartTime: new Date(2021, 10, 23, 13, 30),
      EndTime: new Date(2021, 10, 23, 14, 30),
      EventType: "Pending",
      pacient: "Julio Perez",
      description: "",
    },
    {
      Id: "3",
      Subject: "Cita",
      StartTime: new Date(2021, 10, 24, 10, 30),
      EndTime: new Date(2021, 10, 24, 11, 30),
      EventType: "Pending",
      pacient: "Salcedo Loco",
      description: "",
    },
  ]); //Almacena la información referente a las citas agendadas del especialista

  const setScheduleData = async () => {
    //Se encarga de insertarle los parametros necesarios al calendario para que este muestre las citas, días de trabajo y horarios del especialista
    setIsLoading(true);
    const response = await user; //Obtiene los datos del especialista que escogió el paciente
    console.log("especialista", response);
    getWorkingHours(response);
    getWorkingDays(response);
    test();
    // getAppointments(response);
    setIsLoading(false);
  };
  const test = () => {
    for (let i = 0; i < appointments.length; i++) {
      appointments[i].Subject = "Cita con " + appointments[i].pacient;
    }
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
        response.appointments[i].IsReadonly = false;
        response.appointments[i].Subject =
          "Cita con " + response.appointments[i].pacient;
      }
      setAppointments(response.appointments);
    }
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
        <ScheduleComponent
          eventSettings={{
            dataSource: appointments,
            fields: {
              id: "Id",
              subject: { name: "Subject", default: "Cita" },
              startTime: { name: "StartTime", validation: { required: true } },
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
      )}
    </>
  );
}

export default Appointments;
