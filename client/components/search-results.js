import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SearchMap} from '../components';
import {fetchEventsByLocation} from '../store';

class SearchResults extends Component{

  componentDidMount(){

    const {keyword, radius} = this.props.match.params;
    const {searchedEvents} = this.props;

    if (!searchedEvents.length){
      this.props.fetchSearchEvents(keyword, radius);
    }

  }
  render(){
    return (
      <SearchMap
      searchedEvents={this.props.searchedEvents}
      zipcode={this.props.match.params.keyword}
      />


    )

  }


}


const mapAllSearchResultsState = ({searchedEvents}) => ({
  searchedEvents

})

const mapAllSearchResultsDispatch = (dispatch) => ({

  fetchSearchEvents: (zipcode, radius) => dispatch(fetchEventsByLocation(zipcode, radius))

});

export const AllSearchResults = connect(mapAllSearchResultsState, mapAllSearchResultsDispatch)(SearchResults);
