import React, { Component } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3000", {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false
});
import icon from "./small-car-icon--80w.png";
import Navbar from "./Navbar";
import Loading from "./Loading";
import "./app.css";
import CubeGrid from "./CubeGrid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: null,
      lat: null,
      lng: null,
      mapLoading: false,
      mapHeight: 0,
      firstLoad: false
    };
  }
  initMap() {
    if (!this.state.firstLoad) {
      this.setState({ firstLoad: true });
    }
    //set map height
    const navHeight = document.querySelector("#navbar").offsetHeight;
    const mapHeight = window.innerHeight - navHeight;
    this.setState({ mapHeight: mapHeight, navHeight: navHeight });
    var myMap = new google.maps.Map(document.querySelector("#google-map"), {
      zoom: 14,
      center: {
        lat: Number(this.state.lat),
        lng: Number(this.state.lng)
      },
      disableDoubleClickZoom: true,
      title: "My Map"
    });
    var yourLocation = new google.maps.Marker({
      position: {
        lat: Number(this.state.lat),
        lng: Number(this.state.lng)
      },
      map: myMap,
      label: "You"
    });
    this.state.drivers.nearby_drivers.forEach(drivers => {
      drivers.drivers.forEach(location => {
        location.locations.forEach(coord => {
          new google.maps.Marker({
            position: coord,
            map: myMap,
            icon: icon
          });
        });
      });
    });
    //hide loading spinner when google maps has finished rendering
    google.maps.event.addListener(myMap, "tilesloaded", e => {
      this.setState({ mapLoading: false });
    });
    google.maps.event.addListener(myMap, "dblclick", e => {
      this.setState({ mapLoading: true });
      //create a new marker by changing the state
      socket.emit("new coords", {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    });
  }
  componentDidMount() {
    socket.on("lyft drivers", res => {
      console.log(res);
      this.setState(
        {
          drivers: res.drivers,
          lat: res.coords.lat,
          lng: res.coords.lng
        },
        () => this.initMap()
      );
    });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Navbar socket={socket} setState={this.setState.bind(this)} />
        {this.state.mapLoading ? <Loading top={this.state.navHeight} /> : ""}
        <div
          id="google-map"
          style={{
            width: "100%",
            height: this.state.mapHeight
          }}
        />
        {!this.state.firstLoad ? <CubeGrid /> : ""}
      </div>
    );
  }
}

export default App;
