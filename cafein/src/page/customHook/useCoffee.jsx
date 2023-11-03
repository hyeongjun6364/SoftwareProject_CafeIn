import React from "react";

function useCoffeeCategory(selectedTagId, currentData, activePage, postsPerPage, handleCoffeeDetail, categoryType = 0) {
  return (
    <>
      {selectedTagId === categoryType && (
        <div className="tag-info">
          <div className="coffee-grid">
            {currentData.map((tag, index) => (
              <React.Fragment key={tag.id}>
                <div className="coffee-item">
                  <span className="item-number">
                    {(activePage - 1) * postsPerPage + index + 1}
                  </span>
                  <img
                    src={tag.image}
                    alt={tag.name}
                    className="category-image"
                    onClick={() =>
                      handleCoffeeDetail(tag.beverage, tag.cafe, tag.cafeid)
                    }
                  />
                  <p>{tag.name}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default useCoffeeCategory;
