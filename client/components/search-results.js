import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SearchMap} from '../components';
import {fetchEventsByLocation} from '../store';
import { Item, Segment, Image, Icon, Button, Menu, Input, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SearchResults extends Component{
  constructor(props){
    super(props);
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.state = {
      searchTerm: ''
    }
  }

  componentDidMount(){

    const {keyword, radius} = this.props.match.params;
    const {searchedEvents} = this.props;

    if (!searchedEvents.length){
      this.props.fetchSearchEvents(keyword, radius);
    }

  }

  onSearchTermChange(e){
    this.setState({searchTerm: e.target.value});
  }

  render(){

    const filteredEvents = this.props.searchedEvents.filter((e) => {
      return e.title.includes(this.state.searchTerm);
    });
    return (

      <div>
        <h1>Nearby Events</h1>
        <Divider />
        <Input fluid placeholder="Filter Events by keyword..." onChange={this.onSearchTermChange} />
        <Segment.Group horizontal>
          <SearchMap
          searchedEvents={filteredEvents}
          zipcode={this.props.match.params.keyword}
        />
        <Segment raised style={{width: '30%', maxHeight: 600, overflow: 'auto'}}>
          <Item.Group divided>
            {filteredEvents.map(event => (
              <Item key={event.id} color="grey" as={Link} to={'/events/' + event.id}>
                <Item.Image size="small" src={event.imageUrl} />
                <Item.Content>
                  <Item.Header>
                    {event.title}
                  </Item.Header>
                  <Item.Description>
                    {event.description}
                  </Item.Description>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>

      </Segment.Group>
    </div>

    )

  }

}

const mapAllSearchResultsState = ({searchedEvents}) => {
  return {
    searchedEvents
  }

}

const mapAllSearchResultsDispatch = (dispatch) => ({

  fetchSearchEvents: (zipcode, radius) => dispatch(fetchEventsByLocation(zipcode, radius))

});

export const AllSearchResults = connect(mapAllSearchResultsState, mapAllSearchResultsDispatch)(SearchResults);
