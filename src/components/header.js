import React from "react";
import CommonBtn from "./commonBtn";
import { useNavigate } from "react-router-dom";
import MainLogo from "../imges/mainLogo.png";
import "../styles/header.css";
function Header() {
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
  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header-logo" onClick={() => navigate("/")}>
          <img src={MainLogo}></img>
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
          <div className="mypageLogo">마이페이지</div>
          <div className="searchLogo">검색</div>
          <div className="loginLogo">
            <button onClick={() => navigate("/login")}>로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
