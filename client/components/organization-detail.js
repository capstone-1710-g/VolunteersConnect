import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOrganizationDetail} from '../store/organization';
import { fetchOrganizationEvents } from '../store';
import { Item, Header, Segment, Button, Divider, Grid, Tab, Card, Image, Icon } from 'semantic-ui-react';
import Markdown from 'react-markdown';


/* -----------------    COMPONENT     ------------------ */

class OrganizationDetail extends Component {

  componentDidMount() {
    this.props.loadOrganizationDetail();
    this.props.loadOrganizationEvents();
  }

  render() {
    const { organization, isAdmin, isLoggedIn, events } = this.props;
    console.log(events)
    const panes = [
      {
        menuItem: {key: 'events', content: 'Events'},
        render: () =>
          <Tab.Pane >
              <Card.Group itemsPerRow={4}>
              {events.map((event) => {
                return(
                  <Card as={Link} to={`/events/${event.id}`}>
                      <Image src={event.imageUrl}/>
                      <Card.Content>
                        <Card.Header>{event.title}</Card.Header>
                        <br />
                        <Card.Meta>
                          <div>
                            <Icon name='calendar outline' size= 'large'/>
                            {` ${event.date}`}
                            <br />
                            <br />
                            <Icon name='marker' size= 'large' />
                            {` ${event.address}`}
                          </div>
                        </Card.Meta>
                   </Card.Content>
                  </Card>
                )
              })}

            </Card.Group>
          </Tab.Pane>

      }
    ]
    return (
      <div>
        <Segment>
          <Button as={Link} to={'/organizations/' + organization.id + '/edit'} floated="right">Edit this organization</Button>
          <Divider horizontal>Staff Only</Divider>
        </Segment>
        <Segment>
          <Item>
            <Header as="h1" dividing>{organization.name}</Header>
            <Item.Content>
              {isAdmin && <Item.Content as="h4">Organization ID: {organization.id}</Item.Content>}
              <Grid columns={2} relaxed>
                <Grid.Column>
                  <Item.Image size="large" src={organization.imageUrl} />
                  <Item.Meta>{organization.baseLocation}</Item.Meta>
                </Grid.Column>
                <Grid.Column>
                  <Item.Meta as="h3">Description</Item.Meta>
                  <Item.Meta as="h5">Date Founded: {organization.establishedDate}</Item.Meta>
                  <Item.Description as={Markdown}>{organization.description}</Item.Description>
                </Grid.Column>
              </Grid>
            </Item.Content>
          </Item>
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
  events
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
