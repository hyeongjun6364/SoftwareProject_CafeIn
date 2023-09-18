import React, { useState } from "react";
import '../../style/categorypage/category.scss';

// 각 태그에 대한 정보를 담은 객체 배열
const tagInfo = {
  '스타벅스': '스타벅스에 대한 정보',
  '이디야': '이디야에 대한 정보',
  '투섬': '투섬에 대한 정보',
  '빽다방': '빽다방에 대한 정보',
  '메가커피': '메가커피에 대한 정보',
};

function Category() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInfoToShow, setTagInfoToShow] = useState(null);

  const tags = ['스타벅스', '이디야', '투섬', '빽다방', '메가커피'];

  const handleTagClick = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }

    // 선택한 태그에 대한 정보를 설정
    setTagInfoToShow(tagInfo[tagId]);
  };

  return (
    <div>
      <div className="category-title">메뉴</div>
      <div className="category">
        {tags.map((tag) => (
          <div
            key={tag}
            className={`category-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
      {/* 선택한 태그에 대한 정보를 출력 */}
      {tagInfoToShow && (
        <div className="tag-info">
          <h3>{selectedTags[selectedTags.length - 1]} 정보</h3>
          <p>{tagInfoToShow}</p>
        </div>
      )}
    </div>
  );
}

export default Category;
