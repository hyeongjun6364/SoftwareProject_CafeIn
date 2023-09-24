import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
// import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./style/common_style/header.scss"
import Layout from "./common/layout/layoutContainer"
import MainPage from "./page/mainpage/mainpage"
import MyPage from "./page/mypage/mypage" // MyPage 컴포넌트 추가
import Community from "./page/community/community"
import Category from "./page/category/category"
import Chatbot from "./page/API/api"
import { RecoilRoot } from "recoil"
import SignUp from "./page/mypage/signup"
// import App from "./App"
//import { Chat } from "openai/resources"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/mypage" Component={MyPage} />
          <Route path="/category" Component={Category} />
          <Route path="/community" Component={Community} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/chatbot" Component={Chatbot} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </RecoilRoot>,

  {
    /* <App/> */
  }
)

reportWebVitals()
