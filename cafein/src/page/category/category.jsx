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
          className={`category-tag ${selectedTagId === tag.id ? "selected" : ""
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
        <div className="category-cafe">총 메뉴</div>
        {useCoffeeList(selectedTagCafeId, currentPosts, activePage, postsPerPage, handleCoffeeDetail)}
        {useCoffeeList(selectedTagCafeId, currentEdyia, activePage, postsPerPage, handleCoffeeDetail)}
        {useCoffeeList(selectedTagCafeId, currentHollys, activePage, postsPerPage, handleCoffeeDetail)}
        {useCoffeeList(selectedTagCafeId, currentMega, activePage, postsPerPage, handleCoffeeDetail)}
        {useCoffeeList(selectedTagCafeId, currentPaik, activePage, postsPerPage, handleCoffeeDetail)}
        {/*커피, 음료, 티 등 구분 */}

        {UseCoffee(selectedTagCoffeeId, currentCoffee, activePage, postsPerPage, handleCoffeeDetail, 1)}
        {UseCoffee(selectedTagCoffeeId, currentAde, activePage, postsPerPage, handleCoffeeDetail, 2)}
        {UseCoffee(selectedTagCoffeeId, currentSmoody, activePage, postsPerPage, handleCoffeeDetail, 3)}
        {UseCoffee(selectedTagCoffeeId, currentTea, activePage, postsPerPage, handleCoffeeDetail, 4)}
        {UseCoffee(selectedTagCoffeeId, currentJuice, activePage, postsPerPage, handleCoffeeDetail, 5)}

        {useSearch(selectedTagCoffeeId, currentFilter, activePage, postsPerPage, handleCoffeeDetail, searchQuery)}
        

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
