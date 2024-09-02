import "../styles/uniformlist.css";
import uniform1 from "../images/uniformList/blue.png";
import uniform2 from "../images/uniformList/blue2.png";
import uniform3 from "../images/uniformList/green.png";
import uniform4 from "../images/uniformList/red1.png";
import uniform5 from "../images/uniformList/red2.png";
import uniform6 from "../images/uniformList/red3.png";
import uniform7 from "../images/uniformList/sky.png";
import uniform8 from "../images/uniformList/sky2.png";
import uniform9 from "../images/uniformList/sky3.png";
import uniform10 from "../images/uniformList/white.png";
function UniformList() {
  return (
    <div className="uniform-list">
      <img className="uniform-img" src={uniform1} alt="유니폼이미지" />
      <img className="uniform-img" src={uniform2} alt="유니폼이미지" />
      <img className="uniform-img" src={uniform3} alt="유니폼이미지" />
      <img className="uniform-img" src={uniform4} alt="유니폼이미지" />
      <img className="uniform-img" src={uniform5} alt="유니폼이미지" />
      <img className="uniform-img" src={uniform6} alt="유니폼이미지" />
      <img className="uniform-img" src={uniform7} alt="유니폼이미지" />
      <img className="uniform-img" src={uniform8} alt="유니폼이미지" />
      <img className="uniform-img" src={uniform9} alt="유니폼이미지" />
      <img className="uniform-img" src={uniform10} alt="유니폼이미지" />
    </div>
  );
}

export default UniformList;
