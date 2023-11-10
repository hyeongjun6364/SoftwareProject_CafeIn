import React from "react";

function useSearch(selectedTagId, currentData, activePage, postsPerPage, handleCoffeeDetail, searchquery) {
  return (
    <>
      {searchquery&& (
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
                 <h4>{tag.name}</h4>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default useSearch;
