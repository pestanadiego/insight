import { useState } from "react";
import flechaAzulLeft from "../../icons/blueArrowLeft.svg";
import flechaAzulRight from "../../icons/blueArrowRight.svg";
import styles from "./Slide.module.css";
import EspecialistCard from "../HomeEspecialistCard/HomeEspecialistCard";

function Slide({ slides }) {
  const [current, setCurrent] = useState(0);
  const largo = slides.length;

  const nextSlide = () => {
    setCurrent(current === largo - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? largo - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  return (
    <>
      <section className={styles.slider}>
        <img
          src={flechaAzulLeft}
          alt="flecha"
          className="left-arrow"
          onClick={prevSlide}
        />
        <div className={styles.slick}>
          {slides.map((slide, index) => {
            return (
              <div key={index}>
                <EspecialistCard
                  name={slide.name}
                  email={slide.email}
                  phone={slide.phone}
                />
              </div>
            );
          })}
        </div>
        <img
          src={flechaAzulRight}
          alt="flecha"
          className="right-arrow"
          onClick={nextSlide}
        />
      </section>
    </>
  );
}

export default Slide;
