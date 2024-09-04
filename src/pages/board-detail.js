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
import "../styles/board-detail.css"; // 스타일 추가

function BoardDetail() {
  const { id } = useParams(); // URL에서 게시물 ID 가져오기
  const [board, setBoard] = useState(null);
  const [authorName, setAuthorName] = useState(""); // 작성자 이름 상태 추가
  const [comments, setComments] = useState([]); // 댓글 상태 추가
  const [newComment, setNewComment] = useState(""); // 새 댓글 상태 추가
  const [currentUserId, setCurrentUserId] = useState(null); // 현재 사용자 ID 상태 추가
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
    const boardRef = doc(db, "boards", id); // 해당 게시물 문서 참조

    const fetchBoard = async () => {
      const docSnap = await getDoc(boardRef);
      if (docSnap.exists()) {
        const boardData = { id: docSnap.id, ...docSnap.data() };
        setBoard(boardData);

        // 작성자 ID로 사용자 정보 가져오기
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userId", "==", boardData.userId)); // 이메일로 쿼리
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const authorData = querySnapshot.docs[0].data();
          console.log("확인해보자", authorData);
          setAuthorName(authorData.userId); // 사용자 이름을 상태에 저장
        } else {
          console.log("작성자 정보를 찾을 수 없습니다.");
        }
      } else {
        console.log("게시물을 찾을 수 없습니다.");
      }
    };

    const fetchComments = async () => {
      const db = getFirestore();
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, where("boardId", "==", id)); // 게시물 ID로 댓글 쿼리
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt:
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : new Date(data.createdAt || 0), // Timestamp 변환 및 기본값 설정
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
      userEmail: currentUserEmail, // 현재 로그인된 사용자 ID
      createdAt: Timestamp.fromDate(new Date()), // 현재 시간을 Firestore Timestamp로 저장
      boardId: id, // 댓글이 속한 게시물 ID
    };

    const docRef = await addDoc(collection(db, "comments"), commentData); // 댓글 Firestore에 추가
    setComments([...comments, { ...commentData, id: docRef.id }]); // Firestore에서 생성된 ID 사용
    setNewComment(""); // 입력란 초기화
  };

  if (!board) {
    return <div>로딩 중...</div>; // 데이터 로딩 중 표시
  }

  // HTML 태그 제거
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
                {comment.createdAt
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
