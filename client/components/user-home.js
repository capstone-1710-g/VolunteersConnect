import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Image, Header, Icon } from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {displayName, isLoggedIn} = props

  return (
    <div>
      {isLoggedIn &&
      <h3>Welcome, {displayName}</h3>
      }
      <Image src="volunteer.jpeg" />
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content as='h1'>
          A Social Platform For Volunteers
      </Header.Content>
      <h3>
        We connect volunteers with opportunities and create memories that last a lifetime.
      </h3>
      <h4>
        Real time event feeds for images and videos allow volunteers, participants, friends and family members to share their experience on a single platform
      </h4>
      </Header>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({user}) => {
  return {
    isLoggedIn: !!user.id,
    displayName: user.displayName,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
