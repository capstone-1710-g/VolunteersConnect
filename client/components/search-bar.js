import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {fetchEventsByKeyword} from '../store/events';
import history from '../history';

/* -----------------    COMPONENT     ------------------ */
class SearchBar extends Component {
  constructor() {
    super();
    this.state = {keyword: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({keyword: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    const keyword = this.state.keyword;
    this.setState({ keyword: '' });
    this.props.searchEvents(keyword);
  }

  render() {
    return (
    <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
          action={{ icon: 'search' }}
          onChange={this.handleChange}
          value={this.state.keyword}
          placeholder="Search Events..." />
        </Form>
    </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapDispatch = (dispatch) => ({
  searchEvents: () => {
    //console.log(zipcodes);
    // dispatch(fetchEventsByKeyword(keyword));
    // history.push('/events/search/' + keyword);

  }
});

export default connect(null, mapDispatch)(SearchBar);


