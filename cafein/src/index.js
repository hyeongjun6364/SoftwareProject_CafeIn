import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './common/header';
import Footer from './common/footer';
import Mainpage from './mainpage/mainpage';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Category from './categorypage/category';
import './style/common_style/header.scss'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
      
        <Routes>
          <Route path="/" Component={Mainpage} />
          {/* <Route path="/mypage" Component={MyPage} /> */}
          <Route path="/category" Component={Category} />
          {/* <Route path="/community" Component={Community} />
          <Route path="/signup" Component={SignUp} /> */}
        </Routes>
      
    </BrowserRouter>

  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

