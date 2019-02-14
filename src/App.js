import React, { useState, useRef } from "react";
import PortalFrame from 'react-portal-frame'
const App = () => {
  const refWrapper  = useRef(null)
  const [element, setElement] = useState(null); 

  const [customStyle, setCustomStyle] = useState({
    background: '',
    color: ''
  });

  const handleInsertElement = () => {
    const domButton = document.createElement('button')
    domButton.innerText = '+'

    refWrapper.current.appendChild(domButton)
    setElement(domButton)
  }

  const handleChangeButtonStyle = () => {
    element.style.background= 'red'
    // setCustomStyle({ background: 'black', color: 'white' });
  }

  
  return (
    <>
    <div>
    <PortalFrame >
    <div ref={refWrapper}></div>
    </PortalFrame>
      
      <button onClick={handleInsertElement}>Create a <strong>Button</strong></button>
      <button onClick={handleChangeButtonStyle}>Change Style Button</button>
    </div>
    </>
  );
};

export default App;
