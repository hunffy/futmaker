import React, { useState } from "react";
import Squad from "../images/squad.png";
import "../styles/maker.css";
import UniformList from "../components/uniformList";
function Maker() {
  const [squadName, setSquadName] = useState();
  return (
    <div className="maker">
      <div className="squad-wrapper">
        <button>불러오기</button>
        <div className="squad">
          <img className="suad-img" src={Squad} alt="스쿼드판"></img>
          <input
            type="text"
            placeholder="스쿼드명을 입력하세요."
            onChange={(e) => setSquadName(e.target.value)}
          />
          <button>최종제출</button>
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
          <UniformList />
        </div>
      </div>
    </div>
  );
}

export default Maker;
