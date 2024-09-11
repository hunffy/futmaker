import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore"; // Firestore 가져오기
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Authentication 가져오기
import { format } from "date-fns"; // 날짜 포맷팅을 위한 라이브러리
import "../styles/board-detail.css";

function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid); // 현재 로그인된 사용자의 ID 설정
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserId(null); // 로그인되지 않은 경우
        setCurrentUserEmail("");
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, []);

  useEffect(() => {
    const db = getFirestore();
    const boardRef = doc(db, "boards", id);

    const fetchBoard = async () => {
      const docSnap = await getDoc(boardRef);
      if (docSnap.exists()) {
        const boardData = { id: docSnap.id, ...docSnap.data() };
        // createdAt이 Timestamp가 아닐 경우 처리
        if (!(boardData.createdAt instanceof Timestamp)) {
          boardData.createdAt = new Timestamp(0, 0); // 기본값 설정
        }
        setBoard(boardData);
        // ... (이후 코드)
      } else {
        console.log("게시물을 찾을 수 없습니다.");
      }
    };

    const fetchComments = async () => {
      const db = getFirestore();
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, where("boardId", "==", id));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt:
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : new Date(data.createdAt || 0),
        };
      });
      setComments(commentsData);
    };

    fetchBoard();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return; // 빈 댓글 제출 방지

    const db = getFirestore();

    const commentData = {
      content: newComment,
      userEmail: currentUserEmail,
      createdAt: Timestamp.fromDate(new Date()), // Firestore Timestamp로 저장
      boardId: id,
    };

    const docRef = await addDoc(collection(db, "comments"), commentData); // 댓글 Firestore에 추가
    setComments([...comments, { ...commentData, id: docRef.id }]); // Firestore에서 생성된 ID 사용
    setNewComment("");
  };

  if (!board) {
    return <div>로딩 중...</div>;
  }

  const cleanContent = board.content.replace(/<[^>]+>/g, "");

  return (
    <div className="board-detail">
      <div className="board-origin">
        <div className="board-tit-wrapper">
          <h2>게시글 제목: {board.title}</h2>
          <div className="board-author">
            작성자: {authorName || "알 수 없음"}
          </div>
          <div className="board-date">
            작성일:{" "}
            {board.createdAt
              ? format(board.createdAt.toDate(), "yyyy-MM-dd HH:mm:ss")
              : "알 수 없음"}
          </div>
        </div>
        <div className="board-content">{cleanContent}</div>

        {board.attachment && (
          <div className="board-attachment">
            <a
              href={board.attachment}
              target="_blank"
              rel="noopener noreferrer"
            >
              첨부파일 보기
            </a>
          </div>
        )}

        {/* 이미지 출력 추가 */}
        {board.imageUrl && ( // 이미지 URL이 존재할 경우에만 출력
          <div className="board-detail-image">
            <img src={board.imageUrl} alt="게시물 이미지" />
          </div>
        )}
      </div>

      {/* 댓글 작성란 */}
      <div className="comment-section">
        <h3>댓글</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성하세요..."
            required
          />
          <button type="submit">댓글 작성</button>
        </form>

        {/* 댓글 목록 */}
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-author">
                {typeof comment.userEmail === "string"
                  ? comment.userEmail
                  : "알 수 없음"}
                :
              </div>
              <div className="comment-content">{comment.content}</div>
              <div className="comment-date">
                작성일 :
                {comment.createdAt && comment.createdAt instanceof Date
                  ? format(comment.createdAt, "yyyy-MM-dd HH:mm:ss")
                  : "알 수 없음"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
