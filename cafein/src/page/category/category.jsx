import React, { useState, useEffect } from "react"
import "../../style/categorypage/category.scss" // 스타일 파일 경로를 수정하세요.
import { coffee, cafename } from "./coffeedata.js" // JSON 파일 경로를 수정하세요.
import coffeeData from "./Data.json"
import { useNavigate } from "react-router-dom"
import axios from "axios"
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
  const [selectedTagCafeId, setSelectedCafeTag] = useState(null)
  const [selectedTagCoffeeId, setSelectedTagCoffee] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    setSelectedCafeTag(null)
    setSelectedTagCoffee(null)
  }, [searchQuery])

  // API완성되면 쓰일 임시 코드
  // 비동기통신을 하기위해 async, await를 useEffect 함수내에서 직접 썻지만
  //  경고 메시지가 나와서 함수를 정의하고 이 함수를 반환하는 식으로 바꿈

  // useEffect(() => {
  //   async function fetchData(){
  //       try {
  //           await axios.get('https://jsonplaceholder.typicode.com/posts')
  //           .then((response) => {
  //             setPosts(response.data);
  //           })
  //         } catch (error) {
  //           console.log(error)
  //         }
  //   }
  //   fetchData()

  // },[])

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

  const CafeName = coffeeData.find((tag) => tag.id === selectedTagCafeId)?.cafe
  const CafeContent = coffee.find(
    (tag) => tag.id === selectedTagCoffeeId
  )?.content

  //검색어 결과 업데이트
  const filteredCafe = coffeeData.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        <div className="category-cafe">총 메뉴</div>
        {selectedTagCafeId && (
          <div className="tag-info">
            <div className="coffee-grid">
              {coffeeData.map(
                (tag) =>
                  tag.cafeid === selectedTagCafeId && (
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
    </div>
  )
}

export default Category
