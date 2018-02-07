import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {approveVolunteer, rejectVolunteer} from '../store/event';

const ViewRequestModal = (props) => {
  const {event, volunteer, approve, reject} = props;
  return (
    <Modal
      trigger={<Button positive>
      View Volunteer Request</Button>}
      closeIcon
    >
      <Modal.Header>Reason To Volunteer</Modal.Header>
      <Modal.Content>
        <p>{volunteer.reasonToVolunteer}</p>
        <Button
          onClick={() => approve(volunteer, event)}
          positive>
          Approve
        </Button>
        <Button
          onClick={() => reject(volunteer, event)}
          negative>
          Reject
        </Button>
      </Modal.Content>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch) => ({
  approve: (volunteer, event) =>
    dispatch(approveVolunteer(volunteer, event))
  ,
  reject: (volunteer, event) =>
    dispatch(rejectVolunteer(volunteer, event))
  ,
})

export default connect(null, mapDispatchToProps)(ViewRequestModal);

