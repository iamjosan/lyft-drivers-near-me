import React from "react";
import "./cube-grid.css";

function CubeGrid(props) {
  return (
    <div className="sk-cube-grid" style={props.style}>
      <div className="sk-cube sk-cube1" />
      <div className="sk-cube sk-cube2" />
      <div className="sk-cube sk-cube3" />
      <div className="sk-cube sk-cube4" />
      <div className="sk-cube sk-cube5" />
      <div className="sk-cube sk-cube6" />
      <div className="sk-cube sk-cube7" />
      <div className="sk-cube sk-cube8" />
      <div className="sk-cube sk-cube9" />
    </div>
  );
}

export default CubeGrid;
