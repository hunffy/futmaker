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
        <input
          placeholder="휴대폰번호를 입력하세요"
          onClick={handleClickInput}
        />
        <button onClick={handleCloseModal}>닫기</button>
      </div>
    </div>
  ) : (
    <div className="Modal">
      <div className="modal-wrapper">
        <h1>{props.title}</h1>
        <div className="input-wrapper">
          <input placeholder="아이디를 입력하세요" onClick={handleClickInput} />
          <input
            placeholder="휴대폰번호를 입력하세요"
            onClick={handleClickInput}
          />
        </div>
        <button onClick={handleCloseModal}>닫기</button>
      </div>
    </div>
  );
}

export default Modal;
