import "./styles/main.css";
import Carousel from "./components/carousel";

function Main() {
  return (
    <div className="Main">
      <div className="carusel">
        <Carousel />
      </div>
      <div className="recomend">가장 인기있는 포메이션</div>
    </div>
  );
}

export default Main;
