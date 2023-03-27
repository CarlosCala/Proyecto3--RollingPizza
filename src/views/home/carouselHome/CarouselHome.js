import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselHome = () => {
  return (
    <div>
      <Carousel fade>
      <Carousel.Item >
        <img
          className="d-block w-100 carrousel-img"
          src="https://images.pexels.com/photos/3682837/pexels-photo-3682837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="pizzza"
          
        />
        <Carousel.Caption>
          <h3>Proba las mejores pizzas</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carrousel-img" 
          src="https://images4.alphacoders.com/144/144528.jpg"
          alt="pizza y cubiertos"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carrousel-img"
          src="https://images3.alphacoders.com/144/144529.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
};

export default CarouselHome;
