import React, { useEffect } from "react";
import CommonBtn from "./commonBtn";
import { useNavigate } from "react-router-dom";
import MainLogo from "../images/mainLogo.png";
import LoginLogo from "../images/login-logo.png";
import LogOutLogo from "../images/logout-logo.png";
import SearchLogo from "../images/search-logo.png";
import MypageLogo from "../images/mypage-logo.png";

import "../styles/header.css";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const dispath = useDispatch();
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      dispath({ type: "LOGIN_USER", payload: JSON.parse(storedUserInfo) });
    }
  }, [dispath]);

  const userInfo = useSelector((state) => state.userInfo);

  const navigate = useNavigate();
  function clickEventHandler(text) {
    switch (text) {
      case "공지사항":
        navigate("/notice");
        break;
      case "스쿼드메이커":
        navigate("/maker");
        break;
      case "자유게시판":
        navigate("/board");
      default:
        break;
    }
  }

  const logoutHandler = () => {
    dispath({ type: "LOGOUT_USER" });
    localStorage.removeItem("userInfo");
  };
  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header-logo" onClick={() => navigate("/")}>
          <img src={MainLogo} alt="메인로고"></img>
        </div>
        <div className="header-navi">
          <CommonBtn
            text={"공지사항"}
            onClick={() => clickEventHandler("공지사항")}
          />
          <CommonBtn
            text={"스쿼드메이커"}
            onClick={() => clickEventHandler("스쿼드메이커")}
          />
          <CommonBtn
            text={"자유게시판"}
            onClick={() => clickEventHandler("자유게시판")}
          />
        </div>
        <div className="right-wrapper">
          <div className="mypageLogo" onClick={() => navigate("/mypage")}>
            <img src={MypageLogo} alt="마이페이지로고"></img>
          </div>
          <div className="searchLogo">
            <img src={SearchLogo} alt="검색로고"></img>
          </div>
          <div className="loginLogo">
            {userInfo ? (
              <button onClick={logoutHandler}>
                <img src={LogOutLogo} alt="로그아웃로고"></img>
              </button>
            ) : (
              <button onClick={() => navigate("/login")}>
                <img src={LoginLogo} alt="로그인로고"></img>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
