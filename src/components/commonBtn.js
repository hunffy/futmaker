import "../styles/commonbtn.css";

function CommonBtn(props) {
  return (
    <div className="commonBtn">
      <button className="commonButton" onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
}

export default CommonBtn;
