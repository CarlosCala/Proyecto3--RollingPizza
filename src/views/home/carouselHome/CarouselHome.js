import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselHome = () => {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 carrousel-img"
            src="https://images.pexels.com/photos/3682837/pexels-photo-3682837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="pizzza"
          />
          <Carousel.Caption>
            <h3>Una pizzería donde la calidad es la prioridad número uno</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carrousel-img"
            src="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="pizza y cubiertos"
          />

          <Carousel.Caption>
            <h3>Sabor auténtico italiano en cada mordida</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carrousel-img"
            src="https://images.pexels.com/photos/3915855/pexels-photo-3915855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>
              Pide una pizza y conviértete en un fanático de nuestra calidad
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselHome;
