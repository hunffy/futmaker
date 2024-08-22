function CommonBtn(props) {
  return (
    <div className="commonBtn">
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  );
}

export default CommonBtn;
