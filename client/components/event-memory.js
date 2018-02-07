import React from 'react';
import { Card, Image, Modal } from 'semantic-ui-react';

const renderVideo = (post) => (
  <video controls style={{ width: '100%', height: 'auto' }} >
    <source src={post.url} type={post.type} />
  </video>
);

const EventMemory = function(props){
  return (
      <Card.Group itemsPerRow={4} style={{maxHeight: '60%', overflow: 'auto'}}>

        {props.posts.map((post) => {
            let media;
            if (post.type.includes('video')) {
              media = renderVideo(post);
              return (
                <Card key={post.id} style={{width: '25%'}}>
                  <Modal
                  trigger={media}
                  >
                  <Modal.Content>
                    {media}
                  </Modal.Content>
                  </Modal>
               </Card>
              )
            }
            else {
              media = <Image src={post.url} fluid rounded style={{height: '100%'}} />;
              return (
              <Card style={{width:'25%'}}>
                <Modal
                  trigger={media}
                  >
                  <Modal.Content>
                    {media}
                  </Modal.Content>
                </Modal>
              </Card>
            )
          }
       })}
      </Card.Group>
  );
}

export default EventMemory;
