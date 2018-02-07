import React from 'react';
import { Carousel } from 'react-responsive-carousel';
// import Styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

const EventMemory = function(props){
  console.log(props.posts)
  return(
      <Carousel>

          {props.posts.map((post) => {
            if(post.type.includes('video'))
              return (
                <div>
                  {renderVideo(post)}
               </div>
              )
            else
            return (
              <div><iframe src={post.url} /></div>
            )

          })}
      </Carousel>
  );
}

const renderVideo = (post) => (
  <video controls width="100%" height="auto">
    <source src={post.url} type={post.type} />
  </video>
);
export default EventMemory;
