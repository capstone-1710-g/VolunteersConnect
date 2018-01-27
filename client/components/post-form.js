import React, { Component } from 'react';
import { Form, Button, TextArea, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { messageChanged, sendPostThunk } from '../store/text-post';


class PostForm extends Component {

    handlePost() {
        this.props.sendPostThunk(this.props.textPost.post, this.props.event.id)
    }

    render() {
        console.log('propingtonnnnsss', this.props)
        return (
            <Form reply>
                <TextArea
                    placeholder="Send a post!"
                    onChange={(e, text) => this.props.messageChanged(text.value)}
                />
                <Button content='Send'
                    labelPosition='right'
                    icon='send'
                    style={{ marginTop: 10, backgroundColor: '#53c66c', color: 'white' }}
                    onClick={() => this.handlePost()}
                />
                <Button content='+ Photo/Video'
                    labelPosition='right'
                    icon='camera'
                    style={{ marginTop: 10 }}
                    primary
                />
            </Form>
        )
    }
}

const mapStateToProps = ({ textPost }) => {
    return {
        textPost
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         messageChanged: (data) => {
//             dispatch(messageChanged(data))
//         },
//         sendPostThunk: (content) => {
//             dispatch(sendPostThunk(content))
//         }
//     }
// }

const PostFormContainer = connect(mapStateToProps, {messageChanged, sendPostThunk})(PostForm);
export default PostFormContainer;
