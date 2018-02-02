import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {fetchEventsByKeyword, fetchEventsByLocation} from '../store';


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
    if (this.state.keyword.length){
      const keyword = this.state.keyword;
      this.setState({ keyword: '' });
      this.props.searchEvents(keyword);
    }
  }

  render() {
    return (
    <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
          action={{ icon: 'search' }}
          onChange={this.handleChange}
          value={this.state.keyword}
          placeholder="Search Events by ZIP Code..." />
        </Form>
    </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapDispatch = (dispatch) => {
  return {
    searchEvents: (keyword) => {
      dispatch(fetchEventsByLocation(keyword, 5));
    }
  }
};

export default connect(null, mapDispatch)(SearchBar);


