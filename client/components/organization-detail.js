import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOrganizationDetail } from '../store/organization';
import { Item, Header, Segment, Button, Divider} from 'semantic-ui-react';
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
        {isAdmin && <Segment>
          <Button as={Link} to={'/organizations/' + organization.id + '/edit'} floated="right">Edit this organization</Button>
          <Divider horizontal>Admin Only</Divider>
        </Segment>}
        {organization.id && (
          <div>
            <Segment>
              <Item>
                <Header as="h1" dividing>{organization.name}</Header>
                <Item.Content>
                  {isAdmin && <Item.Content as="h4">Organization ID: {organization.id}</Item.Content>}
                  <Item.Image size="large" src={organization.imageURL} />
                  <Item.Meta as="h4">Description</Item.Meta>
                  <Item.Description as={Markdown}>{organization.description}</Item.Description>
                </Item.Content>
              </Item>
            </Segment>
          </div>
        )}
      </div>)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ user, organization }) => ({
  organization,
  isAdmin: user && user.role === 'admin',
  isLoggedIn: !!user.id,
});

const mapDispatch = (dispatch, ownProps) => ({
  loadOrganizationDetail: () => {
    return dispatch(fetchOrganizationDetail(ownProps.match.params.id));
  },
});

export default connect(mapState, mapDispatch)(OrganizationDetail);
