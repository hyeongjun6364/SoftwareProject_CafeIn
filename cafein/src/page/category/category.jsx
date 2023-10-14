// import React, { useState, useEffect } from "react"
// import "../../style/categorypage/category.scss" // 스타일 파일 경로를 수정하세요.
// import { coffee, cafename } from "./coffeedata.js" // JSON 파일 경로를 수정하세요.
// // import coffeeData from "./Data.json"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"

// const TagList = ({ tags, onTagClick, selectedTagId }) => {
//   return (
//     <div className="category">
//       {tags.map((tag) => (
//         <button
//           key={tag.id}
//           className={`category-tag ${
//             selectedTagId === tag.id ? "selected" : ""
//           }`}
//           onClick={() => onTagClick(tag.id)}
//         >
//           {tag.name}
//         </button>
//       ))}
//     </div>
//   )
// }

// function Category() {
//   const [selectedTagCafeId, setSelectedCafeTag] = useState(null)
//   const [selectedTagCoffeeId, setSelectedTagCoffee] = useState(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [posts, setPosts] = useState([]) // 데이터를 저장할 상태 추가
//   const [currentPage, setCurrentPage] = useState(1)
//   const navigate = useNavigate()

//   useEffect(() => {
//     setSelectedCafeTag(null)
//     setSelectedTagCoffee(null)
//   }, [searchQuery])

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/api/cafe/db_get_starbucks_menu?page=${currentPage}`
//         )
//         setPosts(response.data) // 데이터를 상태로 업데이트
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     fetchData()
//   }, [currentPage])

//   const handleTagClick = (tag) => {
//     if (selectedTagCafeId === tag) {
//       setSelectedCafeTag(null)
//       setSelectedTagCoffee(null)
//       setSearchQuery("")
//     } else {
//       setSelectedCafeTag(tag)
//       setSelectedTagCoffee(null)
//       setSearchQuery("")
//       setCurrentPage(1)
//     }
//   }

//   const handleCoffeeTagClick = (tag) => {
//     if (selectedTagCoffeeId === tag) {
//       setSelectedTagCoffee(null)
//       setSelectedCafeTag(null)
//       setSearchQuery("")
//     } else {
//       setSelectedTagCoffee(tag)
//       setSelectedCafeTag(null)
//       setSearchQuery("")
//     }
//   }

//   const handleCoffeeDetail = (coffeeId, cafename) => {
//     navigate(`/category/${cafename}/${coffeeId}`)
//   }

//   const CafeName = posts.find((tag) => tag.id === selectedTagCafeId)?.cafe
//   const CafeContent = coffee.find(
//     (tag) => tag.id === selectedTagCoffeeId
//   )?.content

//   const filteredCafe = posts.filter((tag) =>
//     tag.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   return (
//     <div style={{ margin: "0 5%" }}>
//       <div className="category-title">메뉴</div>
//       <div>
//         <input
//           className="category-search"
//           type="text"
//           placeholder="음료 검색"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <div>
//           <div className="category-cafe">카페이름</div>

//           <TagList
//             tags={cafename}
//             onTagClick={handleTagClick}
//             selectedTagId={selectedTagCafeId}
//           />
//         </div>
//         <br />
//         <div>
//           <div className="category-cafe">커피이름</div>

//           <TagList
//             tags={coffee}
//             onTagClick={handleCoffeeTagClick}
//             selectedTagId={selectedTagCoffeeId}
//           />
//         </div>
//         {/* 선택한 태그에 대한 정보를 출력 */}
//         <br />
//         <div className="category-cafe">총 메뉴</div>
//         {selectedTagCafeId && (
//           <div className="tag-info">
//             <div className="coffee-grid">
//               {fetchData.map(
//                 (tag) =>
//                   tag.cafeid === selectedTagCafeId && (
//                     <React.Fragment key={tag.id}>
//                       <div className="coffee-item">
//                         <img
//                           src={tag.image}
//                           alt={tag.name}
//                           className="category-image"
//                           onClick={() => handleCoffeeDetail(tag.id, tag.cafe)}
//                         />
//                         <p>{tag.name}</p>
//                       </div>
//                     </React.Fragment>
//                   )
//               )}
//             </div>
//           </div>
//         )}

//         {selectedTagCoffeeId && (
//           <div className="tag-info">
//             <h3>{CafeName} 정보</h3>
//             <p>{CafeContent}</p>
//           </div>
//         )}
//         {searchQuery && (
//           <div className="search-results">
//             <div className="coffee-grid">
//               {filteredCafe.map(
//                 (tag) =>
//                   searchQuery === tag.name && (
//                     <React.Fragment key={tag.id}>
//                       <div className="coffee-item">
//                         <img
//                           src={tag.image}
//                           alt={tag.name}
//                           className="category-image"
//                           onClick={() => handleCoffeeDetail(tag.id, tag.cafe)}
//                         />
//                         <p>{tag.name}</p>
//                       </div>
//                     </React.Fragment>
//                   )
//               )}
//             </div>
//           </div>
//         )}

//         <div></div>
//       </div>
//     </div>
//   )
// }

// export default Category

import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import "../../style/categorypage/category.scss"
import { coffee, cafename } from "./coffeedata.js"

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

const CoffeeList = ({ coffees }) => {
  const [selectedCafe, setSelectedCafe] = useState("starbucks")

  const filteredCoffees = coffees.filter(
    (coffee) => coffee.cafe === selectedCafe
  )

  return (
    <div>
      <div>
        <select
          value={selectedCafe}
          onChange={(e) => setSelectedCafe(e.target.value)}
        >
          <option value="starbucks">Starbucks</option>
          <option value="Mega">Mega</option>
          <option value="Bbaek">Bbaek</option>
          {/* Add options for other cafes */}
        </select>
      </div>
      <div>
        {filteredCoffees.map((coffee) => (
          <div key={coffee.id}>
            <h2>{coffee.name}</h2>
            <p>{coffee.content}</p>
            <img src={coffee.image} alt={coffee.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Category() {
  const [selectedTagCafeId, setSelectedCafeTag] = useState(null)
  const [selectedTagCoffeeId, setSelectedTagCoffee] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    setSelectedCafeTag(null)
    setSelectedTagCoffee(null)
  }, [searchQuery])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/cafe/db_get_starbucks_menu`
        )
        setPosts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [currentPage])

  const handleTagClick = (tag) => {
    if (selectedTagCafeId === tag) {
      setSelectedCafeTag(null)
      setSelectedTagCoffee(null)
      setSearchQuery("")
    } else {
      setSelectedCafeTag(tag)
      setSelectedTagCoffee(null)
      setSearchQuery("")
      setCurrentPage(1)
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

  const CafeName = posts.find((tag) => tag.id === selectedTagCafeId)?.cafe
  const CafeContent = coffee.find(
    (tag) => tag.id === selectedTagCoffeeId
  )?.content

  const filteredCafe = posts.filter((tag) =>
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
        <br />
        <div className="category-cafe">총 메뉴</div>
        {selectedTagCafeId && (
          <div className="tag-info">
            <div className="coffee-grid">
              {posts.map(
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
