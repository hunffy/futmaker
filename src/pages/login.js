import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Modal from "../components/modal";

function Login() {
  const navigate = useNavigate();
  const [IdnModal, setIdModal] = useState(false);
  const [pwModal, setPwModal] = useState(false);

  return (
    <div className="login">
      <div className="login-wrapper">
        <h1>로그인</h1>
        <div className="input-wrapper">
          <input
            className="id-input"
            type="text"
            placeholder="아이디를 입력하세요"
          />
          <input
            className="pw-input"
            type="text"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="button-wrapper">
          <button className="login-btn">로그인</button>
          <button className="kakao-login-btn">카카오톡 로그인</button>
        </div>
        <div className="login-more">
          <button onClick={() => setIdModal(!IdnModal)}>
            아이디찾기
            {IdnModal && (
              <Modal
                title={"아이디찾기"}
                openModal={IdnModal}
                setOpenModal={setIdModal}
              />
            )}
          </button>
          <button onClick={() => setPwModal(!pwModal)}>
            비밀번호찾기
            {pwModal && (
              <Modal
                title={"비밀번호찾기"}
                openModal={pwModal}
                setOpenModal={setPwModal}
              />
            )}
          </button>
          <button onClick={() => navigate("/signup")}>회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
