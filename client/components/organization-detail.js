import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOrganizationDetail} from '../store/organization';
import { fetchOrganizationEvents } from '../store';
import { Item, Header, Segment, Button, Divider, Tab, Card, Image, Icon } from 'semantic-ui-react';
import Markdown from 'react-markdown';


/* -----------------    COMPONENT     ------------------ */

class OrganizationDetail extends Component {

  componentDidMount() {
    this.props.loadOrganizationDetail();
    this.props.loadOrganizationEvents();
  }

  render() {
    const { organization, user, isLoggedIn, events, isCoordinator} = this.props;
    const panes = [
      {
        menuItem: {key: 'events', content: 'Events'},
        render: () => (
          <Tab.Pane >
             {events.length > 0 && <Card.Group itemsPerRow={4}>
              {events.map((event) => {
                return (
                  <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                      <Image src={event.imageUrl} style={{height: 200}}/>
                      <Card.Content>
                        <Card.Header>{event.title}</Card.Header>
                        <br />
                        <Card.Meta>
                          <div>
                            <Icon name="calendar outline" size= "large"/>
                            {` ${event.date}`}
                            <br />
                            <br />
                            <Icon name="marker" size= "large" />
                            {` ${event.address}`}
                          </div>
                        </Card.Meta>
                   </Card.Content>
                  </Card>
                )
              })}
            </Card.Group>
             }
          </Tab.Pane>
        )
      }
    ];
    const coordinator = organization.coordinator || {};
    return (
      <div>
        {isCoordinator &&
        <Segment>
          <Button as={Link} to={`/organizations/${organization.id}/events/add`} floated="left">Add a new event</Button>
          <Button as={Link} to={'/organizations/' + organization.id + '/edit'} floated="right">Edit this organization</Button>
          <Divider horizontal>Coordinator Only</Divider>
        </Segment>
        }
        <Header as="h1" dividing>{organization.name}</Header>
        <Segment>
          <Item.Group>
          <Item>
            <Item.Image size="large" src={organization.imageUrl} />
            <Item.Content>
              <Item.Meta as="h3">Established in {organization.establishedDate}</Item.Meta>
              <Item.Meta>
                <Icon name="marker" size="large" />
                {organization.baseLocation}
              </Item.Meta>
              <Item.Description as={Markdown}>{organization.description}</Item.Description>
              <Item.Extra>
              <Item.Group>
              {coordinator.id &&
                <Item key={coordinator.id}>
                  <Item.Image size="mini" src={coordinator.profileImage} />
                  <Item.Content verticalAlign="middle">
                    <Item.Header as="h3">Coordinator: {coordinator.displayName}
                      {isLoggedIn &&
                        <Button primary disabled={coordinator.id === user.id} onClick={() => initiateChat(user, coordinator)}>Send a Message</Button>
                      }
                    </Item.Header>
                  </Item.Content>
                </Item>
              }
              </Item.Group>
              </Item.Extra>
            </Item.Content>
          </Item>
          </Item.Group>
        </Segment>
        <Tab panes={panes} />


      </div>
      )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ user, organization, events }, ownProps) => ({
  organization: {...organization, id: ownProps.match.params.id},
  isAdmin: user && user.role === 'admin',
  isLoggedIn: !!user.id,
  events, user,
  isCoordinator: organization.coordinator && (user.id === organization.coordinator.id),
});

const mapDispatch = (dispatch, ownProps) => ({
  loadOrganizationDetail: () => {
    return dispatch(fetchOrganizationDetail(ownProps.match.params.id));
  },
  loadOrganizationEvents: () => {
    return dispatch(fetchOrganizationEvents(ownProps.match.params.id));
  }
});

export default connect(mapState, mapDispatch)(OrganizationDetail);
