import React from 'react';
import coffeeReviews from './Data.json';
import '../../style/categorypage/review.scss'; // SCSS 파일을 가져옵니다.

function Review({ coffeeId }) {
  const reviews = coffeeReviews.filter((review) => review.coffeeId === coffeeId);

  return (
    <div className="review-wrapper">
      <h2 className="review-header">이용 후기</h2>
      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            <p className="review-rating">평점: {review.rating} / 5</p>
            <p className="review-content">내용: {review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Review;
