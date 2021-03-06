import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import { deleteEvent } from "../eventActions";
import { firestoreConnect } from "react-redux-firebase";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../eventActivity/EventActivity";

const mapState = state => ({
  //events: state.events,
  events: state.firestore.ordered.events,
  loading: state.async.loading
});

const actions = {
  deleteEvent
};

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
  // state = {
  //   // events: eventsDashboard,
  //   isOpen: false,
  //   selectedEvent: null
  // };
  // handleFormOpen = () => {
  //   this.setState({
  //     isOpen: true,
  //     selectedEvent: null
  //   });
  // };
  // handleFormClose = () => {
  //   this.setState({
  //     isOpen: false
  //   });
  // };

  // handleOpenEvent = eventToOpen => () => {
  //   this.setState({
  //     selectedEvent: eventToOpen,
  //     isOpen: true
  //   });
  // };

  // handleUpdateEvent = updatedEvent => {
  //   this.props.updateEvent(updatedEvent);
  //   this.setState({
  //     // events: this.state.events.map(event => {
  //     //   if (event.id === updatedEvent.id) {
  //     //     return Object.assign({}, updatedEvent);
  //     //   } else {
  //     //     return event;
  //     //   }
  //     // }),
  //     isOpen: false,
  //     selectedEvent: null
  //   });
  // };
  // handleCreateEvent = newEvent => {
  //   newEvent.id = cuid();
  //   newEvent.hostPhotoURL = "assets/user.png";
  //   // const updatedEvent = [...this.state.events, newEvent];
  //   this.props.createEvent(newEvent);
  //   this.setState({
  //     // events: updatedEvent,
  //     isOpen: false
  //   });
  // };

  handleDeleteEvent = eventId => () => {
    // const updateEvents = this.state.events.filter(e => e.id !== eventId);
    // this.setState({
    //   events: updateEvents
    // });
    this.props.deleteEvent(eventId);
  };

  render() {
    //const { selectedEvent } = this.state;
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <EventList
              deleteEvent={this.handleDeleteEvent}
              // eventOpen={this.handleOpenEvent}
              events={events}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <EventActivity />
            {/* <Button
              onClick={this.handleFormOpen}
              positive
              content="Create Event"
            />
            {this.state.isOpen && (
              <EventForm
                updateEvent={this.handleUpdateEvent}
                selectedEvent={selectedEvent}
                createEvent={this.handleCreateEvent}
                handleFormClose={this.handleFormClose}
              />
            )} */}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
