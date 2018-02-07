import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { sendPost } from '../store/post';
import { Field, reduxForm, reset } from 'redux-form';
import { InputField, TextAreaField } from 'react-semantic-redux-form';

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const FileInput = ({
  input: {
    value: omitValue,
  onChange,
  onBlur,
  ...inputProps,
  },
  meta: omitMeta,
  ...props,
}) =>
  (<input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />);


const PostForm = props => {
  const { user, event, handleSubmit, handlePost, error, isLoggedIn } = props;
  return (
    <Form
      reply style={{display: 'flex', flexDirection: 'column'}}
    onSubmit={handleSubmit(values => handlePost(values, event.id, user))}>
        <Field
          name="content"
          placeholder="Write something..."
          component={TextAreaField}
        />
      <Field
        component={FileInput}
        name="file"
      />
        <Form.Button
          disabled={!isLoggedIn}
          content="Post"
          labelPosition="right"
          icon="send"
          style={{ marginTop: 10 }}
          primary
          type="submit"
        />
    </Form>
  )
}

const mapStateToProps = ({ post, user }) => ({
  post, user,
  isLoggedIn: !!user.id,
});

const mapDispatchToProps = (dispatch) => ({
  handlePost: (values, eventId, user) => {
    const {file, content} = values;
    const {messageSession, ...rest} = user;
    dispatch(sendPost(content, file, eventId, {...rest}));
    dispatch(reset('postForm'));
  },
});

export default reduxForm({
  form: 'postForm',
})(connect(mapStateToProps, mapDispatchToProps)(PostForm));
