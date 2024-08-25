import "../styles/carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import carouselImg1 from "../images/carousel1.jpg";
import carouselImg2 from "../images/carousel2.jpg";
import carouselImg3 from "../images/carousel3.jpg";
import carouselImg4 from "../images/carousel4.jpg";
import carouselImg5 from "../images/carousel5.jpg";
function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div>
      <Slider className="carousel-items" {...settings}>
        <div className="carousel-item">
          <img
            className="carousel-img"
            src={carouselImg1}
            alt="캐러셀이미지"
          ></img>
        </div>
        <div className="carousel-item">
          <img
            className="carousel-img"
            src={carouselImg2}
            alt="캐러셀이미지"
          ></img>
        </div>
        <div className="carousel-item">
          <img
            className="carousel-img"
            src={carouselImg3}
            alt="캐러셀이미지"
          ></img>
        </div>
        <div className="carousel-item">
          <img
            className="carousel-img"
            src={carouselImg4}
            alt="캐러셀이미지"
          ></img>
        </div>
        <div className="carousel-item">
          <img
            className="carousel-img"
            src={carouselImg5}
            alt="캐러셀이미지"
          ></img>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
