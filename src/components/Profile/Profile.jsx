import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { db, auth } from "../../utils/firebaseConfig";
import styles from "./Profile.module.css";
import pending from "../../icons/pending.svg";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    description: "",
    speciality: "",
    time_start: "",
    time_end: "",
    payment: "",
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  });

  // CAMBIOS EN EL ESPECIALISTA
  const handleSubmitSpecialist = async (event) => {
    event.preventDefault();
    // Igual al paciente
    if (values.name != "") {
      user.name = values.name; // Se actualiza en el userContext
      // Se actualiza en el módulo de autenticación
      await auth.currentUser.updateProfile({
        displayName: values.name,
      });
      // Se actualiza en la base de datos
      await db.collection("users").doc(user.uid).update({ name: values.name });
      await db
        .collection("specialists")
        .doc(user.uid)
        .update({ name: values.name });
    }
    if (values.email != "") {
      user.email = values.email; // Se actualiza en el context
      // Se actualiza en el módulo de autenticación
      await auth.currentUser.updateEmail(values.email);
      // Se actualiza en la base de datos
      await db
        .collection("users")
        .doc(user.uid)
        .update({ email: values.email });
      await db
        .collection("specialists")
        .doc(user.uid)
        .update({ email: values.email });
    }
    if (values.phone != "") {
      user.phone = values.phone;
      await db
        .collection("users")
        .doc(user.uid)
        .update({ phone: values.phone });
      await db
        .collection("specialists")
        .doc(user.uid)
        .update({ phone: values.phone });
    }
    if (values.password != "") {
      await auth.currentUser.updatePassword(values.password);
    }
    if (values.description != "") {
      user.description = values.description;
      await db
        .collection("users")
        .doc(user.uid)
        .update({ description: values.description });
      await db
        .collection("specialists")
        .doc(user.uid)
        .update({ description: values.description });
    }

    // Adicional
    if (values.speciality != "") {
      const specialityArray = arraySpeciality(values.speciality);
      user.speciality = specialityArray; // Se actualiza en el userContext
      // Se actualiza en la base de datos
      await db
        .collection("users")
        .doc(user.uid)
        .update({ speciality: specialityArray });
      await db
        .collection("specialists")
        .doc(user.uid)
        .update({ speciality: specialityArray });
    }
    if (values.payment != "") {
      user.payment = values.payment; // Se actualiza en el userContext
      // Se actualiza en la base de datos
      await db
        .collection("users")
        .doc(user.uid)
        .update({ payment: values.payment });
      await db
        .collection("specialists")
        .doc(user.uid)
        .update({ payment: values.payment });
    }
    if (values.time_start != "" && values.time_end != "") {
      let hoursArray = [];
      hoursArray.push(values.time_start);
      hoursArray.push(values.time_end);
      user.hours = hoursArray; // Se actualiza en el userContext
      await db.collection("users").doc(user.uid).update({ hours: hoursArray });
      await db
        .collection("specialists")
        .doc(user.uid)
        .update({ hours: hoursArray });
    }
    // Se actualizan los días de trabajo
    const daysOfWork = workDays();
    user.work = daysOfWork; // en el userContext
    await db.collection("users").doc(user.uid).update({ work: daysOfWork });
    await db
      .collection("specialists")
      .doc(user.uid)
      .update({ work: daysOfWork });
    editProfile(false);
    checkStatus();
  };

  // Función para saber si el especialista ya rellenó todos sus datos
  const checkStatus = async () => {
    let counter = 0;
    user.work.length != 0 && counter++;
    console.log(counter);
    !!user.description && counter++;
    console.log(counter);
    !!user.payment && counter++;
    console.log(counter);
    user.work.length != 0 && counter++;
    console.log(counter);
    user.hours.length != 0 && counter++;
    console.log(counter);
    if (counter == 5) {
      user.status = "yes";
      await db.collection("users").doc(user.uid).update({ status: "yes" });
      await db
        .collection("specialists")
        .doc(user.uid)
        .update({ status: "yes" });
    }
  };

  const workDays = () => {
    let workDays = [];
    if (values.lunes != "") {
      workDays.push(values.lunes);
    }
    if (values.martes != "") {
      workDays.push(values.martes);
    }
    if (values.miercoles != "") {
      workDays.push(values.miercoles);
    }
    if (values.jueves != "") {
      workDays.push(values.jueves);
    }
    if (values.viernes != "") {
      workDays.push(values.viernes);
    }
    if (values.sabado != "") {
      workDays.push(values.sabado);
    }
    if (values.domingo != "") {
      workDays.push(values.domingo);
    }
    return workDays;
  };

  const arraySpeciality = (specialityString) => {
    const string = specialityString.toLowerCase();
    const specialityArray = string.split(",");
    return specialityArray;
  };

  // CAMBIOS EN EL USUARIO
  const handleSubmitPacient = async (event) => {
    event.preventDefault();
    if (values.name != "") {
      user.name = values.name; // Se actualiza en el userContext
      // Se actualiza en el módulo de autenticación
      await auth.currentUser.updateProfile({
        displayName: values.name,
      });
      // Se actualiza en la base de datos
      await db.collection("users").doc(user.uid).update({ name: values.name });
      await db
        .collection("pacients")
        .doc(user.uid)
        .update({ name: values.name });
    }
    if (values.email != "") {
      user.email = values.email; // Se actualiza en el context
      // Se actualiza en el módulo de autenticación
      await auth.currentUser.updateEmail(values.email);
      // Se actualiza en la base de datos
      await db
        .collection("users")
        .doc(user.uid)
        .update({ email: values.email });
      await db
        .collection("pacients")
        .doc(user.uid)
        .update({ email: values.email });
    }
    if (values.phone != "") {
      user.phone = values.phone;
      await db
        .collection("users")
        .doc(user.uid)
        .update({ phone: values.phone });
      await db
        .collection("pacients")
        .doc(user.uid)
        .update({ phone: values.phone });
    }
    if (values.password != "") {
      await auth.currentUser.updatePassword(values.password);
    }
    if (values.description != "") {
      user.description = values.description;
      await db
        .collection("users")
        .doc(user.uid)
        .update({ description: values.description });
      await db
        .collection("pacients")
        .doc(user.uid)
        .update({ description: values.description });
    }
    editProfile(false);
  };

  // Para cambiar de vista
  const editProfile = (boolean) => {
    setEdit(boolean);
  };

  // Mostrar o no la contraseña
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Se encarga de los cambios que ocurren en los input
  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    setValues({ ...values, [inputName]: value });
  };

  const renderSpeciality = () => {
    let render = "";
    for (let i = 0; i < user.speciality.length; i++) {
      const speciality = user.speciality[i];
      render += speciality + " ";
    }
    return render;
  };

  const renderHours = () => {
    let render = "De " + user.hours[0] + " a " + user.hours[1];
    return render;
  };

  const renderWorkDays = () => {
    let render = "";
    if (!!!user.work) {
      return null;
    } else {
      for (let i = 0; i < user.work.length; i++) {
        const workDay = user.work[i];
        if (workDay === "1") {
          render += "Lunes ";
        } else if (workDay === "2") {
          render += "Martes ";
        } else if (workDay === "3") {
          render += "Miércoles ";
        } else if (workDay === "4") {
          render += "Jueves ";
        } else if (workDay === "5") {
          render += "Viernes ";
        } else if (workDay === "6") {
          render += "Sábado ";
        } else if (workDay === "0") {
          render += "Domingo ";
        }
      }
      console.log(render);
      return render;
    }
  };
  useEffect(() => {
    if (user.role === "specialist") {
      checkStatus();
    }
  });
  if (user.role === "pacient") {
    return (
      <div className={styles.profile}>
        <h1>Mi perfil</h1>
        <div className={styles.profileInformation}>
          {!edit ? (
            <>
              <div className={styles.profileInfo}>
                <p className={styles.profileTitle}>Nombre:</p>
                <p>{user.name}</p>
              </div>
              <div className={styles.profileInfo}>
                <p className={styles.profileTitle}>Correo electrónico:</p>
                <p>{user.email}</p>
              </div>
              <div className={styles.profileInfo}>
                <p className={styles.profileTitle}>Número telefónico:</p>
                <p>{user.phone}</p>
              </div>
              <div className={styles.profileInfo}>
                <p className={styles.profileTitle}>Descripción:</p>
                <p>{user.description}</p>
              </div>
              <div className={styles.buttonProfileContainer}>
                <button
                  type="button"
                  className={styles.buttonProfile}
                  onClick={() => editProfile(true)}
                >
                  Modificar perfil
                </button>
              </div>
            </>
          ) : (
            <form action="submit" onSubmit={handleSubmitPacient}>
              <div className={styles.formProfile}>
                <div className={styles.inputProfile}>
                  <label className={styles.profileTitle} htmlFor="name">
                    Nombre:
                  </label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder={user.name}
                    value={values.name}
                    onChange={handleOnChange}
                  />
                </div>
                <div className={styles.inputProfile}>
                  <label className={styles.profileTitle} htmlFor="email">
                    Correo electrónico:
                  </label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder={user.email}
                    value={values.email}
                    onChange={handleOnChange}
                  />
                </div>
                <div className={styles.inputProfile}>
                  <label className={styles.profileTitle} htmlFor="phone">
                    Número telefónico:
                  </label>
                  <input
                    name="phone"
                    id="phone"
                    type="tel"
                    placeholder={user.phone}
                    value={values.phone}
                    onChange={handleOnChange}
                  />
                </div>
                <div className={styles.inputProfile}>
                  <label className={styles.profileTitle} htmlFor="password">
                    Contraseña:
                  </label>
                  <div className={styles.togglePassword}>
                    <input
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleOnChange}
                    />
                    <input
                      type="checkbox"
                      style={{ width: "20px" }}
                      onClick={togglePassword}
                    />
                    Ver
                  </div>
                </div>
                <div className={styles.inputProfile}>
                  <label className={styles.profileTitle} htmlFor="description">
                    Descripción:
                  </label>
                  <textarea
                    name="description"
                    placeholder={user.description}
                    rows="2"
                    cols="50"
                    onChange={handleOnChange}
                  ></textarea>
                </div>
                <div className={styles.buttonProfileContainer}>
                  <button className={styles.buttonProfile} type="submit">
                    Guardar cambios
                  </button>
                  <button
                    type="button"
                    className={styles.buttonProfile}
                    onClick={() => editProfile(false)}
                  >
                    Descartar
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  if (user.role === "specialist") {
    return (
      <div className={styles.profile}>
        <h1>Mi perfil</h1>
        {user.status === "no" && (
          <div className={styles.uncompletedInfo}>
            <img src={pending} alt="pending" />
            <p>
              Rellene los datos faltantes. De no hacerlo, los pacientes no
              podrán localizarlo.
            </p>
          </div>
        )}
        <div className={styles.profileInformation}>
          {!edit ? (
            <>
              <div className={styles.specialistInfo}>
                <div className={styles.firstColumn}>
                  <div className={styles.profileInfo}>
                    <p className={styles.profileTitle}>Nombre:</p>
                    <p>{user.name}</p>
                  </div>
                  <div className={styles.profileInfo}>
                    <p className={styles.profileTitle}>Correo electrónico:</p>
                    <p>{user.email}</p>
                  </div>
                  <div className={styles.profileInfo}>
                    <p className={styles.profileTitle}>Número telefónico:</p>
                    <p>{user.phone}</p>
                  </div>
                  <div className={styles.profileInfo}>
                    <p className={styles.profileTitle}>Descripción:</p>
                    <p>{user.description}</p>
                  </div>
                </div>
                <div className={styles.secondColumn}>
                  <div className={styles.profileInfo}>
                    <p className={styles.profileTitle}>Especialidades:</p>
                    <p>{!!user.speciality ? renderSpeciality() : null}</p>
                  </div>
                  <div className={styles.profileInfo}>
                    <p className={styles.profileTitle}>Horario de trabajo: </p>
                    <p>{!!user.hours ? renderHours() : null}</p>
                  </div>
                  <div className={styles.profileInfo}>
                    <p className={styles.profileTitle}>Días laborales: </p>
                    <p>{renderWorkDays()}</p>
                  </div>
                  <div className={styles.profileInfo}>
                    <p className={styles.profileTitle}>Costo de consulta:</p>
                    <p>${user.payment}</p>
                  </div>
                </div>
              </div>
              <div className={styles.buttonProfileContainer}>
                <button
                  type="button"
                  className={styles.buttonProfile}
                  onClick={() => editProfile(true)}
                >
                  Modificar perfil
                </button>
              </div>
            </>
          ) : (
            <form action="submit" onSubmit={handleSubmitSpecialist}>
              <div className={styles.formProfile}>
                <div class={styles.specialistForm}>
                  <div className={styles.firstColumn}>
                    <div className={styles.inputProfile}>
                      <label className={styles.profileTitle} htmlFor="name">
                        Nombre:
                      </label>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        placeholder={user.name}
                        value={values.name}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className={styles.inputProfile}>
                      <label className={styles.profileTitle} htmlFor="email">
                        Correo electrónico:
                      </label>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        placeholder={user.email}
                        value={values.email}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className={styles.inputProfile}>
                      <label className={styles.profileTitle} htmlFor="phone">
                        Número telefónico:
                      </label>
                      <input
                        name="phone"
                        id="phone"
                        type="tel"
                        placeholder={user.phone}
                        value={values.phone}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className={styles.inputProfile}>
                      <label className={styles.profileTitle} htmlFor="password">
                        Contraseña:
                      </label>
                      <div className={styles.togglePassword}>
                        <input
                          name="password"
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={values.password}
                          onChange={handleOnChange}
                        />
                        <input
                          type="checkbox"
                          style={{ width: "20px" }}
                          onClick={togglePassword}
                        />
                        Ver
                      </div>
                    </div>
                    <div className={styles.inputProfile}>
                      <label
                        className={styles.profileTitle}
                        htmlFor="description"
                      >
                        Descripción:
                      </label>
                      <textarea
                        name="description"
                        placeholder={user.description}
                        rows="2"
                        cols="50"
                        onChange={handleOnChange}
                      ></textarea>
                    </div>
                    <div className={styles.inputProfile}>
                      <label
                        className={styles.profileTitle}
                        htmlFor="speciality"
                      >
                        Especialidades (,):
                      </label>
                      <input
                        name="speciality"
                        id="speciality"
                        type="text"
                        placeholder={user.speciality}
                        value={values.speciality}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className={styles.inputProfile}>
                      <label
                        className={styles.profileTitle}
                        htmlFor="description"
                      >
                        Costo de la consulta:
                      </label>
                      <input
                        name="payment"
                        id="payment"
                        type="text"
                        placeholder="Monto en dólares"
                        value={values.payment}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>

                  <div className={styles.secondColumn}>
                    <div className={styles.inputProfile}>
                      <label className={styles.profileTitle} htmlFor="email">
                        Horario de trabajo:
                      </label>
                      <input
                        name="time_start"
                        id="time_start"
                        type="time"
                        placeholder=""
                        value={values.time_start}
                        onChange={handleOnChange}
                      />
                      <input
                        name="time_end"
                        id="time_end"
                        type="time"
                        placeholder=""
                        value={values.time_end}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className={styles.inputProfile}>
                      <p className={styles.profileTitle} htmlFor="email">
                        Días laborales:
                      </p>
                      <div className={styles.checkboxWork}>
                        <input
                          name="lunes"
                          id="lunes"
                          type="checkbox"
                          value="1"
                        />
                        <label htmlFor="lunes">Lunes</label>
                        <input
                          name="martes"
                          id="martes"
                          type="checkbox"
                          onChange={handleOnChange}
                          value="2"
                        />
                        <label htmlFor="martes">Martes</label>
                        <input
                          name="miercoles"
                          id="miercoles"
                          type="checkbox"
                          onChange={handleOnChange}
                          value="3"
                        />
                        <label htmlFor="miercoles">Miércoles</label>
                        <input
                          name="jueves"
                          id="jueves"
                          type="checkbox"
                          onChange={handleOnChange}
                          value="4"
                        />
                        <label htmlFor="jueves">Jueves</label>
                        <input
                          name="viernes"
                          id="viernes"
                          type="checkbox"
                          onChange={handleOnChange}
                          value="5"
                        />
                        <label htmlFor="viernes">Viernes</label>
                        <input
                          name="sabado"
                          id="sabado"
                          type="checkbox"
                          onChange={handleOnChange}
                          value="6"
                        />
                        <label htmlFor="sabado">Sábado</label>
                        <input
                          name="domingo"
                          id="domingo"
                          type="checkbox"
                          onChange={handleOnChange}
                          value="0"
                        />
                        <label htmlFor="domingo">Domingo</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.buttonProfileContainer}>
                <button className={styles.buttonProfile} type="submit">
                  Guardar cambios
                </button>
                <button
                  type="button"
                  className={styles.buttonProfile}
                  onClick={() => editProfile(false)}
                >
                  Descartar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
