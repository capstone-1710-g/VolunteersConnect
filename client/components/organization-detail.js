import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOrganizationDetail } from '../store/organization';
import { Item, Header, Segment, Button, Divider, Grid } from 'semantic-ui-react';
import Markdown from 'react-markdown';


/* -----------------    COMPONENT     ------------------ */

class OrganizationDetail extends Component {

  componentDidMount() {
    this.props.loadOrganizationDetail();
  }

  render() {
    const { organization, isAdmin, isLoggedIn } = this.props;
    return (
      <div>
        <Segment>
          <Button as={Link} to={`/organizations/${organization.id}/events/add`} floated="left">Add a new event</Button>
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
      </div>)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ user, organization }, ownProps) => ({
  organization: {...organization, id: ownProps.match.params.id},
  isAdmin: user && user.role === 'admin',
  isLoggedIn: !!user.id,
});

const mapDispatch = (dispatch, ownProps) => ({
  loadOrganizationDetail: () => {
    return dispatch(fetchOrganizationDetail(ownProps.match.params.id));
  },
});

export default connect(mapState, mapDispatch)(OrganizationDetail);
