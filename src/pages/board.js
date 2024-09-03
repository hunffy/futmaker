import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../styles/board.css";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore"; // Firestore 가져오기
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // 날짜 포맷팅을 위한 라이브러리

function Board() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const [boards, setBoards] = useState([]);
  const [authors, setAuthors] = useState({}); // 작성자 정보를 저장할 상태 추가

  useEffect(() => {
    const db = getFirestore();
    const boardsRef = collection(db, "boards"); // "boards" 컬렉션에서 데이터를 가져온다
    const unsubscribe = onSnapshot(boardsRef, async (snapshot) => {
      const boardsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBoards(boardsArray);

      // 작성자 정보를 가져오기
      const authorIds = boardsArray.map((board) => board.userId); // 작성자 ID 배열
      const authorsData = {};

      for (const authorId of authorIds) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userId", "==", authorId)); // userId로 쿼리
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const authorData = querySnapshot.docs[0].data();
          authorsData[authorId] = authorData.userId; // 작성자 ID와 이름 저장
        }
      }

      setAuthors(authorsData); // 작성자 정보 상태 업데이트
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

  const handleTitleClick = (id) => {
    navigate(`/board-detail/${id}`); // 게시물 ID를 URL에 추가
  };

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
      <div className="board-category">
        <div className="category-tit">제목</div>
        <div className="category-content">내용</div>
        <div className="category-author">작성자</div>
        <div className="category-date">작성일</div>
      </div>
      {boards.length > 0 ? (
        boards.map((board) => (
          <div className="board-item" key={board.id}>
            <div
              className="board-tit"
              onClick={() => handleTitleClick(board.id)}
            >
              {board.title}
            </div>
            <div className="board-content">
              {board.content.replace(/<[^>]+>/g, "")}
            </div>{" "}
            {/* HTML 태그 제거 */}
            <div className="board-author">
              {authors[board.userId] || "알 수 없음"}
            </div>
            <div className="board-date">
              {board.createdAt
                ? format(board.createdAt.toDate(), "yyyy-MM-dd HH:mm:ss")
                : "알 수 없음"}
            </div>
          </div>
        ))
      ) : (
        <div>게시물이 없습니다.</div>
      )}
    </div>
  );
}

export default Board;
