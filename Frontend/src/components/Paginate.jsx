import React from "react";
import ReactPaginateImport from "react-paginate";

const Paginate = ({ count, onPageChange, page }) => {
  const ReactPaginate =
    ReactPaginateImport && ReactPaginateImport.default
      ? ReactPaginateImport.default
      : ReactPaginateImport;

  const handlePageClick = (event) => {
    onPageChange(event.selected + 1);
  };

  return (
    <>
      <div>
        <ReactPaginate
          breakLabel="......."
          nextLabel=">"
          pageRangeDisplayed={5}
          pageCount={count}
          onPageChange={handlePageClick}
          forcePage={page}
          previousLabel="<"
          containerClassName="flex gap-2 justify-center mt-8 select-none"
          pageLinkClassName="px-3 py-2 border rounded-full hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out"
          previousLinkClassName="px-3 py-2 border rounded-full px-3 py-2 border rounded-full hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out"
          nextLinkClassName="px-3 py-2 border rounded-full px-3 py-2 border rounded-full hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out"
          activeLinkClassName="bg-blue-600 text-white px-3 py-2 border rounded-full hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out"
        />
      </div>
    </>
  );
};

export default Paginate;
