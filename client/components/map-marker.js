import React, { Component } from 'react';
import {Icon, Image, Popup, Grid, Header} from 'semantic-ui-react';
import history from '../history'

export default class MapMarker extends Component{

  constructor(props){
    super(props);

  }

  onMarkerClick(eventId){
    console.log('afaad')
    history.push('/events/' + eventId)
  }
  render(){
    const { event } = this.props
    const marker = (
      <Icon
            name= 'marker'
            style={{left: -20, top: -20, position: 'absolute', cursor: 'pointer'}}
            color='red'
            size='big'
            onClick={()=>{ this.onMarkerClick(event.id)}}
            />
    )

    return (
          // <i className="fa fa-map-marker"
          //   style={{ width: 40, height: 40, left: -20, top: -20, position: 'absolute', fontSize: '30px', color: 'red' }}
          //   onMouseEnter={this.onMarkerHover}
          //   onMouseLeave={this.onMarkerLeave}
          //   >
          //   {this.state.showInfo && event &&
          //     <Item >
          //       <Item.Content header={event.title} />
          //     </Item>
          //   }
          // </i>
          <div>
            {event &&
            <Popup trigger={marker} position='right center'>
              <Grid celled>
                {event.imageUrl && <Grid.Column width={6}>
                  <Image src={event.imageUrl}/>
                </Grid.Column>}
                <Grid.Column textAlign='left' width={10}>
                  <Header as='h4'>{event.title}</Header>
                </Grid.Column>
              </Grid>
            </Popup>
            }
          </div>
    );
  }
}

