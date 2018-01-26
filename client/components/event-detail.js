import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEventDetail } from '../store/event';
import { Item, Header, Segment, Button, Divider} from 'semantic-ui-react';
import Markdown from 'react-markdown';
import EventFeed from './event-feed';
import { getEventPosts } from '../store/posts';


/* -----------------    COMPONENT     ------------------ */

class EventDetail extends Component {

  componentDidMount() {
    this.props.loadEventDetail();
    this.props.getEventPosts(this.props.event.id)
  }

  render() {
    const { event, isAdmin, isLoggedIn, posts } = this.props;
    return (
      <div>
        {isAdmin && <Segment>
          <Button as={Link} to={'/events/' + event.id + '/edit'} floated="right">Edit this event</Button>
          <Divider horizontal>Admin Only</Divider>
        </Segment>}
        {event.id && (
          <div>
            <Segment>
              <Item>
                <Header as="h1" dividing>{event.title}</Header>
                <Item.Content>
                  {isAdmin && <Item.Content as="h4">Event ID: {event.id}</Item.Content>}
                  <Item.Image size="large" src={event.imageURL} />
                  <Item.Meta as="h4">Description</Item.Meta>
                  <Item.Description as={Markdown}>{event.description}</Item.Description>
                </Item.Content>
              </Item>
            </Segment>
            <Segment>
              <EventFeed posts={posts} />
            </Segment>
          </div>
        )}
      </div>)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({user, event, posts }) => ({
  event,
  isAdmin: user && user.role === 'admin',
  isLoggedIn: !!user.id,
  posts
});

const mapDispatch = (dispatch, ownProps, eventId) => ({
  loadEventDetail: () => {
    return dispatch(fetchEventDetail(ownProps.match.params.id));
  },
  getEventPosts: () => {
    return dispatch(getEventPosts(eventId))
  }
});

export default connect(mapState, mapDispatch)(EventDetail);
