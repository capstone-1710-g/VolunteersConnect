import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Icon, Grid, Message, Header } from 'semantic-ui-react';
import { googleLogout, onSignIn } from '../store/user';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { isLoggedIn, onGoogleSignIn } = props

  return (
    <div className='login-form'>
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
            {' '}Log-in to your account
          </Header>
          {isLoggedIn && <Button onClick={() => googleLogout()}>Logout</Button>}
          <Button color='google plus' onClick={() => onGoogleSignIn()}>
            <Icon name='google plus' /> Google Plus
          </Button>
          <Message>
            New to us? <a href='#'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}

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
