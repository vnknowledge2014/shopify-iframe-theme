import React, { useEffect, useState, useContext, useRef } from "react";
import { StyleSheetManager } from "styled-components";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';

const noop = () => {};
const EVENTS = [
  "Copy",
  "Cut",
  "Paste",
  "CompositionEnd",
  "CompositionStart",
  "CompositionUpdate",
  "KeyDown",
  "KeyPress",
  "KeyUp",
  "Focus",
  "Blur",
  "Change",
  "Input",
  "Invalid",
  "Submit",
  "Click",
  "ContextMenu",
  "DoubleClick",
  "Drag",
  "DragEnd",
  "DragEnter",
  "DragExit",
  "DragLeave",
  "DragOver",
  "DragStart",
  "Drop",
  "MouseDown",
  "MouseEnter",
  "MouseLeave",
  "MouseMove",
  "MouseOut",
  "MouseOver",
  "MouseUp",
  "Select",
  "TouchCancel",
  "TouchEnd",
  "TouchMove",
  "TouchStart",
  "Scroll",
  "Wheel",
  "Abort",
  "CanPlay",
  "CanPlayThrough",
  "DurationChange",
  "Emptied",
  "Encrypted",
  "Ended",
  "Error",
  "LoadedData",
  "LoadedMetadata",
  "LoadStart",
  "Pause",
  "Play",
  "Playing",
  "Progress",
  "RateChange",
  "Seeked",
  "Seeking",
  "Stalled",
  "Suspend",
  "TimeUpdate",
  "VolumeChange",
  "Waiting",
  "Load",
  "Error",
  "AnimationStart",
  "AnimationEnd",
  "AnimationIteration",
  "TransitionEnd",
  "Toggle"
].reduce((m, e) => {
  m[`on${e}`] = noop;
  if (e !== "MouseEnter" && e !== "MouseLeave") m[`on${e}Capture`] = noop;
  return m;
}, {});

const IFrame = props => {
  const frame = useRef();
  const displayName = "PortalFrame";
  const [root, setRoot] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    frame.current.addEventListener("load", handleLoad, true);
    return () => {
      frame.current.removeEventListener("load", handleLoad, true);
      delete frame.current.el;
    };
  });

  const handleLoad = () => {
    console.log(frame.current.contentDocument.querySelector("html"));
    setRoot(frame.current.contentDocument.querySelector("html"));
    frame.current.contentDocument.body.remove();
    setLoaded(true);
    
    if (frameDidLoad) {
      frameDidLoad();
    }
  };
  const getDocument = () => {
    return frame.current ? frame.current.contentDocument : undefined;
  };

  const getWindow = () => {
    return frame.current ? frame.current.contentWindow : undefined;
  };

  // eslint-disable-next-line no-unused-vars
  const ChildContext = useContext({
    frame: frame,
    window: getWindow,
    document: getDocument
  });

  const { frameDidLoad, children, ...restProps } = props;
  return (
    <iframe
      title={displayName}
      {...restProps}
      ref={frame}
      name="React Portal Frame"
      srcDoc={`<!DOCTYPE html><html><head>${props.head || ""}</head></html>`}
      style={{
        border: 0,
        width: "100%",
        ...props.style
      }}
    >
      {loaded && root
        ? ReactDOM.createPortal(
            <StyleSheetManager target={frame.current.contentDocument.head}>
              <body {...EVENTS}> {children}</body>
            </StyleSheetManager>,
            root
          )
        : null}
    </iframe>
  );
};

IFrame.propTypes = {
  style: PropTypes.object,
  head: PropTypes.string,
  frameDidLoad: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

IFrame.childContextTypes = {
  frame: PropTypes.any,
  window: PropTypes.any,
  document: PropTypes.any
}

export default IFrame;
