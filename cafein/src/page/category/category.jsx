import React, { useState, useEffect } from "react";
import '../../style/categorypage/category.scss';
import { coffee, cafename } from './coffeedata.js';
import coffeeData from './Data.json'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from 'react-js-pagination';
import '../../style/categorypage/pagination.scss';

const TagList = ({ tags, onTagClick, selectedTagId }) => {
  return (
    <div className="category">
      {tags.map((tag) => (
        <button
          key={tag.id}
          className={`category-tag ${
            selectedTagId === tag.id ? "selected" : ""
          }`}
          onClick={() => onTagClick(tag.id)}
        >
          {tag.name}
        </button>
      ))}
    </div>
  )
}

function Category() {
  const [selectedTagCafeId, setSelectedCafeTag] = useState(null);
  const [selectedTagCoffeeId, setSelectedTagCoffee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);// 모든 음료 관리
  const [edyia, setEdyia] = useState([]);
  const [hollys, setHollys] = useState([]);
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1); // 현재 페이지
  const postsPerPage = 10; // 페이지당 표시할 게시물 수
  useEffect(() => {
    setSelectedCafeTag(null)
    setSelectedTagCoffee(null)
  }, [searchQuery])


  // 비동기통신을 하기위해 async, await를 useEffect 함수내에서 직접 썻지만
  //  경고 메시지가 나와서 함수를 정의하고 이 함수를 반환하는 식으로 바꿈

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = axios.get("http://localhost:4000/api/cafe/db_get_starbucks_menu");
        const response2 = axios.get("http://localhost:4000/api/cafe/db_get_ediya_menu");
        const response3 = axios.get("http://localhost:4000/api/cafe/db_get_hollys_menu");

        // 요청이 완료될때 까지 기다리게 하기위해 Promise 사용 -> 효율성을 위해 병렬로 요청
        const results = await Promise.all([response1, response2, response3]);
        setEdyia((await response2).data)
        setHollys((await response3).data)
        let allData = [];

        results.forEach(result => {
          allData.push(...result.data);
        });

        
        setPosts(allData);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  // },[])

  }, [])
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const handleTagClick = (tag) => {
    if (selectedTagCafeId === tag) {
      setSelectedCafeTag(null)
      setSelectedTagCoffee(null)
      setSearchQuery("")
    } else {
      setSelectedCafeTag(tag)
      setSelectedTagCoffee(null)
      setSearchQuery("")
    }
  }
  const handleCoffeeTagClick = (tag) => {
    if (selectedTagCoffeeId === tag) {
      setSelectedTagCoffee(null)
      setSelectedCafeTag(null)
      setSearchQuery("")
    } else {
      setSelectedTagCoffee(tag)
      setSelectedCafeTag(null)
      setSearchQuery("")
    }
  }
  const handleCoffeeDetail = (coffeeId, cafename) => {
    navigate(`/category/${cafename}/${coffeeId}`)
  }
  const CafeName = posts.find((tag) => tag.cafeid === selectedTagCafeId)?.cafe

  const CafeContent = coffee.find((tag) => tag.id === selectedTagCoffeeId)?.content


  //검색어 결과 업데이트
  const filteredCafe = posts.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastPost = activePage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const currentEdyia = edyia.slice(indexOfFirstPost, indexOfLastPost);
  const currentHollys = hollys.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <div style={{ margin: "0 5%" }}>
      <div className="category-title">메뉴</div>
      <div>
        <input
          className="category-search"
          type="text"
          placeholder="음료 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div>
          <div className="category-cafe">카페이름</div>

          <TagList
            tags={cafename}
            onTagClick={handleTagClick}
            selectedTagId={selectedTagCafeId}
          />
        </div>
        <br />
        <div>
          <div className="category-cafe">커피이름</div>

          <TagList
            tags={coffee}
            onTagClick={handleCoffeeTagClick}
            selectedTagId={selectedTagCoffeeId}
          />
        </div>
        {/* 선택한 태그에 대한 정보를 출력 */}
        <br />
        <div className="category-cafe">
          총 메뉴
        </div>
        
        {selectedTagCafeId === 1 && (
          <div className="tag-info">
            <div className="coffee-grid">
              {currentPosts.map((tag) => (
                tag.cafeid === selectedTagCafeId && (
                  <React.Fragment key={tag.id}>
                    <div className="coffee-item">
                      <img src={tag.image} alt={tag.name} className="category-image" onClick={() => handleCoffeeDetail(tag.id, tag.cafe)} />
                      <p>{tag.name}</p>
                    </div>
                  </React.Fragment>
                )
              ))}
            </div>
          </div>
        )}

        {selectedTagCafeId === 2 && (
          <div className="tag-info">
            <div className="coffee-grid">
              {currentEdyia.map((tag) => (
                tag.cafeid === selectedTagCafeId && (
                  <React.Fragment key={tag.id}>
                    <div className="coffee-item">
                      <img src={tag.image} alt={tag.name} className="category-image" onClick={() => handleCoffeeDetail(tag.beverage, tag.cafe)} />
                      <p>{tag.name}</p>
                    </div>
                  </React.Fragment>
                )
              ))}
            </div>
          </div>
        )}

        {selectedTagCafeId === 3 && (
          <div className="tag-info">
            <div className="coffee-grid">
              {currentHollys.map((tag) => (
                tag.cafeid === selectedTagCafeId && (
                  <React.Fragment key={tag.id}>
                    <div className="coffee-item">
                      <img src={tag.image} alt={tag.name} className="category-image" onClick={() => handleCoffeeDetail(tag.beverage, tag.cafe)} />
                      <p>{tag.name}</p>
                    </div>
                  </React.Fragment>
                )
              ))}
            </div>
          </div>
        )}


        {selectedTagCoffeeId && (
          <div className="tag-info">
            <h3>{CafeName} 정보</h3>
            <p>{CafeContent}</p>
          </div>
        )}
        {searchQuery && (
          <div className="search-results">
            <div className="coffee-grid">
              {filteredCafe.map(
                (tag) =>
                  searchQuery === tag.name && (
                    <React.Fragment key={tag.id}>
                      <div className="coffee-item">
                        <img
                          src={tag.image}
                          alt={tag.name}
                          className="category-image"
                          onClick={() => handleCoffeeDetail(tag.id, tag.cafe)}
                        />
                        <p>{tag.name}</p>
                      </div>
                    </React.Fragment>
                  )
              )}
            </div>
          </div>
        )}

        <div></div>
      </div>
      <br />
      <br />
      <br />

      <Pagination
        activePage={activePage}
        itemsCountPerPage={postsPerPage}
        totalItemsCount={posts.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
      <br />
      <br />
    </div>
  )
}

export default Category
