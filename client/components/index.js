/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {AllEvents} from './events'
export {default as EventDetail} from './event-detail'
export {AddEventForm, EditEventForm} from './event-form'
export {AllOrganizations} from './organizations'
export {default as OrganizationDetail} from './organization-detail'
export { AddOrganizationForm, EditOrganizationForm } from './organization-form'
export {default as SearchBar} from './search-bar'
