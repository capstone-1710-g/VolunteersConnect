import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchEvents,
} from '../store/events';
import { Button, Segment, Divider, Card, Image } from 'semantic-ui-react'

/* -----------------    COMPONENT     ------------------ */

class Events extends Component {
  componentDidMount() {
    this.props.loadEvents();
  }

  render() {
    const { events, displayName, isAdmin } = this.props;
    return (
      <div>
        {/* {this.user && this.user.isAdmin &&  */}
        {
          // isAdmin 
          events
          && <Segment>
          <Button as={Link} to="/events/add" floated="right">Add a new event</Button>
          <Divider horizontal>Admin Only</Divider>
        </Segment>}
        <h1>{displayName}</h1>
        {events.length > 0 && (
          <Card.Group>
            {events.map(event => (
              <Card key={event.id} raised color="grey" link>
              <Image src={event.imageURL} href={'/events/' + event.id} />
              <Card.Content href={'/events/' + event.id}>
                <Card.Header>
                  {event.title}
                </Card.Header>
                <Image src={event.imageUrl} fluid />
                <Card.Description as="h4">
                {event.description}
                </Card.Description>
                </Card.Content>
            </Card>

            ))}
          </Card.Group>
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
