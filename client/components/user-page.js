import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Image, Grid, Sidebar, Segment, Menu, Icon, Header, Container} from 'semantic-ui-react'

class UserPage extends Component{

  constructor(){
    super();

  }

  render(){
    return(

        <Container textAllign='left'>
            <Sidebar.Pushable as={Segment} style={{height: 900, width: 800}}>
              <Sidebar as={Menu} animation='scale down' width='thin' visible={true} icon='labeled' vertical inverted>
                <Menu.Item name='home'>
                  <Icon name='home' />
                  Home
                </Menu.Item>
                <Menu.Item name='gamepad'>
                  <Icon name='gamepad' />
                  Games
                </Menu.Item>
                <Menu.Item name='camera'>
                  <Icon name='camera' />
                  Channels
                </Menu.Item>
              </Sidebar>
              <Sidebar.Pusher>

              </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Container>
    )
  }

}

const mapState = (state) => {
  return {
    user: state.user
  }
};

export default connect(mapState)(UserPage);
