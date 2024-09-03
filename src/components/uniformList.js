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

const uniforms = [
  uniform1,
  uniform2,
  uniform3,
  uniform4,
  uniform5,
  uniform6,
  uniform7,
  uniform8,
  uniform9,
  uniform10,
];

function UniformList({ onSelectUniform }) {
  const handleDragStart = (e, uniform) => {
    e.dataTransfer.setData("text/plain", uniform);
  };

  return (
    <div className="uniform-list">
      {uniforms.map((uniform, index) => (
        <img
          key={index}
          className="uniform-img"
          src={uniform}
          alt="유니폼이미지"
          onClick={() => onSelectUniform(uniform)}
          draggable
          onDragStart={(e) => handleDragStart(e, uniform)}
        />
      ))}
    </div>
  );
}

export default UniformList;
