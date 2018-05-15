import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchEvents,
} from '../store/events';
import { Segment, Item } from 'semantic-ui-react'

/* -----------------    COMPONENT     ------------------ */

class Events extends Component {
  componentDidMount() {
    this.props.loadEvents();
  }

  render() {
    const { events, displayName } = this.props;
    return (
      <div>
        <h1>{displayName}</h1>
        {events.length > 0 && (
          <Segment raised>
            <Item.Group divided>
              {events.map(event => (
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
        )}
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapAllEventsState = ({ user, events }) => ({
  user,
  events,
  displayName: 'All Events',
  isAdmin: user && user.role === 'admin',
});

const mapAllEventsDispatch = dispatch => ({
  loadEvents: () => dispatch(fetchEvents()),
});

export const AllEvents = connect(mapAllEventsState, mapAllEventsDispatch)(Events);
