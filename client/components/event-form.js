import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEvent } from '../store/events';
import { fetchEventDetail, editEventDetail } from '../store/event';
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
    // this.props.load();
  }

  // componentWillReceiveProps(nextProps) {
  //   const { initialValues, initialize } = this.props;
  //   if (!Object.keys(initialValues).length && nextProps.initialValues) {
  //     initialize(nextProps.initialValues);
  //     console.log('old: ', initialValues);
  //     console.log('new:', nextProps.initialValues);
  //   }
  // }

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
    const { name, displayName, handleSubmit, handleEvent, fields, submitSucceeded, error } = this.props;

    return (
      <div>
        <h1>{displayName}</h1>
        <Segment>
            <Form name={name} onSubmit={handleSubmit(values => handleEvent(values))}>
              {fields.map(field => this.renderInputField(field))}
              <div>
                <Form.Button disabled={submitSucceeded} >{displayName}</Form.Button>
              </div>
            </Form>
            <Button onClick={this.props.load}>Load</Button>
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
  { name: 'address', label: 'Address', placeholder: 'Enter the address'},
  { name: 'imageUrl', label: 'Image URL', placeholder: 'Enter Image URL'},
];

const mapAddFormState = (state) => ({
  name: 'addEventForm',
  displayName: 'Add a New Event',
  fields,
  // error: state.user.error
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

const mapAddFormDispatch = (dispatch) => ({
  load: () => ({}),
  handleEvent: (values) => {
    getLocation(values.address)
    .then(location => {
      console.log(location);
      const newEvent = { ...values, location };
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
    // keepDirtyOnReinitialize: true,
  })(connect(mapEditFormState, mapEditFormDispatch)(EventForm));

/**
 * PROP TYPES
 */
EventForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // error: PropTypes.object
};
