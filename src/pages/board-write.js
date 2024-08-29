import "../styles/board-write.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebase"; // firebase 설정 파일

function BoardWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getFirestore(app);
    const storage = getStorage(app);

    try {
      let imageUrl = null;

      // 이미지가 있으면 Firebase Storage에 업로드
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Firestore에 게시글 데이터 저장
      await addDoc(collection(db, "boards"), {
        title,
        content,
        imageUrl,
        createdAt: new Date(),
      });

      alert("게시글이 성공적으로 작성되었습니다!");

      // 작성 후 초기화
      setTitle("");
      setContent("");
      setImage(null);
      navigate("/board");
    } catch (error) {
      console.error("게시글 작성 중 오류 발생:", error);
      alert("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <div className="board-write">
      <form onSubmit={handleSubmit}>
        <div className="board-title">
          <input
            type="text"
            placeholder="글 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="내용을 입력하세요"
        />
        <div className="image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">게시글 제출</button>
      </form>
    </div>
  );
}

export default BoardWrite;
