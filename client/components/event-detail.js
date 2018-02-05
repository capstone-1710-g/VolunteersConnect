import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEventDetail, addVolunteerToEvent } from '../store/event';
import { Item, Header, Segment, Button, Divider, Image, Grid, Tab } from 'semantic-ui-react';
import Markdown from 'react-markdown';
import EventFeed from './event-feed';
import { getEventPosts } from '../store/posts';
import PostForm from './post-form';
import { createMessageSession } from '../store';
import history from '../history';
import RequestFormModal from './request-form-modal'

/* -----------------    COMPONENT     ------------------ */

class EventDetail extends Component {

  constructor(props) {
    super(props);
      this.state = {
        activeItem: 'coordinator'
      }

      this.handleItemClick = this.handleItemClick.bind(this);
    }

  componentDidMount() {
    this.props.loadEventDetail();
    this.props.getEventPosts();
  }

  handleItemClick (e, { name }) {
    this.setState({
      activeItem: name
    })
  }

  render() {
    const { user, event, isAdmin, isLoggedIn, posts, volunteers, signUpForVolunteer, initiateChat } = this.props;
    const panes = [
      { menuItem: 'Volunteers', render: () => (
        <Tab.Pane key="1">
          <Item.Group>
          {
            volunteers.map(volunteer =>
                (<Item key={volunteer.id}>
              <Item.Image size="tiny" src={volunteer.profileImage} />
              <Item.Header as="h3">{volunteer.displayName}
              {isLoggedIn &&
                <Button primary disabled={volunteer.id === user.id} onClick={() => initiateChat(user, volunteer)}>Send a Message</Button>
              }
              </Item.Header>
            </Item>)
          )}
          </Item.Group>
        </Tab.Pane>
        )},
      { menuItem: 'Event Coordinators', render: () => <Tab.Pane key="2">Event Coordinators</Tab.Pane> },
    ]
    return (
      <div>
        {event.id &&
        <Segment>
          <Button as={Link} to={'/events/' + event.id + '/edit'} floated="right">Edit this event</Button>
          <Divider horizontal>Staff Only</Divider>
        </Segment>}

        {event.id && (
          <Segment.Group horizontal>
            <Segment style={{ width: '50%' }}>
              <Item>
                <Header style={{ paddingBottom: 10 }} as="h1" dividing>{event.title}</Header>
                <Grid columns={2}>
                  <Grid.Column>
                    <Image size="medium" src={event.imageUrl}  />
                  </Grid.Column>
                  <Grid.Column>
                    {isLoggedIn ?
                      <RequestFormModal event={event} /> :
                      <Button as={Link} to={'/signup'}>Sign Up To Volunteer</Button>
                    }
                    <Item.Meta>{event.address}</Item.Meta>
                  </Grid.Column>
                </Grid>
                <Item.Content>
                  {isAdmin && <Item.Content as="h4">Event ID: {event.id}</Item.Content>}
                  <Item.Meta as="h3">When</Item.Meta>
                  <Item.Description>{event.date}</Item.Description>
                  <Item.Description>{event.time}</Item.Description>
                  <Item.Meta as="h3">Description</Item.Meta>
                  <Item.Description as={Markdown}>{event.description}</Item.Description>
                </Item.Content>
                <Segment>
                  <Tab panes={panes} />
                </Segment>
              </Item>
            </Segment>
            <Segment style={{ backgroundColor: '#edeeef', width: '50%' }}>
              <EventFeed posts={posts} />
              <PostForm event={event} />
            </Segment>
          </Segment.Group>
        )}
      </div>)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({user, event, posts }) => ({
  user,
  event,
  isAdmin: user && user.role === 'admin',
  isLoggedIn: !!user.id,
  posts: Object.keys(posts).map(id => ({ ...posts[id], id })),
  volunteers: event.volunteers ? Object.keys(event.volunteers).map(id => event.volunteers[id]) : [],
});

const mapDispatch = (dispatch, ownProps) => ({
  loadEventDetail: () =>
    dispatch(fetchEventDetail(ownProps.match.params.id))
  ,
  getEventPosts: () =>
    dispatch(getEventPosts(ownProps.match.params.id))
  ,
  signUpForVolunteer: (request) =>
    dispatch(addVolunteerToEvent(request))
  ,
  initiateChat: (sender, recipient) => {
    const existingRecipients = Object.keys(sender.messageSessions || {}).map(id =>
      sender.messageSessions[id]
    );
    if (existingRecipients.includes(recipient.id)) {
      history.push('/messages');
    } else {
      return dispatch(createMessageSession(sender, recipient));
    }
  },
});

export default connect(mapState, mapDispatch)(EventDetail);
