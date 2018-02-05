import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

import { Item, Segment, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MapMarker from './map-marker';

export default class SearchMap extends Component{


   constructor(props){
     super(props);
     this.state = {
       showingInfoWindow: false,
       activeMarker: {},
       selectedEvent: {},
       showInfo: false
     }

   }



  render(){
    const {searchedEvents, google } = this.props;
    console.log('propspsssss', this.props)
    const mapCenter = searchedEvents.length ? searchedEvents[0].location : {};

    const markers = searchedEvents.map((event) => {
      return (

          <MapMarker
            key={event.id}
            lat={event.location.lat}
            lng={event.location.lng}
            event={event}
          />
        )
      })

    return (

       searchedEvents.length > 0 &&
       <Segment.Group horizontal>
          <Segment >
            <GoogleMap
              style={{ width: 500, height: 500 }}
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
                markers
              }
            </GoogleMap>
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
