// src/commons/layout/layoutContainer.jsx
import Footer from "./footer"
import Header from "./header"
import Widget from "./widget"
import { useLocation } from "react-router-dom"
import "../../style/common_style/wrapper.scss"

const HIDDEN_HEADERS = [
  // 예외처리 가능
]

const HIDDEN_FOOTER = [
  // 예외처리 가능
  //"/mypage"
]

export default function Layout(props) {
  const location = useLocation() // 현재 경로 가져오기

  console.log("===========")
  console.log(location.pathname)
  console.log("===========")

  const isHiddenHeader = HIDDEN_HEADERS.includes(location.pathname)
  const isHiddenFooter = HIDDEN_FOOTER.includes(location.pathname)

  return (
    <div className="wrapper">
      {!isHiddenHeader && <Header />}
      <div className="body">{props.children}</div>
      <Widget/>
      {!isHiddenFooter && <Footer />}

    </div>
  )
}
