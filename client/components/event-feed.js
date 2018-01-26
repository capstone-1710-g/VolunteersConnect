import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react'




const EventFeed = (props) => {

    console.log(props.posts)
    return (
        <div>
            {
                props.posts.map(post => {
                    return (
                        <div key={post.id}>
                            {/* <h6>{post.time}</h6> */}
                            <h4>{post.content}</h4>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default EventFeed;


    // renderPost() {
    //     this.props.posts.map(post => {
    //         return (
    //             <Feed.Event>
    //                 <Feed.Label>
    //                     {/* <img src='/assets/images/avatar/small/elliot.jpg' /> */}
    //                 </Feed.Label>
    //                 <Feed.Content>
    //                     <Feed.Summary>
    //                         <Feed.User>USER</Feed.User> 
    //                         <Feed.Date>{post.time}</Feed.Date>
    //                         <Feed.Extra>{post.content}</Feed.Extra>
    //                     </Feed.Summary>
    //                 </Feed.Content>
    //             </Feed.Event>
    //         )
    //     })
    // }