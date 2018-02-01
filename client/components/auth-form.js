import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Button, Icon, Grid, Segment, Message, Header } from 'semantic-ui-react';
import {user} from '../store'
import { googleLogout, onSignIn } from '../store/user';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, isLoggedIn, displayName, onGoogleSignIn, error} = props

  return (
    <div className='login-form'>
      {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='black' textAlign='center'>
            {/* <Image src='/logo.png' /> */}
            {' '}Log-in to your account
          </Header>
          {/* <Button color='facebook' onClick={() => facebookLogin()}>
            <Icon name='facebook' /> Facebook
          </Button> */}
          {isLoggedIn && <Button onClick={() => googleLogout()}>Logout</Button>}
          <Button color='google plus' onClick={() => onGoogleSignIn()}>
            <Icon name='google plus' /> Google Plus
          </Button>
          {/* <div onClick={() => onSignIn()} className="g-signin2" data-onsuccess="onSignIn">
          </div> */}
          <Message>
            New to us? <a href='#'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    isLoggedIn: state.user.id,
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => ({
  onGoogleSignIn: () => {
    dispatch(onSignIn())
  }
})

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
