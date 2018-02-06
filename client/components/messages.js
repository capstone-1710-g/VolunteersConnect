import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Tab, Item, Image, Divider } from 'semantic-ui-react';
import { getMessageSessions } from '../store';
import moment from 'moment';
import MessageForm from './message-form';

class Messages extends Component {
  componentDidMount() {
    const {user, load} = this.props;
    load(Object.keys(user.messageSessions || {}));
  }

  renderMessageList(messageSession, otherUser) {
    const {user} = this.props;
    const {messages} = messageSession;
    const messagesArr = Object.keys(messages).map(id => ({
      ...messages[id], id
    })).sort((m1, m2) => m1.timestamp > m2.timestamp);
    return (
    <Segment>
    <Item.Group>
    {messagesArr.map(message => {
      const isFromMe = message.senderId === user.id;
      return (
      <Item key={message.id}>
        <Item.Image size="tiny" src={isFromMe ? user.profileImage : otherUser.profileImage} />

        <Item.Content>
          <Item.Header as="a">{isFromMe ? user.displayName : otherUser.displayName}</Item.Header>
            <Item.Meta>{moment(new Date(message.timestamp)).format('MMMM Do YYYY, h:mm:ss a')}</Item.Meta>
          <Item.Description>
            {message.content}
          </Item.Description>
          <Item.Extra>{message.isRead ? 'Read' : 'Unread'}</Item.Extra>
        </Item.Content>
      </Item>
    )})}
    </Item.Group>
    </Segment>
    )
  }

  render() {
    const {user, messageSessions} = this.props;
    const sortedSessions = messageSessions.sort((s1, s2) => s1.timestamp > s2.timestamp);
    const panes = sortedSessions.map(session => {
      const otherUser = session.participants[0].id === user.id ?
        session.participants[1] : session.participants[0];

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
            {session.messages ? this.renderMessageList(session, otherUser) : 'No Messages yet'}
            <Divider />
            <MessageForm sessionId={session.id} senderId={user.id} recipientId={otherUser.id} />
        </Tab.Pane>)
      }
    });

    return (
      <div>
        <h1>Messages</h1>
        <Segment raised>
        {panes.length ?
            <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} /> : <h3>No Messages.</h3>}
        </Segment>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ user, messageSessions }) => ({
  user,
  messageSessions: messageSessions,
  isAdmin: user && user.role === 'admin',
  isLoggedIn: !!user.id,
});

const mapDispatch = (dispatch) => ({
  load: (messageSessionIds) =>
    dispatch(getMessageSessions(messageSessionIds))
  ,
});

export default connect(mapState, mapDispatch)(Messages);
