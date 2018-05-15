import React from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { sendMessage } from '../store/messageSessions';
import { Field, reduxForm, reset } from 'redux-form';
import { TextAreaField } from 'react-semantic-redux-form';

const MessageForm = props => {
  const { handleSubmit, handleMessage, isLoggedIn } = props;
  return (
    <Form
      reply style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit(values => handleMessage(values))}>
      <Field
        name="content"
        placeholder="Write something..."
        component={TextAreaField}
      />
      <Form.Button
        floated="right"
        disabled={!isLoggedIn}
        content="Send"
        labelPosition="right"
        icon="send"
        style={{ marginTop: 10 }}
        primary
        type="submit"
      />
    </Form>
  )
}

const mapStateToProps = ({ user }) => ({
  user,
  isLoggedIn: !!user.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleMessage: (values) => {
    const message = {
      content: values.content,
      senderId: ownProps.senderId,
      recipientId: ownProps.recipientId,
      timestamp: new Date().getTime(),
      isRead: false,
    };
    dispatch(sendMessage(message, ownProps.sessionId));
    dispatch(reset('messageForm'));
  },
});

export default reduxForm({
  form: 'messageForm',
})(connect(mapStateToProps, mapDispatchToProps)(MessageForm));
