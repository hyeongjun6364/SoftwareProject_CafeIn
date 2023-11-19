import Slider from "react-slick"
import coffee1 from "./coffee1.jpg"
// import coffee2 from "./핫-카페라떼.jpg"
import starbucks from "./starbucks.jpg"
const images = [coffee1,starbucks]
function ImageSlider() {
    const settings = {
      dots: true, //동그란 버튼의미
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000, // 자동으로 넘어가는 속도 조정 가능
      cssEase: "linear", // 애니메이션 효과 설정
    }
  
    return (
      <div style={{ width: "100%" }}>
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div key={idx} className="slider-image">
              <img src={img} alt={`slide${idx}`} style={{ width: "100%" }} />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
  export default ImageSlider