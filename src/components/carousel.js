import "../styles/carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselImg1 from "../imges/carousel1.jpg";
import CarouselImg2 from "../imges/carousel2.jpg";
import CarouselImg3 from "../imges/carousel3.jpg";
import CarouselImg4 from "../imges/carousel4.jpg";
import CarouselImg5 from "../imges/carousel5.jpg";
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
            src={CarouselImg1}
            alt="캐러셀이미지"
          ></img>
        </div>
        <div className="carousel-item">
          <img
            className="carousel-img"
            src={CarouselImg2}
            alt="캐러셀이미지"
          ></img>
        </div>
        <div className="carousel-item">
          <img
            className="carousel-img"
            src={CarouselImg3}
            alt="캐러셀이미지"
          ></img>
        </div>
        <div className="carousel-item">
          <img
            className="carousel-img"
            src={CarouselImg4}
            alt="캐러셀이미지"
          ></img>
        </div>
        <div className="carousel-item">
          <img
            className="carousel-img"
            src={CarouselImg5}
            alt="캐러셀이미지"
          ></img>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
