import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import ScheduleAppointment from "../components/ScheduleAppointment/ScheduleAppointment";
import { db } from "../utils/firebaseConfig";

function ReserveAppointmentPage() {
  let { specialistId } = useParams();
  const [specialist, setSpecialist] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //Busca el usuario correspondiente al id del URL
  const fetchSpecialist = async () => {
    try {
      setIsLoading(true);
      const res = await db.collection("specialists").doc(specialistId).get();
      const response = res.data();
      setSpecialist(response);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchSpecialist();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1> Loading...</h1>
      ) : (
        <ScheduleAppointment specialist={specialist} />
      )}
    </>
  );
}

export default ReserveAppointmentPage;
