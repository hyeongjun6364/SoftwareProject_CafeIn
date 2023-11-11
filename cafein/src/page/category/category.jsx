import React, { useState, useEffect } from "react"
import "../../style/categorypage/category.scss"
import { coffee, cafename } from "./coffeedata.js"
import coffeeData from "./Data.json"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Pagination from "react-js-pagination"
import "../../style/categorypage/pagination.scss"
import { useRecoilState, useRecoilValue } from "recoil"
import useCoffeeList from "../customHook/useCafe.jsx"
import UseCoffee from "../customHook/useCoffee.jsx"
import useSearch from "../customHook/useSearch.jsx"
import {
  starbucksState,
  ediyaState,
  hollysState,
  megaState,
  paikState,
  allState,
} from "../Atom/cafeatom"

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
  const hollysData = useRecoilValue(hollysState)
  const starbucksData = useRecoilValue(starbucksState)
  const ediyaData = useRecoilValue(ediyaState)
  const megaData = useRecoilValue(megaState)
  const paikData = useRecoilValue(paikState)
  const entireData = useRecoilValue(allState)
  const [filterMenu, setFilterMenu] = useState([])
  const [tempSearchQuery, setTempSearchQuery] = useState("")
  const [ade, setAde] = useState([])
  const [smoody, setSmoody] = useState([])
  const [tea, setTea] = useState([])
  const [juice, setJuice] = useState([])
  const [coffees, setCoffees] = useState([])
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState(1) // 현재 페이지
  const [view, setView] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState("최신순")
  const postsPerPage = 10 // 페이지당 표시할 게시물 수

  useEffect(() => {
    setSelectedCafeTag(null)
    setSelectedTagCoffee(null)
  }, [searchQuery])

  useEffect(() => {
    const adeItems = entireData.filter((tag) =>
      tag.name.toLowerCase().includes("에이드")
    )
    setAde(adeItems)
    const smoodyItems = entireData.filter((tag) =>
      tag.name.toLowerCase().includes("스무디")
    )
    setSmoody(smoodyItems)
    const teaItems = entireData.filter((tag) =>
      tag.name.toLowerCase().includes("티")
    )
    setTea(teaItems)
    const juiceItems = entireData.filter((tag) =>
      tag.name.toLowerCase().includes("주스")
    )
    setJuice(juiceItems)

    const remainItems = entireData.filter(
      (item) =>
        !item.name.toLowerCase().includes("주스") &&
        !item.name.toLowerCase().includes("에이드") &&
        !item.name.toLowerCase().includes("티") &&
        !item.name.toLowerCase().includes("스무디")
    )

    setCoffees(remainItems)
  }, [])

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }
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
  //cofeId 추가해야함
  const handleCoffeeDetail = (coffeeId, cafename, cafeId) => {
    navigate(`/category/${cafename}/${cafeId}/${coffeeId}`)
  }

  const handleInputChange = (e) => {
    setTempSearchQuery(e.target.value)
  }

  // 검색 폼 제출 핸들러
  const handleFormSubmit = (e) => {
    e.preventDefault() // 페이지 리로드 방지
    setSearchQuery(tempSearchQuery)
    const filteredCafe = entireData.filter((tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilterMenu(filteredCafe)
  }

  //검색어 결과 업데이트

  const indexOfLastPost = activePage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = entireData.slice(indexOfFirstPost, indexOfLastPost)
  const currentEdyia = ediyaData.slice(indexOfFirstPost, indexOfLastPost)
  const currentHollys = hollysData.slice(indexOfFirstPost, indexOfLastPost)
  const currentMega = megaData.slice(indexOfFirstPost, indexOfLastPost)
  const currentPaik = paikData.slice(indexOfFirstPost, indexOfLastPost)
  const currentFilter = filterMenu.slice(indexOfFirstPost, indexOfLastPost)
  const currentAde = ade.slice(indexOfFirstPost, indexOfLastPost)
  const currentSmoody = smoody.slice(indexOfFirstPost, indexOfLastPost)
  const currentTea = tea.slice(indexOfFirstPost, indexOfLastPost)
  const currentJuice = juice.slice(indexOfFirstPost, indexOfLastPost)
  const currentCoffee = coffees.slice(indexOfFirstPost, indexOfLastPost)
  // 가격을 정수로 변환
  const strtoint = (dataname) =>
    dataname.map((item) => ({
      ...item,
      price: parseInt(item.price.replace(",", "")),
    }))
  // 카페 각각의 가격 int형 변환
  const starbucksPrice = strtoint(starbucksData)
  const ediyaPrice = strtoint(ediyaData)
  const megaPrice = strtoint(megaData)
  const hollysPrice = strtoint(hollysData)
  const paikPrice = strtoint(paikData)
  // 가격정렬(높은순, 낮은순)
  const sortPriceHigh = (priceList) =>
    priceList.sort((a, b) => b.price - a.price)
  const sortPriceLow = (priceList) =>
    priceList.sort((a, b) => a.price - b.price)
  // 가격 높은순
  const currentHighStarbucks = sortPriceHigh(starbucksPrice).slice(
    indexOfFirstPost,
    indexOfLastPost
  )
  const currentHighMega = sortPriceHigh(megaPrice).slice(
    indexOfFirstPost,
    indexOfLastPost
  )
  const currentHighEdiya = sortPriceHigh(ediyaPrice).slice(
    indexOfFirstPost,
    indexOfLastPost
  )
  const currentHighHollys = sortPriceHigh(hollysPrice).slice(
    indexOfFirstPost,
    indexOfLastPost
  )
  const currentHighPaik = sortPriceHigh(paikPrice).slice(
    indexOfFirstPost,
    indexOfLastPost
  )
  // 가겨 낮은순
  const currentLowStarbucks = sortPriceLow(starbucksPrice).slice(
    indexOfFirstPost,
    indexOfLastPost
  )
  const currentLowMega = sortPriceLow(megaPrice).slice(
    indexOfFirstPost,
    indexOfLastPost
  )
  const currentLowEdiya = sortPriceLow(ediyaPrice).slice(
    indexOfFirstPost,
    indexOfLastPost
  )
  const currentLowHollys = sortPriceLow(hollysPrice).slice(
    indexOfFirstPost,
    indexOfLastPost
  )
  const currentLowPaik = sortPriceLow(paikPrice).slice(
    indexOfFirstPost,
    indexOfLastPost
  )
  // dropdown 상태관리 함수
  const handleDropdown = (drop) => {
    setSelectedMenu(drop)
  }
  //정렬한 데이터(평점,가격 높은,낮은 , 최신순)
  const starbucksHigh = useCoffeeList(
    selectedTagCafeId,
    currentHighStarbucks,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )
  const starbucksLow = useCoffeeList(
    selectedTagCafeId,
    currentLowStarbucks,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )
  const starbucksNew = useCoffeeList(
    selectedTagCafeId,
    currentPosts,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )

  const megaHigh = useCoffeeList(
    selectedTagCafeId,
    currentHighMega,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )
  const megaLow = useCoffeeList(
    selectedTagCafeId,
    currentLowMega,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )
  const megaNew = useCoffeeList(
    selectedTagCafeId,
    currentMega,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )

  const ediyaHigh = useCoffeeList(
    selectedTagCafeId,
    currentHighEdiya,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )
  const ediyaLow = useCoffeeList(
    selectedTagCafeId,
    currentLowEdiya,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )
  const ediyaNew = useCoffeeList(
    selectedTagCafeId,
    currentEdyia,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )

  const hollysHigh = useCoffeeList(
    selectedTagCafeId,
    currentHighHollys,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )
  const hollysLow = useCoffeeList(
    selectedTagCafeId,
    currentLowHollys,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )
  const hollysNew = useCoffeeList(
    selectedTagCafeId,
    currentHollys,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )

  const paikHigh = useCoffeeList(
    selectedTagCafeId,
    currentHighPaik,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )
  const paikLow = useCoffeeList(
    selectedTagCafeId,
    currentLowPaik,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )
  const paikNew = useCoffeeList(
    selectedTagCafeId,
    currentPaik,
    activePage,
    postsPerPage,
    handleCoffeeDetail
  )

  function Dropdown() {
    return (
      <>
        {selectedMenu === "최신순" ? (
          ""
        ) : (
          <li onClick={() => handleDropdown("최신순")}>최신순</li>
        )}
        {selectedMenu === "평점순" ? (
          ""
        ) : (
          <li onClick={() => handleDropdown("평점순")}>평점순</li>
        )}
        {selectedMenu === "가격 높은순" ? (
          ""
        ) : (
          <li onClick={() => handleDropdown("가격 높은순")}>가격 높은순</li>
        )}
        {selectedMenu === "가격 낮은순" ? (
          ""
        ) : (
          <li onClick={() => handleDropdown("가격 낮은순")}>가격 낮은순</li>
        )}
      </>
    )
  }

  return (
    <div style={{ margin: "0 5%" }}>
      <div className="category-title">메뉴</div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            className="category-search"
            type="text"
            placeholder="음료 검색"
            value={tempSearchQuery}
            onChange={handleInputChange}
          />
        </form>

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="category-cafe">총 메뉴</div>
          <ul
            onClick={() => {
              setView(!view)
            }}
          >
            {selectedMenu}
            {view ? "⌃" : "⌄"}
            {view && <Dropdown />}
          </ul>
        </div>

        {/*커피, 음료, 티 등 구분 */}

        {UseCoffee(
          selectedTagCoffeeId,
          currentCoffee,
          activePage,
          postsPerPage,
          handleCoffeeDetail,
          1
        )}
        {UseCoffee(
          selectedTagCoffeeId,
          currentAde,
          activePage,
          postsPerPage,
          handleCoffeeDetail,
          2
        )}
        {UseCoffee(
          selectedTagCoffeeId,
          currentSmoody,
          activePage,
          postsPerPage,
          handleCoffeeDetail,
          3
        )}
        {UseCoffee(
          selectedTagCoffeeId,
          currentTea,
          activePage,
          postsPerPage,
          handleCoffeeDetail,
          4
        )}
        {UseCoffee(
          selectedTagCoffeeId,
          currentJuice,
          activePage,
          postsPerPage,
          handleCoffeeDetail,
          5
        )}

        {useSearch(
          selectedTagCoffeeId,
          currentFilter,
          activePage,
          postsPerPage,
          handleCoffeeDetail,
          searchQuery
        )}
        {selectedMenu === "가격 높은순" ? starbucksHigh : ""}
        {selectedMenu === "가격 낮은순" ? starbucksLow : ""}
        {selectedMenu === "최신순" ? starbucksNew : ""}

        {selectedMenu === "가격 높은순" ? megaHigh : ""}
        {selectedMenu === "가격 낮은순" ? megaLow : ""}
        {selectedMenu === "최신순" ? megaNew : ""}

        {selectedMenu === "가격 높은순" ? hollysHigh : ""}
        {selectedMenu === "가격 낮은순" ? hollysLow : ""}
        {selectedMenu === "최신순" ? hollysNew : ""}

        {selectedMenu === "가격 높은순" ? ediyaHigh : ""}
        {selectedMenu === "가격 낮은순" ? ediyaLow : ""}
        {selectedMenu === "최신순" ? ediyaNew : ""}

        {selectedMenu === "가격 높은순" ? paikHigh : ""}
        {selectedMenu === "가격 낮은순" ? paikLow : ""}
        {selectedMenu === "최신순" ? paikNew : ""}
      </div>
      <br />
      <br />
      <br />

      <Pagination
        activePage={activePage}
        itemsCountPerPage={postsPerPage}
        totalItemsCount={entireData.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default Category
