import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEventDetail } from '../store/event';
import { Item, Header, Segment, Button, Divider, Image, Grid, Tab, Modal, Container, Icon } from 'semantic-ui-react';
import Markdown from 'react-markdown';
import EventFeed from './event-feed';
import { getEventPosts } from '../store/posts';
import PostForm from './post-form';
import { createMessageSession } from '../store';
import history from '../history';
import RequestFormModal from './request-form-modal';
import ViewRequestModal from './view-request-modal';
import EventMemory from './event-memory';

/* -----------------    COMPONENT     ------------------ */

class EventDetail extends Component {

  constructor(props) {
    super(props);
      this.state = {
        activeItem: 'coordinator',
        isOpen: false,
        photoIndex: 0
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

  renderDetail() {
    const { user, event, isLoggedIn, volunteers, isCoordinator } = this.props;
    const isVolunteering = isLoggedIn && volunteers.some(volunteer => volunteer.id === user.id);

    return (
      <Tab.Pane key="detail">
      <Item>
        <Header style={{ paddingBottom: 10 }} as="h1" dividing>{event.title}</Header>
        <Grid columns={2}>
          <Grid.Column>
            <Image size="medium" src={event.imageUrl} />
          </Grid.Column>
          <Grid.Column textAlign="center">
            {isLoggedIn &&
              <RequestFormModal
                disabled={isVolunteering || isCoordinator}
                event={event} />
            }
            {!isLoggedIn &&
              <Button primary as={Link} to={'/signup'}>Sign Up To Volunteer</Button>
            }
            <Item.Meta>
              <Icon name="marker" size="large" />
              {event.address}
            </Item.Meta>
          </Grid.Column>
        </Grid>
        <Item.Content>
          <Item.Meta as="h3">When</Item.Meta>
          <Item.Description>{event.date}</Item.Description>
          <Item.Description>{event.time}</Item.Description>
          <Item.Meta as="h3">Description</Item.Meta>
          <Item.Description as={Markdown}>{event.description}</Item.Description>
        </Item.Content>
        <Divider />
        {this.renderEventMembers(volunteers, event.coordinator)}
      </Item>
      </Tab.Pane>
    )
  }

  renderEventMembers(volunteers, coordinator) {
    const { user, isLoggedIn, initiateChat, isCoordinator} = this.props;

    const panes = [
      {
        menuItem: 'Volunteers', render: () => (
          <Tab.Pane key="volunteers">
            <Item.Group>
              {
                volunteers.map(volunteer =>
                  (<Item key={volunteer.id}>
                    <Item.Image size="tiny" src={volunteer.profileImage}
                      style={{ marginRight: 10 }}/>
                    <Item.Header as="h3">{volunteer.displayName}
                      {isLoggedIn &&
                        <Button
                        primary style={{marginLeft: 10}}
                        disabled={volunteer.id === user.id} onClick={() => initiateChat(user, volunteer)}>Send a Message</Button>
                      }
                      {volunteer.status === 'pending' && isCoordinator &&
                        <ViewRequestModal
                          event={event}
                          volunteer={volunteer}
                        />
                      }
                    </Item.Header>
                  </Item>)
                )}
            </Item.Group>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Event Coordinator', render: () => (
          <Tab.Pane key="coordinators">
            {coordinator && (
              <Item.Group>
                <Item key={coordinator.id}>
                  <Item.Image size="tiny" src={coordinator.profileImage} />
                  <Item.Header as="h3">{coordinator.displayName}
                    {isLoggedIn &&
                      <Button primary disabled={coordinator.id === user.id} onClick={() => initiateChat(user, coordinator)}>Send a Message</Button>
                    }
                  </Item.Header>
                </Item>
              </Item.Group>)}
          </Tab.Pane>
        )
      },
    ];

    return <Tab panes={panes} />
  }

  renderFeed() {
    const {posts, event} = this.props;
    return (
      <Tab.Pane key="feed">
        {event.id && (
          <Container text style={{ backgroundColor: '#edeeef'}}>
            <EventFeed posts={posts} />
            <PostForm event={event} />
          </Container>
        )}
      </Tab.Pane>
    )
  }

  renderMemory() {
    const {posts} = this.props;
    const filteredPosts = posts.filter(post => {
      return post.type && post.type.includes('image') || post.type && post.type.includes('video')
    })

    return (
    <Tab.Pane key="memory">
      {/* <Modal trigger={<Button>View Memory</Button>} basic size="mini"> */}
        <EventMemory posts={filteredPosts} />
      {/* </Modal> */}
    </Tab.Pane>)
  }

  render() {
    const { event, isCoordinator } = this.props;

    const tabPanes = [
      {menuItem: 'Details', render: () => this.renderDetail()},
      {menuItem: 'Feeds', render: () => this.renderFeed()},
      {menuItem: 'Memory', render: () => this.renderMemory()},
    ];

    return (
      <div>
        {event.id && isCoordinator &&
        <Segment>
          <Button as={Link} to={'/events/' + event.id + '/edit'} floated="right">Edit this event</Button>
          <Divider horizontal>Event Coordinator Only</Divider>
        </Segment>}
        <Tab panes={tabPanes} />
      </div>
    )
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
  isCoordinator: event.coordinator && (user.id === event.coordinator.id),
});

const mapDispatch = (dispatch, ownProps) => ({
  loadEventDetail: () =>
    dispatch(fetchEventDetail(ownProps.match.params.id))
  ,
  getEventPosts: () =>
    dispatch(getEventPosts(ownProps.match.params.id))
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
