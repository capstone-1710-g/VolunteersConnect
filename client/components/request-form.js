import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addVolunteerToEvent } from '../store/event';

export class RequestForm extends Component {
    constructor (props) {
        super(props)
        this.state = {
            open: false,
            firstName: this.props.user.firstName || '',
            lastName: this.props.user.lastName || '',
            email: this.props.user.email || '',
            textArea: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleSubmit() {
        this.props.signUpForVolunteer({ ...this.state, event: this.props.event, user: this.props.user })
        console.log('submitted', this.state)
    }

    render () {
        return (
            <Form onSubmit={() => {
                this.handleSubmit()
                this.props.toggleModal()
            }}>
                <Form.Group>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' value={this.state.firstName} onChange={e => this.setState({ firstName: e.target.value })} />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name' value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })} />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder='Email' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                    </Form.Field>
                    <Form.Field>
                        <label>Why would you like to volunteer for this event?</label>
                        <textarea value={this.state.textArea} onChange={e => this.setState({ textArea: e.target.value })} />
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


export default connect(mapStateToProps, mapDispatchToProps)(RequestForm)