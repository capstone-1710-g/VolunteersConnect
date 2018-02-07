import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addVolunteerToEvent } from '../store/event';

export class RequestForm extends Component {
    constructor (props) {
        super(props)
        this.state = {
          open: false,
          reasonToVolunteer: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        this.props.signUpForVolunteer({
          reasonToVolunteer: this.state.reasonToVolunteer,
          event: this.props.event,
          user: this.props.user
        });
    }

    render () {
        return (
            <Form onSubmit={() => {
                this.handleSubmit()
                this.props.toggleModal()
            }}>
                <Form.Group>
                    <Form.Field>
                        <label>Why would you like to volunteer for this event?</label>
                  <textarea value={this.state.reasonToVolunteer} onChange={e => this.setState({ reasonToVolunteer: e.target.value })} />
                    </Form.Field>
                </Form.Group>
                <Button type='submit' positive>Complete</Button>
                <Button negative onClick={this.props.toggleModal}>Cancel</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signUpForVolunteer: (request) => {
            dispatch(addVolunteerToEvent(request))
        },
        toggleModal: ownProps.toggleModal
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
