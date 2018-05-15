import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import { Segment } from 'semantic-ui-react';
import MapMarker from './map-marker';

export default class SearchMap extends Component{


   constructor(props){
     super(props);
     this.state = {
       showingInfoWindow: false,
       activeMarker: {},
       showInfo: false,
     }

   }

  render(){
    const {searchedEvents } = this.props;
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
      });

    return (
       searchedEvents.length > 0 &&

      <Segment style={{height: '70%'}}>
        <GoogleMap
          style={{ width: 600, height: 600 }}
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
    )
  }
}

const style = {
  width: '70%',
  height: '80%'
}

