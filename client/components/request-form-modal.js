import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import RequestForm from './request-form';

class RequestFormModal extends Component {
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <Modal
                trigger={<Button positive onClick={this.toggleModal}>Volunteer for this event!</Button>}
                open={this.state.isOpen}
            >
                <Modal.Header>Volunteer</Modal.Header>
                <Modal.Content>
                    <RequestForm event={this.props.event} toggleModal={this.toggleModal} />
                </Modal.Content>
            </Modal>
        )
    }
}

export default RequestFormModal
