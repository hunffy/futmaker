import { useSelector } from "react-redux";
import "../styles/mypage.css";

function Mypage() {
  const userInfo = useSelector((state) => state.userInfo);

  if (userInfo !== null) {
    return (
      <div className="mypage">
        <div className="u-info">
          <h1>아이디 : {userInfo.userId}</h1>
          <h1>핸드폰번호 : {userInfo.userPhone}</h1>
        </div>
        <div className="squad-wrapper">
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <div className="squad-info">
            <span>스쿼드명</span>
            <span>스쿼드(4-1-2-1-2)</span>
            <span>스쿼드이미지</span>
          </div>
        </div>
      </div>
    );
  } else {
    <div>잘못된 접근입니다. 로그인해주세요</div>;
  }
}

export default Mypage;
