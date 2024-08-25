import "../styles/modal.css";

function Modal(props) {
  function handleCloseModal() {
    props.setOpenModal(!false);
  }

  const handleClickInput = (e) => {
    e.stopPropagation();
  };

  return props.title == "아이디찾기" ? (
    <div className="Modal">
      <div className="modal-wrapper">
        <h1>{props.title}</h1>
        <form method="get">
          <input
            placeholder="휴대폰번호를 입력하세요"
            onClick={handleClickInput}
          />
        </form>
        <button type="submit">확인</button>
        <button onClick={handleCloseModal}>닫기</button>
      </div>
    </div>
  ) : (
    <div className="Modal">
      <div className="modal-wrapper">
        <h1>{props.title}</h1>
        <div className="input-wrapper">
          <form method="get">
            <input
              placeholder="아이디를 입력하세요"
              onClick={handleClickInput}
            />
            <input
              placeholder="휴대폰번호를 입력하세요"
              onClick={handleClickInput}
            />
          </form>
        </div>
        <button type="submit">확인</button>
        <button onClick={handleCloseModal}>닫기</button>
      </div>
    </div>
  );
}

export default Modal;
