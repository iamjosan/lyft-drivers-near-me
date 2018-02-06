import React, { Component } from 'react'
import icon from './small-car-icon--80w.png'

class Map extends Component{
	constructor(props){
		super(props)
		this.state = this.props.state
	}
	initMap(){
			var myMap = new google.maps.Map(
			document.querySelector('#google-map'),
			{
				zoom: 14,
				center: {
					lat: Number(this.state.lat),
					lng: Number(this.state.lng)
					},
				disableDoubleClickZoom: true,
				title: 'My Map'
				});
			var yourLocation = new google.maps.Marker({
				position: {
					lat: Number(this.state.lat),
					lng: Number(this.state.lng)
					},
				map: myMap,
				label: 'You'
				});
			this.state.drivers.nearby_drivers.forEach(drivers => {
				drivers.drivers.forEach(location => {
					location.locations.forEach(coord => {
						new google.maps.Marker({
							position: coord,
							map: myMap,
							icon: icon
							})
						})
					})
				});
				google.maps.event.addListener(myMap, 'dblclick', function(e){
					//create a new marker by changing the state
					socket.emit('new coords', {
							lat: e.latLng.lat(),
							lng: e.latLng.lng()
							})
					});
			}
	render(){
		return (<div id="google-map" style={{width: '100%', height: '250px'}}>
		</div>)
	}
}

export default Map