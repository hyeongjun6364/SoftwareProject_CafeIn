import React,{useEffect,useState} from "react";


function useCoffeeList(
  selectedTagCafeId,currentPosts,activepage,postsPerPage, handleCoffeeDetail,name) {
      const cafeList = currentPosts.filter(tag => tag.cafeid === selectedTagCafeId)
      console.log("coffeeTagList:",cafeList)
      console.log(name)
      
    
  return (
    (
      <div className="tag-info">
        <div className="coffee-grid">
          {cafeList.map((tag, index) => (
            <React.Fragment key={tag.id}>
              <div className="coffee-item">
                <span className="item-number">
                  {(activepage - 1) * postsPerPage + index + 1}
                </span>
                <img
                  src={tag.image}
                  alt={tag.name}
                  className="category-image"
                  onClick={() => handleCoffeeDetail(tag.beverage, tag.cafe, tag.cafeid)}
                />
                <h4>{tag.name}</h4>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  )
}

export default useCoffeeList