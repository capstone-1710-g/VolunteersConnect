import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEvent } from '../store/events';
import { fetchEventDetail, editEventDetail } from '../store/event';
import { fetchOrganizationDetail } from '../store/organization';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { InputField, TextAreaField } from 'react-semantic-redux-form';

function semanticFormField({ input, type, label, placeholder, meta: { touched, error, warning }, as: As = Input, ...props }) {
  function handleChange(e, { value }) {
    return input.onChange(value);
  }
  return (
    <Form.Field>
      <As {...props} {...input} value={input.value} type={type} label={label} placeholder={placeholder} onChange={handleChange} />
      {touched && ((error && <span><i>{error}</i></span>) || (warning && <span><i>{warning}</i></span>))}
    </Form.Field>
  );
}

class EventForm extends Component {

  componentDidMount() {
    this.props.load();
  }

  renderInputField({ name, label, placeholder }) {
    return (
      <Form.Group key={name}>
        <Field name={name} component={InputField}
          label={label} placeholder={placeholder} />
      </Form.Group>
    );
  }

  renderTextAreaField({ name, label, placeholder }) {
    return (
      <Form.Group key={name}>
        <Field name={name} component={TextAreaField}
          label={label} placeholder={placeholder} />
      </Form.Group>
    );
  }

  render() {
    const { name, displayName, handleSubmit, handleEvent, fields, submitSucceeded, error, organization } = this.props;

    return (
      <div>
        <h1>{displayName}</h1>
        <Segment>
            <Form name={name} onSubmit={handleSubmit(values => handleEvent(values, organization))}>
              {fields.map(field => this.renderInputField(field))}
              <div>
                <Form.Button disabled={submitSucceeded} >{displayName}</Form.Button>
              </div>
            </Form>
        </Segment>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const fields = [
  { name: 'title', label: 'Title', placeholder: 'Title...' },
  { name: 'description', label: 'Description', placeholder: 'Description...' },
  { name: 'date', label: 'Date', placeholder: 'Enter the date...'},
  { name: 'time', label: 'Time', placeholder: 'Enter the time...'},
  { name: 'address', label: 'Address', placeholder: 'Enter the address'},
  { name: 'imageUrl', label: 'Image URL', placeholder: 'Enter Image URL'},
];

const mapAddFormState = ({organization}) => ({
  name: 'addEventForm',
  displayName: 'Add a New Event',
  fields,
  organization,
});

const mapEditFormState = ({event}) => ({
  name: 'editEventForm',
  displayName: 'Update Event',
  initialValues: event,
  enableReinitialize: true,
  fields,
});

const googleAPIKey = 'AIzaSyBrq6c_EHlfSS9gkRC78w4Wk8tAz8bm4GM';
const getLocation = async (address) => {
  const encodedAddress = address.split(' ').join('+');
  const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&key=' + googleAPIKey);
  const geocoded = await res.json();
  const location = geocoded.results[0].geometry.location;
  return location;
}

const mapAddFormDispatch = (dispatch, ownProps) => ({
  load: () => {
    dispatch(fetchOrganizationDetail(ownProps.match.params.organizationId));
  },
  handleEvent: (values, organization) => {
    // take out user's messageSessions and add the rest of info as coordinator object
    const {coordinator} = organization;

    getLocation(values.address)
    .then(location => {
      const newEvent = {
        ...values,
        location,
        orgId: ownProps.match.params.organizationId,
        coordinator: coordinator || {},
      };
      dispatch(addEvent(newEvent));
    })
  },
});

const mapEditFormDispatch = (dispatch, ownProps) => ({
  load: () => {
    dispatch(fetchEventDetail(ownProps.match.params.id));
  },
  handleEvent: (values) => {
    dispatch(editEventDetail({ ...values, id: ownProps.match.params.id}));
  },
});

export const AddEventForm =
  reduxForm({
    form: 'addEventForm'
  })(connect(mapAddFormState, mapAddFormDispatch)(EventForm));

  export const EditEventForm =
  reduxForm({
    form: 'editEventForm',
  })(connect(mapEditFormState, mapEditFormDispatch)(EventForm));

/**
 * PROP TYPES
 */
EventForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
