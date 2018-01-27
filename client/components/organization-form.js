import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addOrganization } from '../store/organizations';
import { fetchOrganizationDetail, editOrganizationDetail } from '../store/organization';
import { Form, Segment } from 'semantic-ui-react';

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
    return (this.state &&
      <div>
        <h1>{displayName}</h1>
        <Segment>
          <div>
            <Form name={name} onSubmit={(e) => handleSubmit(e, this.state)}>
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
];

const mapAddFormState = (state) => ({
  name: 'add-organization',
  displayName: 'Add a New Organization',
  initialValues: {name: '', description: ''},
  event: { name: '', description: ''},
  fields: fields,
  // error: state.user.error
});

const mapEditFormState = (state) => ({
  name: 'edit-organization',
  displayName: 'Update Organization',
  initialValues: { name: '', description: ''},
  event: state.event,
  fields: fields,
});

const mapAddFormDispatch = (dispatch) => ({
  load: () => ({}),
  handleSubmit: (e, organization) => {
    e.preventDefault();
    dispatch(addOrganization(organization));
  },
});

const mapEditFormDispatch = (dispatch, ownProps) => ({
  load: () => dispatch(fetchOrganizationDetail(ownProps.match.params.id)),
  handleSubmit: (e, organization) => {
    e.preventDefault();
    dispatch(editOrganizationDetail(organization));
  },
});

export const AddEventForm = connect(mapAddFormState, mapAddFormDispatch)(OrganizationForm);
export const EditEventForm = connect(mapEditFormState, mapEditFormDispatch)(OrganizationForm);

/**
 * PROP TYPES
 */
OrganizationForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // error: PropTypes.object
};
