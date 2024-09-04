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

    // 드래그한 유니폼을 새로운 위치로 이동
    if (index !== draggedIndex) {
      newUniforms.splice(draggedIndex, 1); // 원래 위치에서 제거
      newUniforms.splice(index, 0, draggedUniform); // 새로운 위치에 추가
    }

    setSelectedUniforms(newUniforms);
    setDraggedIndex(null); // 드래그 인덱스 초기화
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSelectUniform = (uniformData) => {
    setSelectedUniforms((prev) => [...prev, uniformData]);
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
            {/* 빈 공간을 위한 추가 div */}
            {selectedUniforms.length < 5 && (
              <div
                className="empty-slot"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, selectedUniforms.length)}
              >
                빈 공간
              </div>
            )}
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
