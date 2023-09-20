import React, { useState, useEffect } from "react";
import '../../style/categorypage/category.scss'; // 스타일 파일 경로를 수정하세요.
import tagInfo from './coffeedata.js'; // JSON 파일 경로를 수정하세요.


const TagList = ({ tags, onTagClick, selectedTagId }) => {
  return (
    <div className="category">
      {tags.map((tag) => (
        <button
          key={tag.id}
          className={`category-tag ${selectedTagId === tag.id ? 'selected' : ''}`}
          onClick={() => onTagClick(tag.id)}
        >
          {tag.name}
        </button>
      ))}
    </div>
  )
}



function Category() {
  const [selectedTagId, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTagClick = (tag) => {
    if (selectedTagId === tag) {
      setSelectedTag(null);
    }
    else {
      setSelectedTag(tag);
    }


  };

  const CafeName = tagInfo.find((tag) => tag.id === selectedTagId)?.name
  const CafeContent = tagInfo.find((tag) => tag.id === selectedTagId)?.content

  //검색어 결과 업데이트
  const filtered = tagInfo.filter((tag) =>
    tag.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>

      <div className="category-title">메뉴</div>
      <div >
        
        <input
            className="category-search"
            type="text"
            placeholder="음료 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
        
        <div>
          <TagList
            tags={tagInfo}
            onTagClick={handleTagClick}
            selectedTagId={selectedTagId}
          />
        </div>
        {/* 선택한 태그에 대한 정보를 출력 */}
        {selectedTagId && (
          <div className="tag-info">
            <h3>{CafeName} 정보</h3>
            <p>{CafeContent}</p>
          </div>
        )}
        {searchQuery && (
          <div className="search-results">
            
            <ul>
              {filtered.map((tag) => (
                <li key={tag.id}>{tag.name}{tag.content}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}

export default Category;

