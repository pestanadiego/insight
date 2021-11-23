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
} from "@syncfusion/ej2-react-schedule";
import "./ScheduleAppointment.css";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { setCulture } from "@syncfusion/ej2-base";
import { L10n } from "@syncfusion/ej2-base";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Stripe
const stripe = loadStripe(
  "pk_test_51JyIhdBhuxwlUlvDZhVWkZ9lkOMmEiUd0TcuENMKX1j9bEcYYYOdfLVHFQnhGriw3xc8XMfG8fotwE38j1L1i7rO00bIMERD3A"
);

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
      description: "Descripción",
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
          <td className="e-textlabel"></td>
          <td colSpan={4}>
            <DropDownListComponent
              id="EventType"
              data-name="EventType"
              className="e-field"
              type="hidden"
              style={{ width: "100%" }}
              dataSource={["Pendiente"]}
              value="Pendiente"
            ></DropDownListComponent>
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
          <td className="e-textlabel"></td>
          <td>
            <input
              id="IsReadonly"
              type="checkbox"
              className="e-field e-input"
              name="IsReadonly"
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
  const checkDate = (day) => {
    //Verifica que el día y hora escogido no sea antes que el presente
    return (props.data.startTime || props.data.StartTime) < day;
  };
  if (checkDate(today)) {
    alert(
      "Por favor seleccione un horario válido. En caso de que el problema persista, chequee que le fecha y hora que esté seleccionando no sea un día u hora que ya pasó"
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
  const [appointments, setAppointments] = useState(specialist.appointments);
  const [isLoading, setIsLoading] = useState(true); //Pantalla de carga
  const workingHours = specialist.hours; //Almacena la información referente al horario de trabajo del especialista
  let workingDays = []; //Almacena la información referente a los días de trabajo del especialista
  const numAppointments = specialist.appointments.length;
  const rep = /"/gi;
  
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
    if(result == 0 && (!done)) {
      setPaymentView(false);
      setDone(true);
    } else if( result == 1) {
      setPaymentView(true);
    } else if(result == 0 && (done)) {
      setPaymentView(true);
    } else {
      setPaymentView(false);
    }
    console.log('Probando');
    console.log(result);
  }


  const setScheduleData = () => {
    //Se encarga de insertarle los parametros necesarios al calendario para que este muestre las citas, días de trabajo y horarios del especialista
    setIsLoading(true);
    setIsLoading(false);
  };
  
  useEffect(() => {
    setScheduleData();
  });

  const getNewAppointment = (appointments) => {
    // Se crea el appointment que se subirá a Firestore
    const appointment = {
      Id: appointments[appointments.length - 1].Id,
      Description: appointments[appointments.length - 1].Description,
      StartTime: JSON.stringify(appointments[appointments.length - 1].StartTime).replace(rep,""),
      EndTime: JSON.stringify(appointments[appointments.length - 1].EndTime).replace(rep,""),
      isBlock: true,
      pacient: user.name,
      pacientEmail: user.email,
      pacientPhone: user.phone
    }
    // Se elimina el appointment con los datos innecesarios de appointments
    appointments = appointments.pop();
    // Se agrega el appointment creado
    appointments.push(appointment);

    return appointments;
  }

  const formatDate = (date) => {
    const dateAppointment = date.substring(4, 15);
    return dateAppointment;
  }

  const formatHour = (start, end) => {
    const startHour = start.substring(16, 21);
    const endHour = end.substring(16, 21);
    const hour = "De " + startHour + " a " + endHour;
    return hour;
  }



  function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [isPaymentLoading, setPaymentLoading] = useState(false);

    const payMoney = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      /*
      //Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: specialist.pay,
        currency: 'usd',
        const clientSecret = paymentIntent.client_secret;
      });
      */
      

      // Confirm Payment
      const clientSecret = 'aeiou';
      setPaymentLoading(true);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
            phone: user.phone,
            email: user.email
          },
        },
      });
    
      setPaymentLoading(false);
      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          alert("El pago fue realizado con éxito!");
        }
      }
    };

    return(
      <form onSubmit={payMoney}> 
        <CardElement />
        <button className="buttonSchedule">{isPaymentLoading ? "Cargando..." : "Pagar"}</button>
      </form>
    );
  }

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
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
              <button className="buttonSchedule" type="button" onClick={checkScheduling}>
                Continuar
              </button>
            </div>
          </div>

          {(!paymentView) ? (
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
              <p className="descriptionPayment">{formatDate(appointments[appointments.length - 1].StartTime.toString())}</p>
              <p className="titlePayment">Hora:</p>
              <p className="descriptionPayment">{formatHour(appointments[appointments.length - 1].StartTime.toString(), appointments[appointments.length - 1].EndTime.toString())}</p>
              <p className="titlePayment">Descripción:</p>
              <p className="descriptionPayment">{appointments[appointments.length - 1].Description}</p>
            </div>
            <div className="paymentColumn">
              <div className="price">
                  <p>Precio de la consulta</p>
                  <h1>$45</h1>
              </div>
              <Elements stripe={stripe}>
                {<CheckoutForm />}
              </Elements>
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
