import { useSelector } from "react-redux";
import "../styles/board.css";
import { useNavigate } from "react-router-dom";

function Board() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <div className="board">
      {userInfo && (
        <button
          className="write-button"
          onClick={() => navigate("/board-write")}
        >
          글쓰기
        </button>
      )}
      <h1>자유게시판</h1>
    </div>
  );
}

export default Board;
