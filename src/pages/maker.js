import React, { useState } from "react";
import Squad from "../images/squad.png";
import "../styles/maker.css";
import UniformList from "../components/uniformList";

function Maker() {
  const [squadName, setSquadName] = useState("");
  const [selectedUniforms, setSelectedUniforms] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const newUniforms = [...selectedUniforms];
    const draggedUniform = newUniforms[draggedIndex];

    if (index !== draggedIndex) {
      newUniforms.splice(draggedIndex, 1);
      newUniforms.splice(index, 0, draggedUniform);
    }

    setSelectedUniforms(newUniforms);
    setDraggedIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSelectUniform = (uniformData) => {
    if (selectedUniforms.length < 6) {
      setSelectedUniforms((prev) => [...prev, uniformData]);
    } else {
      alert("최대 6개의 유니폼만 선택할 수 있습니다.");
    }
  };

  const handleSubmit = () => {
    const squadData = {
      name: squadName,
      uniforms: selectedUniforms,
    };
    localStorage.setItem(`squad_${squadName}`, JSON.stringify(squadData));
    alert("스쿼드가 저장되었습니다!");
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
          <button onClick={handleSubmit}>최종제출</button>
          <div className="selected-uniforms">
            {selectedUniforms.map((uniformData, index) => (
              <div
                key={index}
                className="uniform-data"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <img
                  src={uniformData.uniform}
                  alt={`유니폼 ${index + 1}`}
                  className="selected-uniform"
                />
                <div className="player-position">{uniformData.position}</div>
                <div className="player-info">
                  <div className="player-number">{uniformData.number}</div>
                  <div className="player-name">{uniformData.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="select-uniforms">
        <div className="select-uniform">
          <UniformList onSelectUniform={handleSelectUniform} />
        </div>
      </div>
    </div>
  );
}

export default Maker;
