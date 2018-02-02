import React, {Component} from 'react';
import GoogleMap from 'google-map-react';
// import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
// import GoogleMap from 'google-map-react';
import { Item, Segment, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import history from '../history'

//import Marker from './map-marker';

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
       selectedEvent: {},
       showInfo: false
     }
    //  this.onMarkerClick = this.onMarkerClick.bind(this);
    //  this.onMapClicked = this.onMapClicked.bind(this);
   }

  // shouldComponentUpdate (nextProps) {
  //   console.log('nexttt propsssss', nextProps);
  //   return nextProps.zipcode !== this.props.zipcode
  //  }

  

  //  onMapClicked() {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     })
  //   }
  // }

  // setCenterAndZoom () {
  //   const bounds = new window.google.maps.LatLngBounds()
  // }

  onMarkerClick(id) {

    history.push('/events/' + id)
  }

  render(){
    const {searchedEvents, google } = this.props;
    console.log('propspsssss', this.props)
    const mapCenter = searchedEvents.length ? searchedEvents[0].location : {};

    return (
     
        <Segment.Group horizontal>
          <Segment >
          <div style={{ width: 500, height: 500 }}>
            <GoogleMap
              bootstrapURLKeys={{
                key: "AIzaSyB3Aatep0EJEfPULjK9ok32wLnJcapWx84"
              }}
              defaultCenter= {{
                lat: 40.758896,
                lng: -73.985130
              }}
              defaultZoom={12}
              center={mapCenter}      
            >

              {
                searchedEvents.map((event) => {
                return (
                  
                  <i onClick={() => { this.onMarkerClick(event.id) }} className="fa fa-map-marker" lat={event.location.lat}
                    lng={event.location.lng} style={{ width: 40, height: 40, left: -20, top: -20, position: 'absolute', fontSize: '30px', color: 'red' }}
                  >
                  </i>
                  )
                })
              }
            </GoogleMap>
          </div>
          </Segment>

          <Segment raised style={{width: "50%"}}>
            <Item.Group divided>
              {searchedEvents.map(event => (
                <Item key={event.id} color="grey" as={Link} to={'/events/' + event.id}>
                  <Item.Image size="small" src={event.imageUrl} />
                  <Item.Content>
                    <Item.Header>
                      {event.title}
                    </Item.Header>
                    <Item.Description>
                      {event.description}
                    </Item.Description>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          </Segment>
        </Segment.Group>
     

      // searchedEvents.length && <Map
      //           onClick={this.onMapClicked}
      //           google={google}
      //           zoom={12}
      //           style={style}
      //           initialCenter={mapCenter}
      //           center={mapCenter}
      //           // ref='map'
      //           // onTilesLoaded={() => this.setCenterAndZoom}
      //         >
              // {searchedEvents.map((event) => {
              //   return (
              //     <Marker
              //       key={event.id}
              //       onClick = {this.onMarkerClick}
              //       title={event.title}
              //       name={event.id}
              //       position={event.location} />
              //   )
      //         })}


      //   <InfoWindow
      //     onOpen={this.windowHasOpened}
      //     onClose={this.windowHasClosed}
      //     marker={this.state.activeMarker}
      //     visible={this.state.showingInfoWindow}>
            // <Item>
            //   <Item.Header 
            //   as={Link} to={`/events/${this.state.selectedEvent.id}`}
            //   >{this.state.selectedEvent.title}</Item.Header>
            // </Item>
          
      //   </InfoWindow>

      // </Map>
      // <GoogleMap
      //   bootstrapURLKeys={{key:"AIzaSyB3Aatep0EJEfPULjK9ok32wLnJcapWx84"}}
      //   center={mapCenter}
      //   defaultZoom={11}
      // />

    )
  }

}

const style = {
  width: '70%',
  height: '80%'
}
// export default GoogleApiWrapper({
//   apiKey: ("AIzaSyB3Aatep0EJEfPULjK9ok32wLnJcapWx84")
// })(SearchMap)



