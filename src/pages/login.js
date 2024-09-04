import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Modal from "../components/modal";
import { useDispatch } from "react-redux";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import app from "../firebase";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [IdnModal, setIdModal] = useState(false);
  const [pwModal, setPwModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  useEffect(() => {
    getAuth(app);
  }, []);

  async function loginHandler() {
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userId,
        userPw
      );
      const user = userCredential.user;

      // Firestore에서 추가 사용자 정보 가져오기
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = { uid: user.uid, ...userDoc.data() };
        dispatch({ type: "LOGIN_USER", payload: userData });
        localStorage.setItem("userInfo", JSON.stringify(userData));
        navigate("/");
      } else {
        // 새 사용자 정보 추가
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          displayName: user.displayName || userId,
        });
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || userId,
        };
        dispatch({ type: "LOGIN_USER", payload: userData });
        localStorage.setItem("userInfo", JSON.stringify(userData));
        navigate("/");
      }
    } catch (error) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      console.log("로그인 시도 중 에러 발생", error);
    }
  }

  const googleLoginHandler = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Firestore에서 추가 사용자 정보 가져오기
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = { uid: user.uid, ...userDoc.data() };
        dispatch({ type: "LOGIN_USER", payload: userData });
        localStorage.setItem("userInfo", JSON.stringify(userData));
        navigate("/");
      } else {
        // 새 사용자 정보 추가
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          displayName: user.displayName || userId, //
        });
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || userId,
        };
        dispatch({ type: "LOGIN_USER", payload: userData });
        localStorage.setItem("userInfo", JSON.stringify(userData));
        navigate("/");
      }
    } catch (error) {
      alert("구글 로그인 중 오류가 발생했습니다.");
      console.log("구글 로그인 시도 중 에러 발생", error);
    }
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <h1>로그인</h1>
        <div className="input-wrapper">
          <input
            className="id-input"
            type="text"
            placeholder="아이디를 입력하세요"
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            className="pw-input"
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setUserPw(e.target.value)}
          />
        </div>
        <div className="button-wrapper">
          <button className="login-btn" onClick={loginHandler}>
            로그인
          </button>
          <button className="google-login-btn" onClick={googleLoginHandler}>
            구글 로그인
          </button>
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
