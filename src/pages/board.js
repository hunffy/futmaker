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
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

function Board() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const [boards, setBoards] = useState([]);
  const [authors, setAuthors] = useState({});

  // 페이지네이션 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // 페이지당 게시물 수

  useEffect(() => {
    const db = getFirestore();
    const boardsRef = collection(db, "boards");
    const unsubscribe = onSnapshot(boardsRef, async (snapshot) => {
      const boardsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBoards(boardsArray);

      const authorIds = boardsArray.map((board) => board.userId);
      const authorsData = {};

      for (const authorId of authorIds) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userId", "==", authorId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const authorData = querySnapshot.docs[0].data();
          authorsData[authorId] = authorData.userId;
        }
      }

      setAuthors(authorsData);
    });

    return () => unsubscribe();
  }, []);

  const handleTitleClick = (id) => {
    navigate(`/board-detail/${id}`);
  };

  // 현재 페이지에 해당하는 게시물 가져오기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = boards.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 번호 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(boards.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

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
      {currentPosts.length > 0 ? (
        currentPosts.map((board) => (
          <div className="board-item" key={board.id}>
            <div
              className="board-tit"
              onClick={() => handleTitleClick(board.id)}
            >
              {board.title}
            </div>
            <div className="board-content">
              {board.content.replace(/<[^>]+>/g, "")}
            </div>
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

      {/* 페이지네이션 버튼 */}
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Board;
