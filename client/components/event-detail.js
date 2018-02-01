import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEventDetail } from '../store/event';
import { Item, Header, Segment, Button, Divider, Image, Grid, Menu } from 'semantic-ui-react';
import Markdown from 'react-markdown';
import EventFeed from './event-feed';
import { getEventPosts } from '../store/posts';
import PostForm from './post-form';


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
    const { event, isAdmin, isLoggedIn, posts } = this.props;
    return (
      <div>
        {event.id &&
        <Segment>
          <Button as={Link} to={'/events/' + event.id + '/edit'} floated="right">Edit this event</Button>
          <Divider horizontal>Admin Only</Divider>
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
                    <Button size="huge" fluid primary>Volunteer For This Event!</Button>
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
                  <Menu tabular>
                    <Menu.Item name="coordinator" active={this.state.activeItem === 'coordinator'} onClick={this.handleItemClick} />
                    <Menu.Item name="volunteers" active={this.state.activeItem === 'volunteers'} onClick={this.handleItemClick} />
                  </Menu>
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
  event,
  isAdmin: user && user.role === 'admin',
  isLoggedIn: !!user.id,
  posts: Object.keys(posts).map(id => ({ ...posts[id], id })),
});

const mapDispatch = (dispatch, ownProps) => ({
  loadEventDetail: () => {
    return dispatch(fetchEventDetail(ownProps.match.params.id));
  },
  getEventPosts: () => {
    return dispatch(getEventPosts(ownProps.match.params.id))
  }
});

export default connect(mapState, mapDispatch)(EventDetail);
