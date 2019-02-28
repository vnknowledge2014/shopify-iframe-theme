import React, { useState, useRef, useContext } from "react";
import PortalFrame from "../containers/Iframe";
import PagesContext from "../context";
import Axios from "axios";

const Page = () => {
  const {
    state: { currentPage = {} },
    dispatch
  } = useContext(PagesContext);
  const refWrapper = useRef(null);
  const [element, setElement] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);

  const handleInsertElement = () => {
    const domButton = document.createElement("button");
    domButton.innerText = "+";

    refWrapper.current.appendChild(domButton);
    setElement(domButton);
  };

  const handleChangeButtonStyle = () => {
    element.style.background = "red";
  };

  const handleCreatePage = () => {
    let body = {
      title: pageTitle,
      body_html: refWrapper.current.innerHTML
    };
    Axios({
      method: "POST",
      url: "http://localhost:4000/pages",
      data: body
    });
    Axios({
      method: "GET",
      url: "http://localhost:4000/pages"
    }).then(response => {
      dispatch({
        type: "ADD_PAGE",
        payload: response.data.pages
      });
    });
  };
  return (
    <>
      <input type="text" onChange={e => setPageTitle(e.target.value)} />
      <div>
        <PortalFrame>
          <div ref={refWrapper} />
        </PortalFrame>

        <button onClick={handleInsertElement}>
          Create a <strong>Button</strong>
        </button>
        <button onClick={handleChangeButtonStyle}>Change Style Button</button>
        <button onClick={handleCreatePage}>Create Page</button>
      </div>
    </>
  );
};

export default Page;
