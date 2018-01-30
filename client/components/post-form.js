import React, { Component } from 'react';
import { Form, Button, TextArea, Icon, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { messageChanged, sendPostThunk, sendMediaThunk } from '../store/text-post';
import { Field, reduxForm } from 'redux-form';
import { InputField, TextAreaField } from 'react-semantic-redux-form';


class PostForm extends Component {
  handlePost() {
      this.props.sendPostThunk(this.props.textPost.post, this.props.event.id)
  }

  handleSubmit(e) {
      e.preventDefault()
      this.props.sendMediaThunk(e.target.upload.files[0], this.props.event.id)
  }

  render() {
    const { handleSubmit, handlePost, fields, submitSucceeded, error } = this.props;
    return (
      <Form reply onSubmit={this.handleSubmit.bind(this)}>
        <TextArea
          placeholder="Send a post!"
          onChange={(e, text) => this.props.messageChanged(text.value)}
        />
        <Button
          content="Post"
          labelPosition="right"
          icon="send"
          style={{ marginTop: 10, backgroundColor: '#53c66c', color: 'white' }}
          onClick={() => this.handlePost()}
        />
        <Input
          type="file"
          accept="video/*"
          name="upload"
        />
        <Button
          content="+ Photo/Video"
          labelPosition="right"
          icon="camera"
          style={{ marginTop: 10 }}
          primary
          type="submit"
        />
      </Form>
    )
  }

  // render() {
  //   return (
  //     <Form reply onSubmit={this.handleSubmit.bind(this)}>
  //       <TextArea
  //         placeholder="Send a post!"
  //         onChange={(e, text) => this.props.messageChanged(text.value)}
  //       />
  //       <Button
  //         content="Post"
  //         labelPosition="right"
  //         icon="send"
  //         style={{ marginTop: 10, backgroundColor: '#53c66c', color: 'white' }}
  //         onClick={() => this.handlePost()}
  //       />
  //       <Input
  //         type="file"
  //         accept="video/*"
  //         name="upload"
  //         />
  //       <Button
  //         content="+ Photo/Video"
  //         labelPosition="right"
  //         icon="camera"
  //         style={{ marginTop: 10 }}
  //         primary
  //         type="submit"
  //       />
  //     </Form>
  //   )
  // }
}

const mapStateToProps = ({ textPost }) => {
    return {
        textPost
    }
}

const mapDispatchToProps = (dispatch) => ({
  messageChanged: (data) => {
    dispatch(messageChanged(data))
  },
  sendPostThunk: (content, eventId) => {
    dispatch(sendPostThunk(content, eventId))
  },
  sendMediaThunk: (file, eventId) => {
    dispatch(sendMediaThunk(file, eventId))
  },
})

// wire up redux-form
const PostFormContainer = connect(mapStateToProps, mapDispatchToProps)(PostForm);
export default PostFormContainer;
