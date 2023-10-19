import React from "react";
import "../../style/common_style/widget.scss";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function Widget() {
  const [isVisible, setIsVisible] = useState(true)
  const [prevScrollY, setPrevScrollY] = useState(0)
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > prevScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setPrevScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollY])
  const handleChat=()=>{
    navigate("/chatbot")
  }
  return (
    <div className={`widget-container ${isVisible ? "" : "bottom"}`}>
      <button className="chatbot-button" onClick={handleChat}>Chat</button>
    </div>
    
  );
}

export default Widget;
