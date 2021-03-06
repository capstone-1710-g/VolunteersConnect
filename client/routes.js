import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome,
  AllEvents, EventDetail, AddEventForm, EditEventForm,
  AllOrganizations, OrganizationDetail, AddOrganizationForm, EditOrganizationForm,
  AllSearchResults,
  Messages, UserPage
 } from './components'
import { me } from './store/user'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/events/search/:keyword/:radius" component={AllSearchResults} />
            <Route exact path="/events/:id/edit" component={EditEventForm} />
            <Route exact path="/events/:id" component={EventDetail} />
            <Route exact path="/events" component={AllEvents} />
            <Route exact path="/organizations/add" component={AddOrganizationForm} />
            <Route exact path="/organizations/:organizationId/events/add" component={AddEventForm} />
            <Route exact path="/organizations/:id/edit" component={EditOrganizationForm} />
            <Route exact path="/organizations/:id" component={OrganizationDetail} />
            <Route exact path="/organizations" component={AllOrganizations} />

            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                  <Route path="/messages" component={Messages} />
                  <Route exact path="/:displayName" component={UserPage} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={UserHome} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: (state.user.role && state.user.role === 'admin'),
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
