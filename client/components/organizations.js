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
    const { organizations, displayName, isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn &&
        <Segment>
          <Button as={Link} to="/organizations/add" floated="right">Add a new Organization</Button>
          <Divider horizontal>Regiestered User Only</Divider>
        </Segment>
        }
        <h1>{displayName}</h1>
        {organizations.length > 0 && (
        <Segment>
          <Item.Group divided>
            {organizations.map(organization => (
              <Item className="org-list-item" key={organization.id} color="grey" as={Link} to={'/organizations/' + organization.id}>
                <Item.Image size="small" src={organization.imageUrl} style={{margin: 'auto'}} />

                <Item.Content>
                  <Item.Header>{organization.name}</Item.Header>
                  <Item.Description>
                    {organization.description}
                  </Item.Description>
                  <Item.Extra>Established in {organization.establishedDate}</Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
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
  isLoggedIn: !!user.id,
  isAdmin: user && user.role === 'admin',
});

const mapAllOrganizationsDispatch = dispatch => ({
  loadOrganizations: () => dispatch(fetchOrganizations()),
});

export const AllOrganizations = connect(mapAllOrganizationsState, mapAllOrganizationsDispatch)(Organizations);
