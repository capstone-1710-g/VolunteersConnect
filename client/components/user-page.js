import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Item, Segment, Divider} from 'semantic-ui-react';
import {fetchEventsByUser} from '../store/events';

class UserPage extends Component {
  componentDidMount() {
    const {user, loadMyEvents} = this.props;
    loadMyEvents(user.id);
  }
  render() {
    const {user, events} = this.props;
    return (
      <div>
      <Item.Group>
        <Item key={user.id}>
          <Item.Image size="small" src={user.profileImage} />
          <Item.Header as="h3">{user.displayName}
          </Item.Header>
          <Item.Description>{user.email}</Item.Description>
        </Item>
      </Item.Group>
      <Segment raised>
        <h1>My Events</h1>
        <Divider />
        <Item.Group divided>
        {events.map(event => (
        <Item key={event.id} as={Link} to={'/events/' + event.id}>
          <Item.Image size="small" src={event.imageUrl} />
          <Item.Header as="h3">{event.title}
          </Item.Header>
        </Item>
        ))}
        </Item.Group>
      </Segment>
      </div>
    );
  }
}

const mapState = ({user, events}) => ({
  user, events,
});

const mapDispatch = (dispatch) => ({
  loadMyEvents: (userId) => dispatch(fetchEventsByUser(userId))
});

export default connect(mapState, mapDispatch)(UserPage);
