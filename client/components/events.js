import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchEvents,
} from '../store/events';
import { Button, Segment, Divider, Item, Image } from 'semantic-ui-react'

/* -----------------    COMPONENT     ------------------ */

class Events extends Component {
  componentDidMount() {
    this.props.loadEvents();
  }

  render() {
    const { events, displayName, isAdmin } = this.props;
    return (
      <div>
        {
          events
          && <Segment>
          <Button as={Link} to="/events/add" floated="right">Add a new event</Button>
          <Divider horizontal>Staff Only</Divider>
        </Segment>}
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
  events: Object.keys(events).map(id => ({...events[id], id})),
  displayName: 'All Events',
  isAdmin: user && user.role === 'admin',
});

const mapAllEventsDispatch = dispatch => ({
  loadEvents: () => dispatch(fetchEvents()),
});

export const AllEvents = connect(mapAllEventsState, mapAllEventsDispatch)(Events);
