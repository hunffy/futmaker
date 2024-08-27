import "../styles/board-write.css";

function BoardWrite() {
  return (
    <div className="board-write">
      <div className="board-title">
        <h1>글 제목 :</h1>
        <input type="text" placeholder="글 제목을 입력하세요" />
      </div>
    </div>
  );
}

export default BoardWrite;
