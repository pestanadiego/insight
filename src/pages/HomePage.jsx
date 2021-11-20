//import { useEffect, useState } from "react";
//import { db } from "../utils/firebaseConfig";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import pictures from "../images/imagenes";

function HomePage() {
  return (
    <>
      <section className={styles.banner}>
        <img src={pictures.home_p} alt="img_home" />
        <div className={styles.contenedor}>
          <h4>
            Sigue a tu corazón pero lleva contigo a tu cerebro ~ Alfred Adler
          </h4>
          <Link to="/register_pacient">
            <button type="button" className={styles.btn}>
              QUIERO EMPEZAR
            </button>
          </Link>
        </div>
      </section>

      <section className={styles.welcome}>
        <h3>Psicólogos en línea</h3>
        <p>
          En Insight no nos limitamos al horario comercial, de lunes a viernes.
          Elija entre una variedad de terapeutas con diferentes antecedentes y
          especialidades, disponibles cuando usted lo desee.
        </p>
      </section>
      <section className={styles.items}>
        <div className="contenedor">
          <article>
            <img src={pictures.profesional} alt="wait to load"></img>
            <h3>Profesional</h3>
            <p>Lorem ipsum dolor sit amet, consectetuer ibh euis.</p>
          </article>
          <article>
            <img src={pictures.access} alt="wait to load"></img>
            <h3>Accesible</h3>
            <p>Lorem ipsum dolor sit amet, consectetuer ibh euis.</p>
          </article>
          <article>
            <img src={pictures.save} alt="wait to load"></img>
            <h3>Seguro</h3>
            <p>Lorem ipsum dolor sit amet, consectetuer ibh euis.</p>
          </article>
        </div>
      </section>
      <section className={styles.listService}>
        <div className={styles.imgRotar}>
          <img src={pictures.service} alt="wait to load"></img>
        </div>
        <div className={styles.welcome}>
          <h3>Servicios que ofrecemos</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolores.
          </p>
        </div>
        <lu>
          <li>Ansiedad</li>
          <li>Estrés</li>
          <li>Problemas de parejas</li>
          <li>Autoestima</li>
          <li>Desarrollo personal</li>
          <li>Sexualiadad y género</li>
        </lu>
        <div className={styles.cont}>
          <Link to="/register_pacient">
            <button type="button" className={styles.btn}>
              ELIJE A TU PSICÓLOGO EN LÍNEA
            </button>
          </Link>
        </div>
      </section>

      <section>
        <div className={styles.welcome}>
          <h3>Psicólogos experimentados y de confianza</h3>
          <p>
            Buscamos a los mejores spsicólogos con un promedio de 15 años de
            experiencia, nuestros psiquiatras y terapeutas cuentan con un
            profundo conocimiento clínico.
          </p>
        </div>
        <h1>SLIDE CON ESPECIALISTAS</h1>
        <div className={styles.cont}>
          <Link to="/register_especialist">
            <button type="button" className={styles.btn}>
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
              <button type="button" className={styles.btn}>
                QUIERO EMPEZAR
              </button>
            </Link>
          </div>
        </section>
        <div className={styles.imgRotar}>
          <img src={pictures.service} alt="wait to load"></img>
        </div>
      </section>

      <section>
        <h1>SLIDE CON COMENTARIOS</h1>
      </section>

      <section className={styles.bannerFinal}>
        <img src={pictures.clinico} alt="img_clinico" />
        <div className={styles.contenedor}>
          <h3>¿Eres psicólogo clínico?</h3>
          <Link to="/register_specialist">
            <button type="button" className={styles.btn}>
              APLICAR AQUÍ!
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
