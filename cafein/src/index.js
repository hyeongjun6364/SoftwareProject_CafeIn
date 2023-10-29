import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
// import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./style/common_style/header.scss"
import Layout from "./common/layout/layoutContainer"
import { RecoilRoot } from "recoil"
import { QueryClient, QueryClientProvider } from "react-query";
const MainPage = lazy(() => import("./page/mainpage/mainpage"))
const MyPage = lazy(() => import("./page/mypage/mypage"))
const Category = lazy(() => import("./page/category/category"))
const Community = lazy(() => import("./page/community/community"))
const SignUp = lazy(() => import("./page/mypage/signup"))
const CommunityUpdate = lazy(() => import("./page/community/communityUpdate"))
const CommunityWrite = lazy(() => import("./page/community/writePage"))
const CoffeeDetail = lazy(() => import("./page/category/coffeeDatail"))
const Question = lazy(() => import("./page/mypage/question"))
const DetailWrite = lazy(() => import("./page/category/detailReview"))
const Map = lazy(() => import("./page/kakaoApi/kakaomap"))
const Chatbot = lazy(() => import("./page/chatbot/chatbot"))
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(

  <RecoilRoot>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/category/:cafename/:cafeId/:coffeeId"
              element={<CoffeeDetail />}
            />
            <Route path="/" element={<MainPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/category" element={<Category />} />
            <Route path="/community" element={<Community />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/write/:id" element={<CommunityUpdate />} />
            <Route path="/communitywrite" element={<CommunityWrite />} />
            <Route path="/qeustion" element={<Question />} />
            <Route path="/map" element={<Map />} />
            <Route path="/detail/:cafeId/:coffeeId" element={<DetailWrite />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </QueryClientProvider>
</RecoilRoot>
)

reportWebVitals()
