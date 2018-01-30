import React from 'react';
import YouTube from 'react-youtube';
import { Card, Image, Segment } from 'semantic-ui-react';

const EventFeed = (props) => {
    const getChatMessages = (data) => {
        return data ? Object.keys(data).map(key => data[key]) : []
    }

    const data = getChatMessages(props.posts)

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
  <Card style={{ marginTop: 10, width: '100%' }} key={post.id}>
    <Card.Content>
      <Card.Header>
        {post.user}
      </Card.Header>
    </Card.Content>
    <YouTube
      videoId={post.content}
      opts={{ height: '200', flex: 1 }}
    />
  </Card>
);

const renderImage = (post) => (
  <Card style={{ marginTop: 10, width: '100%' }} key={post.id}>
    <Card.Content>
      <Image floated="left" size="mini" src={post.userImage} />
      <Card.Header floated="right">
        {post.user}
      </Card.Header>
      <Card.Meta>
        {post.time}
      </Card.Meta>
    </Card.Content>
    <Image src={post.url} fluid rounded />
  </Card>
);

const renderVideo = (post) => (
  <Card style={{ marginTop: 10, width: '100%' }} key={post.id}>
    <Card.Content>
      <Card.Header>
        {post.user}
      </Card.Header>
    </Card.Content>
    <video controls width="100%" height="auto">
      <source src={post.url} type={post.type} />
    </video>
  </Card>
);

const renderText = (post) => (
  <Card style={{ marginTop: 10, width: '100%' }} key={post.id}>
    <Card.Content>
      <Image floated="left" size="mini" src={post.userImage} />
      <Card.Header floated="right">
        {post.user}
      </Card.Header>
      <Card.Meta>
        {post.time}
      </Card.Meta>
      <Card.Description>
        {post.content}
      </Card.Description>
    </Card.Content>
  </Card>
);

function renderPost(post) {
  if (post.type === 'youtube') {
    return renderYouTube(post);
  } else if (post.type.includes('image')) {
    return renderImage(post);
  } else if (post.type.includes('video')) {
    return renderVideo(post);
  } else {
    return renderText(post);
  }
}

export default EventFeed;

