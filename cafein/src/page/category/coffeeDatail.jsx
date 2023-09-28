import React from 'react'
import { useParams } from 'react-router-dom'
import { cafename, coffee } from './coffeedata';
import coffeeData from './Data.json'
import '../../style/categorypage/coffeeDetail.scss'
import Review from './Review';
function CoffeeDetail() {
  const { cafename, coffeeId } = useParams();

  const coffeeItem = coffeeData.find(
    (item) => item.cafe === cafename && item.id === parseInt(coffeeId)
  );

  if (!coffeeItem) {
    return <div>커피를 찾을 수 없습니다.</div>;
  }
  
  return (
    <div className="coffee-detail-wrapper">
      <img src={coffeeItem.image} alt={cafename} className="category-image" />
      <h1 className="coffee-title">{coffeeItem.name}</h1>
      <p className="coffee-info">가격: {coffeeItem.price}원</p>
      <p className="coffee-info">설명: {coffeeItem.description}</p>
      <Review coffeeId={coffeeId} />
    </div>
  );
}

export default CoffeeDetail;