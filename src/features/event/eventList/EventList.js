import React, { Component } from 'react'
import EventListItem from './EventListItem'

class EventList extends Component {
  render () {
    return (
      <div>
        <h2>Event List</h2>
        <EventListItem />
        <EventListItem />
        <EventListItem />

      </div>
    )
  }
}

export default EventList
