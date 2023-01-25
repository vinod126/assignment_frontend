import Pagination from "react-bootstrap/Pagination";
import { useSelector, useDispatch } from "react-redux";
import "./pagination.css";
import {
  prevPage,
  nextPage,
  setTotalPages,
  setPageNumber,
} from "../../modules/paginationSlice";
import { useEffect } from "react";

function PageNumberBar(props) {
  let active = useSelector((state) => state.pagination.pageNumber);
  const pageNumbers = Math.ceil(props.totalItems / 10);
  let items = [];
  let dispatch = useDispatch();
  let beg = useSelector((state) => state.pagination.beg);
  let end = useSelector((state) => state.pagination.end);
  let nextEnable = useSelector((state) => state.pagination.enableNext);
  let prevEnable = useSelector((state) => state.pagination.enablePrev);
  useEffect(() => {
    dispatch(setTotalPages(pageNumbers));
  }, [pageNumbers]);

  const getPage = (e) => {
    let key = e.target.id;
    switch (key) {
      case "next":
        dispatch(nextPage());
        break;
      case "prev":
        dispatch(prevPage());
        break;
      default:
        dispatch(setPageNumber(key));
    }
  };
  for (let number = beg; number <= end; number++) {
    items.push(
      <Pagination.Item
        id={number}
        key={number}
        active={number === active}
        onClick={(e) => getPage(e)}
      >
        {number}
      </Pagination.Item>
    );
  }
  if (items.length in [1, 0]) {
    return <></>;
  } else {
    return (
      <div className="paginationHolder">
        <Pagination style={{ alignItems: "end" }}>
          <Pagination.Item
            id="prev"
            disabled={prevEnable}
            onClick={(e) => getPage(e)}
          >
            Prev
          </Pagination.Item>
          {items}
          <Pagination.Item
            id="next"
            disabled={nextEnable}
            onClick={(e) => getPage(e)}
          >
            Next
          </Pagination.Item>
        </Pagination>
      </div>
    );
  }
}

export default PageNumberBar;
