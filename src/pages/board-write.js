import "../styles/board-write.css";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios"; // axios 설치 필요

function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // 이미지 상태 추가

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    if (image) {
      postData.append("image", image); // 이미지 추가
    }

    try {
      await axios.post("http://localhost:3000/posts", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("게시글이 성공적으로 작성되었습니다!");
      // 작성 후 초기화
      setTitle("");
      setContent("");
      setImage(null);
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
