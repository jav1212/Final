import React from "react";
import PageButton from "./PageButton";

const PaginationButtons = ({ totalPages, activePage, setActivePage }) => {
  const handleNext = () => {
    if (activePage < Math.max(...totalPages)) {
      setActivePage(activePage + 1);
    }
  };

  const handleClick = (e) => {
    setActivePage(parseInt(e.target.id));
  };

  const handlePrev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  return (
    <div className=" flex justify-center items-center absolute bottom-7">
      <div className=" flex">
        <PageButton
          text={"< Prev"}
          details="rounded-l-md mr-1"
          id="prev"
          handle={handlePrev}
        />
        {totalPages.map((total, index) => {
          return (
            <PageButton
              key={index}
              text={total}
              details={activePage === index + 1 ? "bg-azulgris text-white" : ""}
              handle={handleClick}
            />
          );
        })}
        <PageButton
          text={"Next >"}
          details="rounded-r-md ml-1"
          id="next"
          handle={handleNext}
        />
      </div>
    </div>
  );
};

export default PaginationButtons;
