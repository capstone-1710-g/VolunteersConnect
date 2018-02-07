import React from 'react';
import { Player } from 'video-react';

import { Card, Image, Embed, Modal } from 'semantic-ui-react';

const settings = {
  dots: true
};

const EventMemory = function(props){
  return(
      // <Carousel
      // showThumbs={false}
      // showStatus={false}
      // useKeyboardArrows
      // >


      // </Carousel>

      <Card.Group itemsPerRow={4} style={{maxHeight: '60%', overflow: 'auto'}}>

        {props.posts.map((post) => {
            let media;
            if (post.type.includes('video')){
              media = renderVideo(post);
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
            else {
              media = <Image src={post.url} fluid rounded style={{height: '100%'}}/>;
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

const renderVideo = (post) => (
  <video controls style={{width:'100%', height: 'auto'}} >
    <source src={post.url} type={post.type}/>
  </video>
);
export default EventMemory;
