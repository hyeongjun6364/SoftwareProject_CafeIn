import React,{Suspense,lazy} from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
// import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./style/common_style/header.scss"
import Layout from "./common/layout/layoutContainer"
// import MainPage from "./page/mainpage/mainpage"
// import MyPage from "./page/mypage/mypage" // MyPage 컴포넌트 추가
// import Community from "./page/community/community"
// import Category from "./page/category/category"
// import Chatbot from "./page/API/chatbot"
import { RecoilRoot } from "recoil"
// import SignUp from "./page/mypage/signup"
// import CommunityUpdate from "./page/community/communityUpdate"
// import CommunityWrite from "./page/community/writePage"
// import CoffeeDatail from "./page/category/coffeeDatail"
// import Question from "./page/mypage/question"

const MainPage = lazy(() => import("./page/mainpage/mainpage"));
const MyPage = lazy(() => import("./page/mypage/mypage"));
const Category = lazy(() => import("./page/category/category"));
const Community = lazy(() => import("./page/community/community"));
const SignUp = lazy(() => import("./page/mypage/signup"));
const Chatbot = lazy(() => import("./page/API/chatbot"));
const CommunityUpdate = lazy(() => import("./page/community/communityUpdate"));
const CommunityWrite = lazy(() => import("./page/community/writePage"));
const CoffeeDetail = lazy(()=> import("./page/category/coffeeDatail"));
const Question = lazy(()=>  import('./page/mypage/question'));

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Layout>
        
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/category/:cafename/:coffeeId" element={<CoffeeDetail/>}/>
          <Route path="/" element={<MainPage/>} />
          <Route path="/mypage" element={<MyPage/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/chatbot" element={<Chatbot/>} />
          <Route path="/write/:id" element={<CommunityUpdate/>}/>
          <Route pate="/communitywrite" element={<CommunityWrite/>}/>
          <Route path="/qeustion" element={<Question/>} />
        </Routes>
        </Suspense>
        
      </Layout>
    </BrowserRouter>
  </RecoilRoot>
)

reportWebVitals()
