import React, { useState } from "react";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";

//전역상태관리
import { useDispatch } from "react-redux";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userPw, setUserPw] = useState();
  const [userPwConfirm, setUserPwConfirm] = useState();
  const dispath = useDispatch();

  async function signupHandler() {
    if (userPw !== userPwConfirm) {
      alert("비밀번호가 일치하지않습니다.");
      return;
    }

    const users = {
      userId,
      userPhone,
      userPw,
    };

    try {
      const response = await axios.post("http://localhost:3000/users", users);
      dispath({ type: "ADD_USER", payload: response.data });

      alert("회원기입 완료");
      setUserId("");
      setUserPhone("");
      setUserPw("");
      setUserPwConfirm("");

      navigate("/");
    } catch (error) {
      console.log("회원가입 실패 에러", error);
      alert("회원가입 실패 에러 내용을 확인하세요");
    }
  }
  return (
    <div className="signup">
      <div className="signup-wrapper">
        <h1>회원가입</h1>
        <div className="input-wrapper">
          <input
            placeholder="아이디"
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            placeholder="휴대폰번호"
            onChange={(e) => setUserPhone(e.target.value)}
          />
          <input
            placeholder="비밀번호"
            onChange={(e) => setUserPw(e.target.value)}
            type="password"
          />
          <input
            placeholder="비밀번호 확인"
            onChange={(e) => setUserPwConfirm(e.target.value)}
            type="password"
          />
        </div>
        <button onClick={signupHandler}>회원가입</button>
      </div>
    </div>
  );
}

export default SignUp;
