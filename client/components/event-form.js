import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEvent } from '../store/events';
import { fetchEventDetail, editEventDetail } from '../store/event';
import { Form, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { InputField, TextAreaField } from 'react-semantic-redux-form';

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
    const { name, displayName, handleSubmit, handleEvent, fields, submitSucceeded, error } = this.props;
    return (
      <div>
        <h1>{displayName}</h1>
        <Segment>
          <div>
            <Form name={name} onSubmit={handleSubmit(values => handleEvent(values))}>
              {fields.map(field => this.renderInputField(field))}
              <div>
                <Form.Button disabled={submitSucceeded} >{displayName}</Form.Button>
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
  { name: 'title', label: 'Title', placeholder: 'Title...' },
  { name: 'description', label: 'Description', placeholder: 'Description...' },
];

const mapAddFormState = (state) => ({
  name: 'add-event',
  displayName: 'Add a New Event',
  initialValues: {title: '', description: ''},
  fields: fields,
  // error: state.user.error
});

const mapEditFormState = (state) => ({
  name: 'edit-event',
  displayName: 'Update Event',
  initialValues: state.event,
  fields: fields,
});

const mapAddFormDispatch = (dispatch) => ({
  load: () => ({}),
  handleEvent: (values) => {
    const {title, description} = values;
    const event = {title, description};
    dispatch(addEvent(event));
  },
});

const mapEditFormDispatch = (dispatch, ownProps) => ({
  load: () => dispatch(fetchEventDetail(ownProps.match.params.id)),
  handleEvent: (values) => {
    dispatch(editEventDetail(values));
  },
});

export const AddEventForm =
  reduxForm({
    form: 'addEventForm'
  })(connect(mapAddFormState, mapAddFormDispatch)(EventForm));

  export const EditEventForm =
  reduxForm({
    form: 'editEventForm',
    enableReinitialize: true // this is needed!!
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
