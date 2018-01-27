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
        {isAdmin && <Segment>
          <Button as={Link} to="/organizations/add" floated="right">Add a new Organization</Button>
          <Divider horizontal>Admin Only</Divider>
        </Segment>}
        <h1>{displayName}</h1>
        {organizations.length > 0 && (
          <Item.Group>
            {organizations.map(organization => (
              <Item key={organization.id} color="grey">
                <Image src={organization.imageURL} href={'/organizations/' + organization.id} />
                <Item.Content href={'/organizations/' + organization.id}>
                <Item.Header>
                    {organization.name}
                </Item.Header>
                <Item.Description as="h4">
                    {organization.description}
                </Item.Description>
                </Item.Content>
            </Item>

            ))}
          </Item.Group>
        )}
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapAllOrganizationsState = ({ user, organizations }) => ({
  user, organizations,
  displayName: 'All Organizations',
  isAdmin: user && user.role === 'admin',
});

const mapAllOrganizationsDispatch = dispatch => ({
  loadOrganizations: () => dispatch(fetchOrganizations()),
});

export const AllOrganizations = connect(mapAllOrganizationsState, mapAllOrganizationsDispatch)(Organizations);
