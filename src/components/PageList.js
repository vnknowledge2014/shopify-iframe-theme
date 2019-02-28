import React, { useContext } from "react";
import PagesContext from "../context";
import Axios from "axios";

const PageList = () => {
  const { state, dispatch } = useContext(PagesContext);
  const pageCount =
    state.pages.length > 0 ? `${state.pages.length} Pages` : `0 Page`;
  return (
    <>
      <span>{pageCount}</span>
      <ul>
        {state.pages.map(page => (
          <li key={page.id}>
            <h1>{page.title}</h1>
            <button
              onClick={async () => {
                await Axios({
                  method: "DELETE",
                  url: `http://localhost:4000/pages?id=${page.id}`
                });
                dispatch({ type: "REMOVED_PAGE", payload: page });
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PageList;
