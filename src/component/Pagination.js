import Pagination from "react-js-pagination";
import {useState, useEffect, useRef} from "react";
import "./Pagination.css";

const Paging = ({page, totalResults, handlePageChange})=>{
    return (
        <div>
            <Pagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={totalResults}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default Paging;