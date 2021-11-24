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
  getMaxDays,
  getStartEndHours,
  getDateFromString,
} from "@syncfusion/ej2-react-schedule";
import "./ScheduleAppointment.css";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { setCulture } from "@syncfusion/ej2-base";
import { L10n } from "@syncfusion/ej2-base";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { db } from "../../utils/firebaseConfig";
import emailjs from "emailjs-com";
import { Spinner } from "react-bootstrap";

setCulture("en-US");
L10n.load({
  "en-US": {
    schedule: {
      day: "Día",
      week: "Semana",
      workWeek: "Semana-Laboral",
      month: "Mes",
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
      description: "Motivo de Consulta:",
    },
  },
});
function editWindowTemplate(props) {
  //Nos permite editar la ventana que se despliega cuando el paciente va a agendar una cita
  return props !== undefined ? (
    <table
      className="custom-event-editor"
      style={{ width: "100%", cellpadding: "5" }}
    >
      <tbody>
        <tr>
          <td className="e-textlabel"></td>
          <td colSpan={4}>
            <input
              id="Summary"
              className="e-field e-input"
              type="hidden"
              name="Subject"
              value="Cita"
              style={{ width: "100%" }}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Desde:</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="StartTime"
              data-name="StartTime"
              value={new Date(props.startTime || props.StartTime)}
              className="e-field"
              readonly
              showClearButton={false}
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Hasta:</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="EndTime"
              data-name="EndTime"
              value={new Date(props.endTime || props.EndTime)}
              className="e-field"
              readonly
              showClearButton={false}
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Descripción</td>
          <td colSpan={4}>
            <textarea
              id="Description"
              className="e-field e-input"
              name="Description"
              rows={3}
              cols={50}
              style={{
                width: "100%",
                height: "60px !important",
                resize: "vertical",
              }}
            ></textarea>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel"></td>
          <td>
            <input
              id="IsBlock "
              type="checkbox"
              className="e-field e-input"
              name="IsBlock"
              style={{
                display: "none",
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div></div>
  );
}

function onPopupOpen(props) {
  //Valida si el paciente intenta agendar una cita antes del presente, de tal manera que el popup no se despliegue
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkDate = (day) => {
    //Verifica que el día y hora escogido no sea antes que el presente
    return (props.data.startTime || props.data.StartTime) < day;
  };
  if (checkDate(tomorrow)) {
    alert(
      "Por favor seleccione una fecha y hora válida. Verifique que la fecha y hora seleccionada para agendar la cita se está realizando como mínimo 24 horas de antelación"
    );
    props.cancel = true;
  } else {
  }
}

function ScheduleAppointment({ specialist }) {
  // SE LE PASA LA PROP SPECIALIST (EL .JSON CON TODOS LOS DATOS DEL ESPECIALISTA)
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [done, setDone] = useState(false);
  const [paymentView, setPaymentView] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appointments, setAppointments] = useState(specialist.appointments);
  const [isLoading, setIsLoading] = useState(true); //Pantalla de carga
  const workingHours = specialist.hours; //Almacena la información referente al horario de trabajo del especialista
  let workingDays = []; //Almacena la información referente a los días de trabajo del especialista
  const numAppointments = specialist.appointments.length;
  const rep = /"/gi;
  console.log("SOY USUARIO", user);
  const templatePacientAppointment = {
    title: "Su cita se ha agendado con éxito",
    name: user.name,
    email: user.email,
    notes:
      "Su cita ha sido agendada con éxito. Ingrese a la aplicación para más información",
  };
  const templateSpecialistAppointment = {
    title: "Tienes una nueva cita",
    name: specialist.name,
    email: specialist.email,
    notes:
      "Han agendado una cita con usted. Ingrese a la aplicación para más información.",
  };

  function CheckoutForm() {
    console.log("Pago del la vaina", specialist.payment);
    const [show, setShow] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    //Se crea la orden
    const createOrder = (data, actions) => {
      return actions.order
        .create({
          purchase_units: [
            {
              description: "Cita",
              amount: {
                currency_code: "USD",
                value: specialist.payment,
              },
            },
          ],
          // not needed if a shipping address is actually needed
          application_context: {
            shipping_preference: "NO_SHIPPING",
          },
        })
        .then((orderID) => {
          setOrderID(orderID);
          return orderID;
        });
    };
    //Se valida la orden
    const onApprove = (data, actions) => {
      return actions.order.capture().then(function (details) {
        const { payer } = details;
        setSuccess(true);
      });
    };

    if (success) {
      alert("Payment successful!!");
      successfulPayment();
    }

    const onError = (data, actions) => {
      setErrorMessage("Ocurrió un error con tu pago - Te estafamos");
    };
    return (
      <PayPalScriptProvider
        options={{
          "client-id":
            "AT6Dn4fEQUUvOjsEipV3XKL8wyPXEzOi17M6YJI1wd4-jtJclBKR_ocy8yTB9eV0hI3rqyQ3-kurfzMM",
        }}
      >
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </PayPalScriptProvider>
    );
  }

  const getWorkingDays = (prop) => {
    //Obtiene los días de trabajo del especialista
    for (let i = 0; i < prop.work.length; i++) {
      workingDays.push(parseInt(prop.work[i]));
    }
    return workingDays;
  };

  const checkScheduling = () => {
    console.log(appointments.length);
    console.log(numAppointments);
    const result = appointments.length - numAppointments;
    if (result === 0 && !done) {
      setPaymentView(false);
      setDone(true);
    } else if (result == 1) {
      setPaymentView(true);
    } else if (result == 0 && done) {
      setPaymentView(true);
    } else {
      setPaymentView(false);
    }
    console.log("Probando");
    console.log(result);
  };

  const setScheduleData = () => {
    //Se encarga de insertarle los parametros necesarios al calendario para que este muestre las citas, días de trabajo y horarios del especialista
    setIsLoading(true);
    setIsLoading(false);
  };

  useEffect(() => {
    setScheduleData();
  });

  console.log("Appointments", appointments);

  const getNewAppointment = (appointments) => {
    let ap = appointments;
    console.log("HOLA SOY AP", ap);
    // Se crea el appointment que se subirá a Firestore
    const newAppointment = {
      Id: appointments[appointments.length - 1].Id,
      Subject: "Horario Ocupado",
      Description: appointments[appointments.length - 1].Description,
      StartTime: JSON.stringify(
        appointments[appointments.length - 1].StartTime
      ).replace(rep, ""),
      EndTime: JSON.stringify(
        appointments[appointments.length - 1].EndTime
      ).replace(rep, ""),
      IsBlock: true,
      pacient: user.name,
      pacientEmail: user.email,
      pacientPhone: user.phone,
    };
    const newAppointmentPacient = {
      Id: appointments[appointments.length - 1].Id,
      Description: appointments[appointments.length - 1].Description,
      StartTime: JSON.stringify(
        appointments[appointments.length - 1].StartTime
      ).replace(rep, ""),
      EndTime: JSON.stringify(
        appointments[appointments.length - 1].EndTime
      ).replace(rep, ""),
      specialist: specialist.name,
      specialistEmail: specialist.email,
      specialistPhone: specialist.phone,
    };
    // Se elimina el appointment con los datos innecesarios de appointments
    ap.pop();
    // Se agrega el appointment creado
    ap.push(newAppointment);
    console.log("chao ", ap);
    setAppointments(ap);

    return newAppointmentPacient;
  };

  const formatDate = (date) => {
    const dateAppointment = date.substring(4, 15);
    return dateAppointment;
  };

  const formatHour = (start, end) => {
    const startHour = start.substring(16, 21);
    const endHour = end.substring(16, 21);
    const hour = "De " + startHour + " a " + endHour;
    return hour;
  };

  const successfulPayment = async () => {
    const newAppointmentPacient = getNewAppointment(appointments);
    //Base de datos epecialista
    await db
      .collection("specialists")
      .doc(specialist.uid)
      .update({ appointments: appointments });
    await db
      .collection("users")
      .doc(specialist.uid)
      .update({ appointments: appointments });

    //Base de datos paciente
    await db
      .collection("pacients")
      .doc(user.uid)
      .update({ appointments: [...user.appointments, newAppointmentPacient] });
    await db
      .collection("users")
      .doc(user.uid)
      .update({ appointments: [...user.appointments, newAppointmentPacient] });

    //Actualiza el UsexContext
    user.appointments.push(newAppointmentPacient);

    //Envío de mensajes de confirmación vía correo electrónico
    sendNewAppointment(templatePacientAppointment);
    sendNewAppointment(templateSpecialistAppointment);
    history.push("/pacient_appointments");
  };

  const sendNewAppointment = (templateParams) => {
    emailjs
      .send(
        "service_rkywh23",
        "template_ob227vk",
        templateParams,
        "user_A1eEQeCvsHGleoXo5JDz3"
      )
      .then(
        (result) => {},
        (error) => {}
      );
  };

  return (
    <>
      {isLoading ? (
        <div className="appointmentLoading">
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : (
        <div className="appointmentContainer">
          <div className="calendar">
            <h1>Reserva una cita</h1>
            <p>Ingresa la fecha y hora en la que deseas agendar tu cita:</p>
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
                  description: { name: "Description", default: "" },
                },
                enableTooltip: true,
              }}
              startHour={workingHours[0]}
              endHour={workingHours[1]}
              workDays={getWorkingDays(specialist)}
              editorTemplate={editWindowTemplate.bind(this)}
              firstDayOfWeek={1}
              showQuickInfo={false}
              timeScale={{ enable: true, interval: 45, slotCount: 1 }}
              popupOpen={onPopupOpen.bind(this)}
            >
              <ViewsDirective>
                <ViewDirective option="WorkWeek" />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month]} />
            </ScheduleComponent>

            <div>
              <button
                className="buttonSchedule"
                type="button"
                onClick={checkScheduling}
              >
                Continuar
              </button>
            </div>
          </div>

          {!paymentView ? (
            <p>Agende una sola cita para poder hacer el pago.</p>
          ) : (
            <>
              <h1>Pago</h1>
              <div className="payment">
                <div className="paymentColumn">
                  <p className="titlePayment">Paciente:</p>
                  <p className="descriptionPayment">{user.name}</p>
                  <p className="titlePayment">Especialista:</p>
                  <p className="descriptionPayment">{specialist.name}</p>
                  <p className="titlePayment">Fecha:</p>
                  <p className="descriptionPayment">
                    {formatDate(
                      appointments[appointments.length - 1].StartTime.toString()
                    )}
                  </p>
                  <p className="titlePayment">Hora:</p>
                  <p className="descriptionPayment">
                    {formatHour(
                      appointments[
                        appointments.length - 1
                      ].StartTime.toString(),
                      appointments[appointments.length - 1].EndTime.toString()
                    )}
                  </p>
                  <p className="titlePayment">Descripción:</p>
                  <p className="descriptionPayment">
                    {appointments[appointments.length - 1].Description}
                  </p>
                </div>
                <div className="paymentColumn">
                  <div className="price">
                    <p>Precio de la consulta</p>
                    <h1>${specialist.payment}</h1>
                  </div>
                  <CheckoutForm />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ScheduleAppointment;
