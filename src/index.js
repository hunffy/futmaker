import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

//라우트설정
import { BrowserRouter, Routes, Route } from "react-router-dom";

//컴포넌트
import Main from "./Main";
import Header from "./components/header";
import Footer from "./components/footer";
import Notice from "./pages/notice";
import Maker from "./pages/maker";
import Board from "./pages/board";
import Login from "./pages/login";
import SignUp from "./pages/signup";

//스토어 설정
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route className="route-container" path="/" element={<Main />} />
          <Route
            className="route-container"
            path="/notice"
            element={<Notice />}
          />
          <Route
            className="route-container"
            path="/maker"
            element={<Maker />}
          />
          <Route
            className="route-container"
            path="/board"
            element={<Board />}
          />
          <Route
            className="route-container"
            path="/login"
            element={<Login />}
          />
          <Route
            className="route-container"
            path="/signup"
            element={<SignUp />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
