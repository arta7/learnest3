import React, { useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import useDrag from "../../utils/useDrag";
import { filterData } from "../../utils/filterData";
import "./style/style.scss";

const CourseFilter = ({ set_selectedFilter, selectedFilter }) => {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleClick = (id) => {
    if (dragging) {
      return false;
    }
    set_selectedFilter(id);
  };

  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  return (
    <div className="scrollBar-width">
      <ScrollMenu
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
      >
        {filterData?.length > 0 &&
          filterData.map((item) => (
            <div
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleClick(item.id);
              }}
              className={
                (selectedFilter === item.id
                  ? "border-3 filter-item-select "
                  : "") + " m-0 py-1 px-2 ms-3 noselect filter-item"
              }
            >
              <div
                className={
                  (selectedFilter === item.id ? "fw-bolder" : "") +
                  " px-4 py-1 rounded-10 text-nowrap"
                }
              >
                {item.text}
              </div>
            </div>
          ))}
      </ScrollMenu>
    </div>
  );
};

export default CourseFilter;
