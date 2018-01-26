import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEventDetail } from '../store/event';
import { Item, Header, Segment, Button, Divider} from 'semantic-ui-react';
import Markdown from 'react-markdown';


/* -----------------    COMPONENT     ------------------ */

class EventDetail extends Component {

  componentDidMount() {
    this.props.loadEventDetail();
  }

  render() {
    const { event, isAdmin, isLoggedIn } = this.props;
    return (
      <div>
        {isAdmin && <Segment>
          <Button as={Link} to={'/events/' + event.id + '/edit'} floated="right">Edit this event</Button>
          <Divider horizontal>Admin Only</Divider>
        </Segment>}
        {event.id && (
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
        )}
      </div>)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({user, event }) => ({
  event,
  isAdmin: user && user.role === 'admin',
  isLoggedIn: !!user.id,
});

const mapDispatch = (dispatch, ownProps) => ({
  loadEventDetail: () => {
    return dispatch(fetchEventDetail(ownProps.match.params.id));
  },
});

export default connect(mapState, mapDispatch)(EventDetail);
