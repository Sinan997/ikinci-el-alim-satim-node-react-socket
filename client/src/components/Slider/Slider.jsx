import React from "react";
import "./slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Slider() {
  return (
    <Carousel>
      <div>
        <img src={"./sliders/slider1.png"} alt="" />
      </div>
      <div>
        <img src="./sliders/slider2.png" alt="" />
      </div>
      <div>
        <img src="./sliders/slider3.png" alt="" />
      </div>
      <div>
        <img src="./sliders/slider4.png" alt="" />
      </div>
      <div>
        <img src="./sliders/slider5.png" alt="" />
      </div>
    </Carousel>
  );
}

export default Slider;
