import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {SearchBar} from './index'
import { Container, Menu, Image, Button, Icon } from 'semantic-ui-react'
import { onSignIn, logout, createUser } from '../store/user'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn, isAdmin, user, onGoogleSignIn } = props

  return (
    <div>
      <Menu size="large" borderless style={{ backgroundColor: '#dce2e8'}} stackable>
        <Container>
          <Menu.Item as={Link} to="/home" header>
            <Image style={{ height: '5.5em', width: 'auto' }} src="/logo.png"  />
          </Menu.Item>
          <Menu.Item as={Link} to="/events">Events</Menu.Item>
          <Menu.Item as={Link} to="/organizations">Organizations</Menu.Item>
          { isLoggedIn &&
          <Menu.Item as={Link} to="/messages">Messages</Menu.Item>
          }
          <div className="right menu">
            <Menu.Item style={{float: 'left'}}>
              <SearchBar />
            </Menu.Item>
          </div>
          {
            isLoggedIn
              ? <div className="right menu">
                {/* The navbar will show these links after you log in */}
                <Menu.Item>
                  <Image
                    size="mini" src={user.profileImage}
                    style={{height: '35px', margin: '0 1em'}}
                  />
                  <Link to= {`/${user.displayName}`}> {user.displayName}</Link>
                </Menu.Item>
                <Menu.Item as="a" href="#" onClick={handleClick}>Logout</Menu.Item>
              </div>
              : <div className="right menu">
                {/* The navbar will show these links before you log in */}
                {/* <Menu.Item as={Button} onClick={props.generateRandomUser}>
                  Log In As Random User
                </Menu.Item> */}
                {/* <Menu.Item as={Link} to="/login">Login</Menu.Item>
                <Menu.Item as={Link} to="/signup">Sign Up</Menu.Item> */}
                <Menu.Item>
                  <Button onClick={() => onGoogleSignIn()}>
                  <Icon name="google" />Log In With Google
                  </Button>
                </Menu.Item>
              </div>
          }
        </Container>
      </Menu>
      <Container style={{ marginTop: '1em' }}>
        {children}
      </Container>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isAdmin: state.user && state.user.role === 'admin',
    isLoggedIn: !!state.user.id,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => ({
  handleClick() {
    dispatch(logout())
  },
  onGoogleSignIn: () => {
    dispatch(onSignIn())
  },
  generateRandomUser: () => {
    fetch('https://randomuser.me/api/')
      .then(results => results.json())
      .then(results => {
        const [randomUser] = results.results;
        const { name, email, picture, login } = randomUser;
        const firstName = name.first[0].toUpperCase() + name.first.slice(1);
        const lastName = name.last[0].toUpperCase() + name.last.slice(1);
        const newUser = {
          displayName: firstName + ' ' + lastName,
          email,
          photoURL: picture.large,
          uid: login.md5,
        }
        dispatch(createUser(newUser));
      });
  }
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
