import React from "react";
import ReactPaginateImport from "react-paginate";

const Paginate = () => {
  const ReactPaginate =
    ReactPaginateImport && ReactPaginateImport.default
      ? ReactPaginateImport.default
      : ReactPaginateImport;

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        pageRangeDisplayed={5}
        pageCount={10}
        previousLabel="< previous"
      />
    </>
  );
};

export default Paginate;
