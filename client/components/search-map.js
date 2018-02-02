import React, {Component} from 'react';
import GoogleMap from 'google-map-react';

// const events = [
//   {
//    title:"Sample Event 3",
//    lat: '40.555431',
//    lng: '-74.154564'
//   }
// ];

 export default class SearchMap extends Component{
   constructor(props){
     super(props);
     this.state = {
       showingInfoWindow: false,
       activeMarker: {},
       selectedEvent: {}
     }
    //  this.onMarkerClick = this.onMarkerClick.bind(this);
    //  this.onMapClicked = this.onMapClicked.bind(this);
   }

  //  onMarkerClick(props, marker, e){
  //   this.setState({
  //     showingInfoWindow: true,
  //     activeMarker: marker,
  //     selectedEvent: props
  //   })
  //  }

  //  onMapClicked() {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     })
  //   }


  render(){
    const {searchedEvents} = this.props;
    const mapCenter = searchedEvents.length ? searchedEvents[0].location : {};

    return (
      <GoogleMap
        bootstrapURLKeys={{key:"AIzaSyB3Aatep0EJEfPULjK9ok32wLnJcapWx84"}}
        center={mapCenter}
        defaultZoom={11}
      />

    )
  }

}

const style = {
  width: '70%',
  height: '60%'
}
// export default GoogleApiWrapper({
//   apiKey: ("AIzaSyB3Aatep0EJEfPULjK9ok32wLnJcapWx84")
// })(SearchMap)


// searchedEvents.length && <Map
//                 onClick={this.onMapClicked}
//                 google={google}
//                 zoom={13}
//                 style={style}
//                 defaultCenter={mapCenter}
//               >
//               {searchedEvents.map((event) => {
//                 return (
//                   <Marker
//                     key={event.id}
//                     onClick = {this.onMarkerClick}
//                     title={event.title}
//                     name={event.id}
//                     position={event.location} />
//                 )
//               })}


//         <InfoWindow
//           onOpen={this.windowHasOpened}
//           onClose={this.windowHasClosed}
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}>
//             <div>
//               <h1>{this.state.selectedEvent.title}</h1>
//             </div>
//         </InfoWindow>

//       </Map>
