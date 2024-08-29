import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../styles/board.css";
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase Database 가져오기
import { useNavigate } from "react-router-dom";

function Board() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const boardsRef = ref(db, "boards"); //"boards" 경로에서 데이터를 가져온다
    onValue(boardsRef, (e) => {
      const data = e.val();
      const boardsArray = data ? Object.values(data) : [];
      setBoards(boardsArray);
    });
  }, []);
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
      {boards.map((board, index) => (
        <div className="board-item" key={index}>
          <div>{board.title}</div>
          <div>{board.content}</div>
          <div>
            <img src={board.imageUrl} alt="board-item-img" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;
