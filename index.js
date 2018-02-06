const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const lyft = require("node-lyft");
const googleMaps = require("@google/maps");
const defaultClient = lyft.ApiClient.instance;
defaultClient.authentications["Client Authentication"].accessToken =
  "UgqhHW4QzeQB9sqJSfYZxTAbetrgUyQW9WVrcMtLIMXmhA6JkZNtvotXE/07Noq/sKc3+imkNImL2jPJEgjEfOdkQsCDdZZODitNnHO4th/X32so0eQmy3E=";
const lyftPublicApi = new lyft.PublicApi();
//create a google maps client object
const googleMapsClient = googleMaps.createClient({
  key: "AIzaSyAJt2d_Tob5xuyl2Y5gAJjBggaVjv0cHpw"
});
//create an HTTP server
const server = http.Server(app);
const socket = require("socket.io")(server);

socket.on("connection", client => {
  console.log("connected to client");
  client.on("address", data => {
    //get address lat and long
    googleMapsClient.geocode(
      {
        address: data
      },
      function(err, response) {
        if (err) console.log(err);
        //console.log('hello there', response.json.results[0].geometry.location)
        const coord = response.json.results[0].geometry.location;
        lyftPublicApi
          .getDrivers(coord.lat, coord.lng)
          .then(data => {
            client.emit("lyft drivers", { drivers: data, coords: coord });
          })
          .catch(err => console.log(err));
      }
    );
  });
  client.on("new coords", coords => {
    lyftPublicApi
      .getDrivers(coords.lat, coords.lng)
      .then(data => {
        client.emit("lyft drivers", { drivers: data, coords: coords });
      })
      .catch(err => console.log(err));
  });
});

//app.set("view engine", "ejs");
//app.use(express.static("public"));
/*
* Serve React Build as a static asset
*/
app.use("/", express.static(path.join(__dirname, "/views/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
server.listen(port, () => console.log("Listening on Port: ", port));
