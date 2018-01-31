import React from 'react';
import YouTube from 'react-youtube';
import { Card, Image, Segment } from 'semantic-ui-react';
import moment from 'moment';

const EventFeed = (props) => {
    const getChatMessages = (data) => {
        return data ? Object.keys(data).map(key => data[key]) : []
    }

    const data = getChatMessages(props.posts).reverse();

    return (
      <Segment style={{ maxHeight: 500, overflow: 'auto' }}>
        {data.length > 0 ?
          data.map(post => (
            <div key={post.id}>
              {renderPost(post)}
            </div>)
          ) : <h1>No Posts!</h1>
        }
      </Segment>
    )
}

const renderYouTube = (post) => (
  <YouTube
    videoId={post.content}
    opts={{ height: '200', flex: 1 }}
  />
);

const renderImage = (post) => (
  <Image src={post.url} fluid rounded />
);

const renderVideo = (post) => (
  <video controls width="100%" height="auto">
    <source src={post.url} type={post.type} />
  </video>
);

function renderPost(post) {
  return (
  <Card style={{ marginTop: 10, width: '100%' }} key={post.id}>
    <Card.Content>
        <Image floated="left" size="mini" src="https://picsum.photos/100/?random" />
      <Card.Header floated="right">
        Fake Username
      </Card.Header>
      <Card.Meta>
        {moment(new Date(post.createdAt)).fromNow()}
      </Card.Meta>
    </Card.Content>
      <Card.Description>
        {post.content}
      </Card.Description>
      {post.type && post.type.includes('image') && renderImage(post)}
      {post.type && post.type.includes('video') && renderVideo(post)}
  </Card>)
}

export default EventFeed;

