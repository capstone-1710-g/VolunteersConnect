import React from 'react';
import YouTube from 'react-youtube';
import { Card, Image, Segment } from 'semantic-ui-react';

const EventFeed = (props) => {

    const getChatMessages = (data) => {
        return data ? Object.keys(data).map(key => data[key]) : []
    }

    const data = getChatMessages(props.posts)

    return (
        <Segment>
            {
                data.map(post => {
                    return (
                        <div key={post.id}>
                            {renderPost(post)}
                        </div>
                    )
                })
            }
        </Segment>
    )

}

function renderPost(post) {
    if (post.type === 'video') {
        return (
            // <video controls>
            //     <source src={post.content} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
            // </video>
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
        )
    } else if (post.type === 'image') {
        return (
            <Card style={{ marginTop: 10, width: '100%' }} key={post.id}>
                <Card.Content>
                    <Image floated='left' size='mini' src={post.userImage} />
                    <Card.Header floated='right'>
                        {post.user}
                    </Card.Header>
                    <Card.Meta>
                        {post.time}
                    </Card.Meta>
                </Card.Content>
                <Image src={post.content} fluid rounded 
                // style={{ paddingLeft: 50, paddingRight: 50, backgroundColor: 'white'}} 
                />
            </Card>
        )
    } else {
        return (
            <Card style={{ marginTop: 10, width: '100%' }} key={post.id}>
                <Card.Content>
                    <Image floated='left' size='mini' src={post.userImage} />
                    <Card.Header floated='right'>
                        {post.user}
                    </Card.Header>
                    <Card.Meta>
                        {post.time}
                    </Card.Meta>
                    <Card.Description 
                    // style={{ paddingLeft: 50, paddingRight: 50 }}
                    >
                        {post.content}
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}
export default EventFeed;

