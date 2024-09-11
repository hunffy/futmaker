import React, { useState } from "react";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import app from "../firebase";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwConfirm, setUserPwConfirm] = useState("");

  async function signupHandler() {
    if (userPw !== userPwConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const auth = getAuth(app);
    const db = getFirestore(app); // Firestore 인스턴스 생성

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userId,
        userPw
      );
      const user = userCredential.user;

      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        userId,
        userPhone,
        userPw,
      });

      alert("회원가입 완료");
      setUserId("");
      setUserPhone("");
      setUserPw("");
      setUserPwConfirm("");

      dispatch({ type: "ADD_USER", payload: { userId, userPhone } });

      navigate("/");
    } catch (error) {
      console.log("회원가입 실패 에러", error);
      alert("회원가입 실패: " + error.message);
    }
  }

  return (
    <div className="signup">
      <div className="signup-wrapper">
        <h1>회원가입</h1>
        <div className="signup-input-wrapper">
          <input
            placeholder="아이디 (이메일 형식)"
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
