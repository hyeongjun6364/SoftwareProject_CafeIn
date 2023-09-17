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

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/mypage" Component={MyPage} />
        <Route path="/category" component={Category} />
        <Route path="/community" component={Community} />
      </Routes>
    </Layout>
  </BrowserRouter>
)

reportWebVitals()
