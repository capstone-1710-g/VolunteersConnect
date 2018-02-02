import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchOrganizations} from '../store/organizations';
import { Button, Segment, Divider, Item, Image } from 'semantic-ui-react'

/* -----------------    COMPONENT     ------------------ */

class Organizations extends Component {
  componentDidMount() {
    this.props.loadOrganizations();
  }

  render() {
    const { organizations, displayName, isAdmin } = this.props;
    return (
      <div>
        {/* {this.user && this.user.isAdmin &&  */}
        <Segment>
          <Button as={Link} to="/organizations/add" floated="right">Add a new Organization</Button>
          <Divider horizontal>Staff Only</Divider>
        </Segment>
        <h1>{displayName}</h1>
        {organizations.length > 0 && (
          <Segment.Group horizontal>
            <Segment style={{ width: '70%'}}>
              <Item.Group divided>
                {organizations.map(organization => (
                  <Item className="org-list-item" key={organization.id} color="grey" as={Link} to={'/organizations/' + organization.id}>
                    <Item.Image size="small" src={organization.imageUrl} style={{margin: 'auto'}} />

                    <Item.Content>
                      <Item.Header>{organization.name}</Item.Header>
                      <Item.Meta>Description</Item.Meta>
                      <Item.Description>
                        {organization.description}
                      </Item.Description>
                      <Item.Extra>Current Opportunities</Item.Extra>
                    </Item.Content>
                  </Item>
                ))}
              </Item.Group>
            </Segment>
            <Segment style={{ width: '30%' }} />
          </Segment.Group>
        )}
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapAllOrganizationsState = ({ user, organizations }) => ({
  user,
  organizations: Object.keys(organizations).map(id => ({ ...organizations[id], id })),
  displayName: 'All Organizations',
  isAdmin: user && user.role === 'admin',
});

const mapAllOrganizationsDispatch = dispatch => ({
  loadOrganizations: () => dispatch(fetchOrganizations()),
});

export const AllOrganizations = connect(mapAllOrganizationsState, mapAllOrganizationsDispatch)(Organizations);
