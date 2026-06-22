import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { storeImages } from "../data/storeImages";

export function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = storeImages.slides;

  function goToSlide(index: number) {
    setActiveSlide((index + slides.length) % slides.length);
  }

  return (
    <section className="hero-slider" aria-label="Destaques da loja">
      <div className="hero-slider__viewport">
        <div className="hero-slider__track" aria-live="polite">
          {slides.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt={`Banner promocional ${index + 1}`}
              className={`hero-slider__slide${index === activeSlide ? " is-active" : ""}`}
              aria-hidden={index !== activeSlide}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>

        <button
          type="button"
          className="hero-slider__nav hero-slider__nav--prev"
          aria-label="Banner anterior"
          onClick={() => goToSlide(activeSlide - 1)}
        >
          <FiChevronLeft aria-hidden="true" />
        </button>

        <button
          type="button"
          className="hero-slider__nav hero-slider__nav--next"
          aria-label="Próximo banner"
          onClick={() => goToSlide(activeSlide + 1)}
        >
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="hero-slider__dots">
        {slides.map((slide, index) => (
          <button
            key={slide}
            type="button"
            className={`hero-slider__dot${index === activeSlide ? " is-active" : ""}`}
            aria-label={`Ir para banner ${index + 1}`}
            aria-current={index === activeSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
