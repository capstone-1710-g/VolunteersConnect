import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Image} from 'semantic-ui-react'

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
