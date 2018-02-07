import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addOrganization } from '../store/organizations';
import { fetchOrganizationDetail, editOrganizationDetail } from '../store/organization';
import { Form, Segment } from 'semantic-ui-react';
import messageSessions from '../store/messageSessions';

class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialValues;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.load();
  }

  componentWillReceiveProps() {
    this.setState(this.props.organization);
  }

  handleChange(name) {
    return e => {
      this.setState({[name]: e.target.value});
    };
  }

  renderInputField({ name, label, type = 'text', step = 1 }) {
    return (
      <Form.Group key={name}>
        {type === 'text' &&
          <Form.Input
          name={name} label={label}
          placeholder={label} value={this.state[name]}
          onChange={this.handleChange(name)} />}
        {type === 'number' &&
          <Form.Input
          name={name} label={label} type={type} step={step}
          placeholder={label} value={this.state[name]}
          onChange={this.handleChange(name)} />}
      </Form.Group>
    );
  }

  render() {
    const { name, displayName, handleSubmit, fields } = this.props;
    return (
      <div>
        <h1>{displayName}</h1>
        <Segment>
          <div>
            <Form name={name} onSubmit={(e) => handleSubmit(e, this.state, user)}>
              {fields.map(field => this.renderInputField(field))}
              <div>
                <Form.Button>{displayName}</Form.Button>
              </div>
            </Form>
          </div>
        </Segment>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const fields = [
  { name: 'name', label: 'Organization Name' },
  { name: 'description', label: 'Description' },
  { name: 'baseLocation', label: 'Base Location'},
  { name: 'imageUrl', label: 'Image URL'},
  { name: 'establishedDate', label: 'Established Date'},
];

const mapAddFormState = (state) => ({
  name: 'add-organization',
  displayName: 'Add a New Organization',
  initialValues: {
    name: '', description: '', baseLocation: '',
    imageUrl: '', establishedDate: '',
  },
  event: {
    name: '', description: '', baseLocation: '',
    imageUrl: '', establishedDate: '',
  },
  fields: fields,
  // error: state.user.error
});

const mapEditFormState = (state) => ({
  name: 'edit-organization',
  displayName: 'Update Organization',
  initialValues: {
    name: '', description: '', baseLocation: '',
    imageUrl: '', establishedDate: '',
  },
  event: state.event,
  fields: fields,
});

const mapAddFormDispatch = (dispatch) => ({
  load: () => ({}),
  handleSubmit: (e, organization, user) => {
    const {messageSessions, ...rest} = user;
    e.preventDefault();
    dispatch(addOrganization({
      ...organization,
      coordinator: {...rest}
    }));
  },
});

const mapEditFormDispatch = (dispatch, ownProps) => ({
  load: () => dispatch(fetchOrganizationDetail(ownProps.match.params.id)),
  handleSubmit: (e, organization) => {
    e.preventDefault();
    dispatch(editOrganizationDetail({
      ...organization, id: ownProps.match.params.id
    }));
  },
});

export const AddOrganizationForm = connect(mapAddFormState, mapAddFormDispatch)(OrganizationForm);
export const EditOrganizationForm = connect(mapEditFormState, mapEditFormDispatch)(OrganizationForm);

/**
 * PROP TYPES
 */
OrganizationForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // error: PropTypes.object
};
