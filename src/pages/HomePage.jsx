//import homePic from "../images/home_pic.jpg";
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
          <button type="button" className={styles.btn}>
            QUIERO EMPEZAR
          </button>
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

      <section>
        <div className={styles.welcome}>
          <h3>Servicios que ofrecemos</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolores.
          </p>
        </div>
        <div className={styles.listService}>
          <lu>
            <li>Ansiedad</li>
            <li>Estrés</li>
            <li>Problemas de parejas</li>
            <li>Autoestima</li>
            <li>Desarrollo personal</li>
            <li>Sexualiadad y género</li>
          </lu>
        </div>
        <button type="button" className={styles.btn}>
          Elije a tu psicolólogo en línea
        </button>
      </section>

      <section>
        <div className={styles.welcome}>
          <h3>Psicólogos experimentados y de confianza</h3>
          <p>
            Buscamos a los mejorespsicólogos con un promedio de 15 años de
            experiencia, nuestros psiquiatras y terapeutas cuentan con un
            profundo conocimiento clínico.
          </p>
        </div>
      </section>

      <section>
        <div className={styles.welcome}>
          <h3>¿Cómo funciona la terapia?</h3>
          <p>
            Tomar terapia con un psicólogo que se adapte a tu estilo y ritmo de
            vida actual es fácil y seguro con Insight.
          </p>
        </div>
      </section>

      <section>
        <div className={styles.welcome}>
          <h3>¿Eres psicólogo clínico?</h3>
          <p>
            Únete a la plataforma líder de terapia en línea y ayudemos a miles
            de personas a recuperar la estabilidad emocional que necesitan para
            su vida diaria. ¡Sé parte de nuestro equipo!
          </p>
        </div>
      </section>
      <footer>logo y otras cositas</footer>
    </>
  );
}

export default HomePage;
