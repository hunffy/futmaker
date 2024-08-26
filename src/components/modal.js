import "../styles/modal.css";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
function Modal(props) {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState();
  const [id, setId] = useState();

  async function SearchResult(title) {
    if (title === "아이디찾기") {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const result = response.data.find((user) => user.userPhone === phone);
        alert(result.userId);
      } catch (error) {
        alert("아이디를 찾을 수 없습니다. 입력정보를 확인해주세요.");
        console.log("아이디찾기오류", error);
      }
    } else if (title === "비밀번호찾기") {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const result = response.data.find(
          (user) => user.userId === id && user.userPhone === phone
        );
        alert(result.userPw);
      } catch (error) {
        alert("비밀번호를 찾을 수 없습니다. 입력정보를 확인해주세요");

        console.log("비밀번호찾기오류", error);
      }
    }
  }

  function handleCloseModal() {
    props.setOpenModal(!false);
  }

  const handleClickInput = (e) => {
    e.stopPropagation();
  };

  return props.title == "아이디찾기" ? (
    <div className="Id-Modal">
      <div className="modal-wrapper">
        <h1>{props.title}</h1>
        <input
          className="modal-inputPhone"
          placeholder="휴대폰번호를 입력하세요"
          onClick={handleClickInput}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={() => SearchResult(props.title)}>확인</button>
        <button className="close-button" onClick={handleCloseModal}>
          닫기
        </button>
      </div>
    </div>
  ) : (
    <div className="Pw-Modal">
      <div className="modal-wrapper">
        <h1>{props.title}</h1>
        <div className="input-wrapper">
          <input
            className="modal-inputId"
            placeholder="아이디를 입력하세요"
            onClick={handleClickInput}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className="modal-inputPw"
            placeholder="휴대폰번호를 입력하세요"
            onClick={handleClickInput}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button onClick={() => SearchResult(props.title)}>확인</button>
        <button className="close-button" onClick={handleCloseModal}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default Modal;
