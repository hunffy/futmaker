import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "../styles/mypage.css";
import SquadImage from "../images/squad.png";

function Mypage() {
  const userInfo = useSelector((state) => state.userInfo);
  const [squads, setSquads] = useState([]);
  const [selectedSquad, setSelectedSquad] = useState(null);
  const canvasRef = useRef(null); // canvas 참조

  useEffect(() => {
    const storedSquads = Object.keys(localStorage)
      .filter((key) => key.startsWith("squad_"))
      .map((key) => JSON.parse(localStorage.getItem(key)));
    setSquads(storedSquads);
  }, []);

  const handleSelectChange = (e) => {
    const squadName = e.target.value;
    const squadData = JSON.parse(localStorage.getItem(`squad_${squadName}`));
    setSelectedSquad(squadData);
  };

  const renderSquadImage = () => {
    if (!selectedSquad) return null;

    return (
      <div className="squad-info">
        <span>스쿼드명: {selectedSquad.name}</span>
        <span>
          스쿼드: {selectedSquad.uniforms.map((u) => u.position).join(", ")}
        </span>
        <div className="squad-image">
          <img src={SquadImage} alt="스쿼드판" />
          {selectedSquad.uniforms.map((uniform, index) => (
            <div
              key={index}
              className="uniform"
              style={{
                top: `${index * 60}px`, // 유니폼의 y 위치 조정
                left: `${index * 60}px`, // 유니폼의 x 위치 조정
              }}
            >
              <img
                src={uniform.uniform}
                alt={`유니폼 ${index + 1}`}
                style={{ width: "100%", height: "100%" }}
              />
              <div className="uniform-info">
                <div>이름: {uniform.name}</div>
                <div>번호: {uniform.number}</div>
                <div>포지션: {uniform.position}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={handleSaveImage}>이미지 저장</button>
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    );
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const squadImage = new Image();
    squadImage.src = SquadImage;

    squadImage.onload = () => {
      canvas.width = 800;
      canvas.height = 600;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(squadImage, 0, 0, canvas.width, canvas.height);

      selectedSquad.uniforms.forEach((uniform, index) => {
        const uniformImage = new Image();
        uniformImage.src = uniform.uniform;
        uniformImage.onload = () => {
          context.drawImage(
            uniformImage,
            index * 60, // 유니폼의 x 위치
            index * 60, // 유니폼의 y 위치
            50, // 유니폼 이미지 너비
            50 // 유니폼 이미지 높이
          );
        };
      });

      // 이미지 다운로드
      setTimeout(() => {
        const link = document.createElement("a");
        link.download = `${selectedSquad.name}_squad_image.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }, 1000);
    };
  };

  if (userInfo !== null) {
    return (
      <div className="mypage">
        <div className="u-info">
          <h1 className="user-info-title">회원정보</h1>
          <h1>아이디 : {userInfo.userId}</h1>
          <h1>핸드폰번호 : {userInfo.userPhone}</h1>
        </div>
        <div className="squad-wrapper">
          <select onChange={handleSelectChange}>
            <option value="">스쿼드 선택</option>
            {squads.map((squad, index) => (
              <option key={index} value={squad.name}>
                {squad.name}
              </option>
            ))}
          </select>
          {renderSquadImage()}
        </div>
      </div>
    );
  } else {
    return <div>잘못된 접근입니다. 로그인해주세요</div>;
  }
}

export default Mypage;
