import React, { Component } from 'react';
import { Form, Icon, Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {fetchEventsByKeyword, fetchEventsByLocation} from '../store';


/* -----------------    COMPONENT     ------------------ */
class SearchBar extends Component {
  constructor() {
    super();
    this.state = {keyword: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({keyword: event.target.value})
  }

  handleClick(event) {
    console.log('adasd')
    event.preventDefault();
    this.props.searchEvents('10004');
  }

  render() {
    return (

      <Button animated='fade' circular compact={true} onClick={this.handleClick}>
        <Button.Content visible >
          <Icon name='marker' size='big' color='blue'/>
        </Button.Content>
        <Button.Content hidden>
          Events Near Me
        </Button.Content >
      </Button>



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
