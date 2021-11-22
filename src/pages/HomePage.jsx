//import { useEffect, useState } from "react";
//import { db } from "../utils/firebaseConfig";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import pictures from "../images/imagenes";
import EspecialistCard from "../components/HomeEspecialistCard/HomeEspecialistCard";
import HomeComment from "../components/HomeComment/HomeComment";
import Slide from "../components/HomeSlide/Slide";

function HomePage() {
  const specialist = [
    { name: "Pedro jose", email: "aladmadio@gmail.com", phone: "04124567845" },
    {
      name: "Luis alberto",
      email: "aladmadio@gmail.com",
      phone: "04124567845",
    },
    { name: "jose luis", email: "aladmadio@gmail.com", phone: "04124567845" },
    {
      name: "maria josefina",
      email: "aladmadio@gmail.com",
      phone: "04124567845",
    },
    { name: "laura loca", email: "aladmadio@gmail.com", phone: "04124567845" },
  ];
  const coments = [
    {
      name: "Pedro jose",
      comment:
        "texto texto texto texto texto texto texto texto texto texto texto texto ",
      estrellas: "4",
    },
    {
      name: "Pedro jose",
      comment:
        "texto texto texto texto texto texto texto texto texto texto texto texto ",
      estrellas: "4",
    },
    {
      name: "Pedro jose",
      comment:
        "texto texto texto texto texto texto texto texto texto texto texto texto ",
      estrellas: "4",
    },
    {
      name: "Pedro jose",
      comment:
        "texto texto texto texto texto texto texto texto texto texto texto texto ",
      estrellas: "4",
    },
    {
      name: "Pedro jose",
      comment:
        "texto texto texto texto texto texto texto texto texto texto texto texto ",
      estrellas: "4",
    },
  ];
  return (
    <>
      <section className={styles.banner}>
        <img src={pictures.home_p} alt="img_home" />
        <div className={styles.contenedor}>
          <h4>
            Sigue a tu corazón pero lleva contigo a tu cerebro ~ Alfred Adler
          </h4>
          <Link to="/register_pacient">
            <button type="button" className={styles.bttn}>
              Quiero empezar!
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
            <img src={pictures.profesional} alt="home-professional"></img>
            <h3>Profesional</h3>
            <p>Lorem ipsum dolor sit amet, consectetuer ibh euis.</p>
          </article>
          <article>
            <img src={pictures.access} alt="home-access"></img>
            <h3>Accesible</h3>
            <p>Lorem ipsum dolor sit amet, consectetuer ibh euis.</p>
          </article>
          <article>
            <img src={pictures.save} alt="home-save"></img>
            <h3>Seguro</h3>
            <p>Lorem ipsum dolor sit amet, consectetuer ibh euis.</p>
          </article>
        </section>
      </section>

      <section className={styles.listService}>
        <div className={styles.imgRotar}>
          <img src={pictures.service} alt="home-service"></img>
        </div>
        <section className={styles.service}>
          <div className={styles.list}>
            <h3>Servicios que ofrecemos</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolores.
            </p>

            <lu>
              <li>Ansiedad</li>
              <li>Estrés</li>
              <li>Problemas de parejas</li>
              <li>Autoestima</li>
              <li>Desarrollo personal</li>
              <li>Sexualiadad y género</li>
            </lu>

            <Link to="/register_pacient" className={styles.cont}>
              <button type="button" className={styles.bttn}>
                ELIJE A TU PSICÓLOGO EN LÍNEA
              </button>
            </Link>
          </div>
        </section>
      </section>

      <section className={styles.psico}>
        <div className={styles.welcome}>
          <h3>Psicólogos experimentados y de confianza</h3>
          <p>
            Buscamos a los mejores spsicólogos con un promedio de 15 años de
            experiencia, nuestros psiquiatras y terapeutas cuentan con un
            profundo conocimiento clínico.
          </p>
        </div>

        <section>
          <EspecialistCard
            name={specialist[0].name}
            email={specialist[0].email}
            phone={specialist[0].phone}
          />
        </section>

        <div className={styles.cont}>
          <Link to="/register_pacient">
            <button type="button" className={styles.bttn}>
              VER MÁS
            </button>
          </Link>
        </div>
      </section>

      <section className={styles.functionTerapy}>
        <section className={styles.terapi}>
          <div className={styles.list}>
            <h3>¿Cómo funciona la terapia?</h3>
            <p>
              Tomar terapia con un psicólogo que se adapte a tu estilo y ritmo
              de vida actual es fácil y seguro con Insight.
            </p>

            <lu>
              <li>
                Nosotros te ayudamos a buscar y seleccionar los mejores
                psicólogos en línea para tí!
              </li>
              <li>
                Selecciona el día y la hora que mejor se adapte a tu rutina
              </li>
              <li>
                Conecta a tus citas por videollamada de forma segura y privada a
                través de Insight
              </li>
            </lu>

            <Link to="/register_pacient" className={styles.cont}>
              <button type="button" className={styles.bttn}>
                QUIERO EMPEZAR
              </button>
            </Link>
          </div>
        </section>
        <div className={styles.imgRotar}>
          <img src={pictures.terapia} alt="home-terapia"></img>
        </div>
      </section>

      <section>
        <HomeComment
          name={coments[0].name}
          comment={coments[0].comment}
          starts={coments[0].estrellas}
        />
      </section>

      <section>
        <Slide />
      </section>

      <section className={styles.bannerFinal}>
        <img src={pictures.clinico} alt="img_clinico" />
        <div className={styles.contenedor}>
          <h3>¿Eres psicólogo clínico?</h3>
          <Link to="/register_specialist">
            <button type="button" className={styles.bttn}>
              Aplica aquí!
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
