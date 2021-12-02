//import { useEffect, useState } from "react";
//import { db } from "../utils/firebaseConfig";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import pictures from "../images/imagenes";
import Slide from "../components/HomeSlide/Slide";
import ansiedad from "../icons/anx.svg";
import estress from "../icons/stress.svg";
import pareja from "../icons/couple.svg";
import autoesti from "../icons/autos.svg";
import sex from "../icons/gender.svg";
function HomePage() {
  const specialist = [
    { name: "Pedro jose", email: "aladmadio@gmail.com", phone: "04124567845" },
    {
      name: "Luis alberto",
      email: "bellaquitaRemizzzzz@gmail.com",
      phone: "456849781",
    },
    { name: "jose luis", email: "aladmadio@gmail.com", phone: "04124567845" },
    {
      name: "maria josefina",
      email: "aladmadio@gmail.com",
      phone: "04124567845",
    },
    { name: "laura loca", email: "aladmadio@gmail.com", phone: "04124567845" },
  ];

  return (
    <>
      <section className={styles.banner}>
        <img src={pictures.home_p} alt="img_home" />
        <div className={styles.contenedor}>
          <h4>
            Las emociones inexpresadas nunca mueren. <br /> Son enterradas vivas
            y salen más tarde de peores formas ~ Freud
          </h4>
          <Link to="/register_pacient">
            <button type="button" className={styles.bttn}>
              ¡Quiero empezar!
            </button>
          </Link>
        </div>
      </section>

      <section className={styles.inline}>
        <section className={styles.welcome}>
          <h2>Psicólogos en línea</h2>
          <p>
            En Insight no nos limitamos al horario comercial, de lunes a
            viernes. Elija entre una variedad de terapeutas con diferentes
            antecedentes y especialidades, disponibles cuando usted lo desee.
          </p>
        </section>
        <section className={styles.items}>
          <article>
            <img
              id={styles["icons_psi"]}
              src={pictures.profesional}
              alt="home-professional"
            ></img>
            <h3>Profesional</h3>
            <p>
              Psicólogos <br /> con más de 5 años de experiencia profesional en
              el área clínica.
            </p>
          </article>
          <article>
            <img
              id={styles["icons_psi"]}
              src={pictures.access}
              alt="home-access"
            ></img>
            <h3>Accesible</h3>
            <p>El tiempo y la distancia ya no son problemas.</p>
            <p> Tu terapeuta siempre estará contigo cuando lo necesites.</p>
          </article>
          <article>
            <img
              id={styles["icons_psi"]}
              src={pictures.save}
              alt="home-save"
            ></img>
            <h3>Seguro</h3>
            <p>
              Mantenemos altos niveles de seguridad <br /> para cuidar y
              resguardar tu información.
            </p>
          </article>
        </section>
      </section>

      <section className={styles.listService}>
        <section className={styles.service}>
          <div className={styles.list}>
            <h3>Servicios que ofrecemos</h3>
            <p id={styles["pcontainer"]}>
              Éstas son algunas de las principales áreas que atienden nuestros
              psicólogos en línea
            </p>

            <div className={styles.icons_service}>
              <div>
                <img
                  id={styles["imagen_service"]}
                  src={ansiedad}
                  alt="ansiedad_icon"
                />
                <p>Ansiedad</p>
              </div>
              <div>
                <img
                  id={styles["imagen_service"]}
                  src={estress}
                  alt="Estres_icon"
                />
                <p>Estres </p>
              </div>
              <div>
                <img
                  id={styles["imagen_service"]}
                  src={pareja}
                  alt="ParejaProblem"
                />{" "}
                <p>Problemas de pareja</p>
              </div>
              <div>
                <img
                  id={styles["imagen_service"]}
                  src={autoesti}
                  alt="autoestima_icon"
                />{" "}
                <p>Autoestima</p>
              </div>

              <div>
                <img id={styles["imagen_service"]} src={sex} alt="SEX" />{" "}
                <p>Sexualidad y Genero</p>
              </div>
            </div>

            <Link to="/register_pacient" className={styles.cont}>
              <button type="button" className={styles.bttn}>
                ELIGE A TU PSICÓLOGO EN LÍNEA
              </button>
            </Link>
          </div>
        </section>
      </section>

      <section className={styles.functionTerapy}>
        <div className={styles.imgpsy}>
          <img
            src="https://www.psicoactiva.com/wp-content/uploads/2015/03/escoger-psicologo.jpg"
            alt="AAAAAAAA"
          />
        </div>
        <section className={styles.terapi}>
          <div className={styles.list}>
            <h3>¿Cómo funciona la terapia?</h3>
            <p id={styles["estilos_how"]}>
              Tomar terapia con un psicólogo que se adapte a tu estilo y ritmo
              de vida actual es fácil y seguro con Insight.
            </p>
            <br />
            <p id={styles["estilos_how"]}>
              Nosotros te ayudamos a buscar y seleccionar los mejores psicólogos
              en línea para tí!
            </p>

            <br />
            <p id={styles["estilos_how"]}>
              1. Selecciona el día y la hora que mejor se adapte a tu rutina
            </p>
            <br />
            <p id={styles["estilos_how"]}>
              2. Conecta a tus citas por videollamada de forma segura y privada
              a través de Insight
            </p>
            <Link to="/register_pacient" className={styles.cont}>
              <button type="button" className={styles.bttn}>
                QUIERO EMPEZAR
              </button>
            </Link>
          </div>
        </section>
      </section>

      <section className={styles.bannerFinal}>
        <div className={styles.contenedor}>
          <h3>¿Eres psicólogo clínico?</h3>
          <Link to="/register_specialist">
            <button type="button" className={styles.bttn}>
              ¡Aplica aquí!
            </button>
          </Link>
        </div>
      </section>

      <footer>
        <div className={styles.cont}>
          <div className={styles.imgRotar}>
            <img src={pictures.logoFooter} alt="logo-footer"></img>
          </div>
          <section className={styles.menuFooter}>
            <Link to="/login">
              <p>Acceder</p>
            </Link>
            <Link to="/register_specialist">
              <p>Soy un especialista</p>
            </Link>

            <Link to="/register_pacient">
              <p>Soy un paciente</p>
            </Link>

            <Link to="/">
              <p>Contáctanos</p>
            </Link>
          </section>
        </div>

        <section className={styles.piePag}>
          <address>Caracas, Venezuela</address>
          <small>&copy; Derechos Reservados 2021</small>
        </section>
      </footer>
    </>
  );
}

export default HomePage;
