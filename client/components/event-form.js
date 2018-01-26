import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEvent } from '../store/events';
import { fetchEventDetail, editEventDetail } from '../store/event';
import { Form, Segment } from 'semantic-ui-react';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialValues;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.load();
  }

  componentWillReceiveProps() {
    this.setState(this.props.product);
  }

  handleChange(name) {
    return event => {
      this.setState({[name]: event.target.value});
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
            <Form name={name} onSubmit={(event) => handleSubmit(event, this.state)}>
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
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description' },
];

const mapAddFormState = (state) => ({
  name: 'add-event',
  displayName: 'Add a New Event',
  initialValues: {title: '', description: ''},
  event: { title: '', description: ''},
  fields: fields,
  // error: state.user.error
});

const mapEditFormState = (state) => ({
  name: 'edit-event',
  displayName: 'Update Event',
  initialValues: { title: '', description: ''},
  event: state.event,
  fields: fields,
});

const mapAddFormDispatch = (dispatch) => ({
  load: () => ({}),
  handleSubmit: (e, event) => {
    e.preventDefault();
    dispatch(addEvent(event));
  },
});

const mapEditFormDispatch = (dispatch, ownProps) => ({
  load: () => dispatch(fetchEventDetail(ownProps.match.params.id)),
  handleSubmit: (e, event) => {
    e.preventDefault();
    dispatch(editEventDetail(event));
  },
});

export const AddEventForm = connect(mapAddFormState, mapAddFormDispatch)(EventForm);
export const EditEventForm = connect(mapEditFormState, mapEditFormDispatch)(EventForm);

/**
 * PROP TYPES
 */
EventForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // error: PropTypes.object
};
