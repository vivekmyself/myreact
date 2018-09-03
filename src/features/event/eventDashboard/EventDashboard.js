import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import cuid from 'cuid'
import EventList from '../eventList/EventList'
import EventForm from '../eventForm/EventForm'

const eventsDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27n',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]


class EventDashboard extends Component {
  /* constructor(props){
    super(props)
    this.state = {
      events: eventsDashboard,
      isOpen:false
    }
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  } */
  state = {
    events: eventsDashboard,
    isOpen:false,
    selectedEvent:null
  }
  handleFormOpen = () =>{
    this.setState({
      isOpen:true,
      selectedEvent:null
    })
  }
  handleFormClose = () => {
    this.setState({
      isOpen:false
    })
  } 

  handleOpenEvent = (eventToOpen) => () =>{
    this.setState({
      selectedEvent:eventToOpen,
      isOpen:true
    })
  }

  handleUpdateEvent = (updatedEvent) =>{
    this.setState({
      events:this.state.events.map(event => {
        if(event.id === updatedEvent.id){
          return Object.assign({}, updatedEvent)
        }else{
          return event
        }
      }),
      isOpen:false,
      selectedEvent:null
    })
  }
  handleCreateEvent = (newEvent) =>{
    newEvent.id = cuid();
    newEvent.hostPhotoURL = 'assets/user.png';
    const updatedEvent = [...this.state.events, newEvent];
    this.setState({
      events:updatedEvent,
      isOpen:false
    })
  }

  handleDeleteEvent = (eventId) => () =>{
    const updateEvents = this.state.events.filter(e => e.id !== eventId )
    this.setState({
      events:updateEvents
    })
  }

  render () {
    const {selectedEvent} = this.state; 
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <EventList deleteEvent={this.handleDeleteEvent} eventOpen={this.handleOpenEvent} events={this.state.events} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Button onClick={this.handleFormOpen} positive content="Create Event" />
            {this.state.isOpen &&
            <EventForm updateEvent={this.handleUpdateEvent} selectedEvent={selectedEvent} createEvent={this.handleCreateEvent}  handleFormClose={this.handleFormClose} /> }
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default EventDashboard
