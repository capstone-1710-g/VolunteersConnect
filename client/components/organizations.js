import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchOrganizations} from '../store/organizations';
import { Button, Segment, Divider, Item, Image } from 'semantic-ui-react'

import {createUser} from '../store/user';
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
          <Button onClick={this.props.generateRandomUser}>Generate Random User</Button>
          <Button as={Link} to="/organizations/add" floated="right">Add a new Organization</Button>
          <Divider horizontal>Admin Only</Divider>
        </Segment>
        <h1>{displayName}</h1>
        {organizations.length > 0 && (
          <Segment.Group horizontal>
            <Segment style={{ width: '70%'}}>
              <Item.Group divided>
                {organizations.map(organization => (
                  <Item className="org-list-item" key={organization.id} color="grey" href={'/organizations/' + organization.id}>
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
  generateRandomUser: () => {
    fetch('https://randomuser.me/api/')
    .then(results => results.json())
    .then(results => {
      const [randomUser] = results.results;
      const {name, email, picture, login} = randomUser;
      const firstName = name.first[0].toUpperCase() + name.first.slice(1);
      const lastName = name.last[0].toUpperCase() + name.last.slice(1);
      const newUser = {
        displayName: firstName + ' ' + lastName,
        email,
        photoURL: picture.large,
        uid: login.md5,
      }
      console.log(newUser);
      dispatch(createUser(newUser));
    });
  }
});

export const AllOrganizations = connect(mapAllOrganizationsState, mapAllOrganizationsDispatch)(Organizations);
