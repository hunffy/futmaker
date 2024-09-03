import React, { useState } from "react";
import Squad from "../images/squad.png";
import "../styles/maker.css";
import UniformList from "../components/uniformList";

function Maker() {
  const [squadName, setSquadName] = useState("");
  const [selectedUniforms, setSelectedUniforms] = useState([]);

  const handleDrop = (e, index) => {
    e.preventDefault();
    const uniform = e.dataTransfer.getData("text/plain");
    const newUniforms = [...selectedUniforms];
    newUniforms[index] = uniform; // 드롭한 위치에 유니폼 이미지 배치
    setSelectedUniforms(newUniforms);
  };

  const handleDragStart = (e, uniform) => {
    e.dataTransfer.setData("text/plain", uniform);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // 드래그 오버 시 기본 동작 방지
  };

  return (
    <div className="maker">
      <div className="squadmaker-wrapper">
        <div className="loadSuqad">
          <button className="loadsquad-btn">불러오기</button>
        </div>
        <div className="squad">
          <img className="squad-img" src={Squad} alt="스쿼드판" />
          <input
            type="text"
            placeholder="스쿼드명을 입력하세요."
            onChange={(e) => setSquadName(e.target.value)}
          />
          <button>최종제출</button>
          <div className="selected-uniforms">
            {selectedUniforms.map((uniform, index) => (
              <img
                key={index}
                src={uniform}
                alt={`유니폼 ${index + 1}`}
                className="selected-uniform"
                draggable
                onDragStart={(e) => handleDragStart(e, uniform)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="select-uniforms">
        <select className="select-position">
          <option>1-3-2</option>
          <option>1-2-3</option>
          <option>1-2-1-2</option>
          <option>1-3-1-1</option>
        </select>
        <div className="select-uniform">
          <UniformList
            onSelectUniform={(uniform) =>
              setSelectedUniforms((prev) => [...prev, uniform])
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Maker;
