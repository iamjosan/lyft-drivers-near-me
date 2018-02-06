import React from "react";
import "./loading.css";

function Loading(props) {
  return (
    <div id="loading-container" style={{ top: props.top }}>
      <div className="loader" />
    </div>
  );
}

export default Loading;
