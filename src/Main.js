import "./styles/main.css";
import Carousel from "./components/carousel";
import RecomendImg from "./images/recomend.png";
function Main() {
  return (
    <div className="Main">
      <div className="carusel">
        <Carousel />
      </div>
      <div className="recomend">
        <div className="item">
          <div className="item-info">
            <h1>1-3-2</h1>
            <h4>작성자이름</h4>
          </div>
          <img src={RecomendImg} alt="인기이미지"></img>
        </div>
        <div className="item">
          <div className="item-info">
            <h1>1-2-3</h1>
            <h4>작성자이름</h4>
          </div>
          <img src={RecomendImg} alt="인기이미지"></img>
        </div>
        <div className="item">
          <div className="item-info">
            <h1>1-2-1-2</h1>
            <h4>작성자이름</h4>
          </div>
          <img src={RecomendImg} alt="인기이미지"></img>
        </div>
      </div>
    </div>
  );
}

export default Main;
