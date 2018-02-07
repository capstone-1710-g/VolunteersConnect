import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Player } from 'video-react';
 // import css
// import Styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

const EventMemory = function(props){
  return(
      <Carousel
      showThumbs={false}
      showStatus={false}
      useKeyboardArrows
      >

          {props.posts.map((post) => {
            if(post.type.includes('video'))
              return (
                <div style={{width:'100%', height:'100%'}}>
                  {renderVideo(post)}
               </div>
              )
            else
            return (
              <div><img src={post.url} /></div>
            )

          })}
      </Carousel>
  );
}

const renderVideo = (post) => (
  <Player>
    <source src={post.url} />
  </Player>
);
export default EventMemory;
