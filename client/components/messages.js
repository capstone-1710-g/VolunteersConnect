import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Tab, Menu, Item, Image, Divider } from 'semantic-ui-react';
import { getMessageSessions } from '../store';
import moment from 'moment';

class Messages extends Component {
  componentDidMount() {
    const {user, load} = this.props;
    load(Object.keys(user.messageSessions || {}));
  }

  render() {
    const {user, messageSessions} = this.props;
    const panes = messageSessions.map(session => {
      const otherUser = session.participants[0].id === user.id ?
        session.participants[1] : session.participants[0];
      // const mostRecentMsg; <-TODO
      return {
        menuItem: otherUser.displayName,
        render: () =>
        (<Tab.Pane key={session.id}>
            <h3>
              <span>Chat started with</span>
              <span><Image size="mini" circular src={otherUser.profileImage} />
              </span>
              {otherUser.displayName}
            </h3>
            On {moment(new Date(session.timestamp)).format('MMMM Do YYYY, h:mm:ss a')}
            <Divider />
            {session.messages ? 'All Messages!' : 'No Messages yet'}
        </Tab.Pane>)
      }
    });

    return (
      <div>
        <h1>Messages</h1>
        <Segment raised>
        {panes.length ?
        <Tab menu={{fluid: true, vertical: true, tabular: 'right' }} panes={panes} /> : <h3>No Messages.</h3>}
        </Segment>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ user, messageSessions }) => ({
  user,
  messageSessions,
  isAdmin: user && user.role === 'admin',
  isLoggedIn: !!user.id,
});

const mapDispatch = (dispatch) => ({
  load: (messageSessionIds) =>
    dispatch(getMessageSessions(messageSessionIds))
  ,
});

export default connect(mapState, mapDispatch)(Messages);
