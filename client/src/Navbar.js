import React, { Component } from "react";
import "./navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    //send input to server
    var data = e.target.parentNode.querySelector("input").value;
    //reset input
    e.target.parentNode.querySelector("input").value = "";
    this.props.socket.emit("address", data);
    this.props.setState({ mapLoading: true });
  }
  render() {
    return (
      <div id="navbar">
        <h2>Lyft Drivers Near Me</h2>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Enter your address" />
        </form>
      </div>
    );
  }
}

export default Navbar;
