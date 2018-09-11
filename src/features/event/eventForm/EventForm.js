import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import cuid from "cuid";
import { updateEvent, createEvent } from "../eventActions";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  };
};

const actions = {
  createEvent,
  updateEvent
};

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  };

  // componentDidMount(){
  //   if(this.props.selectedEvent !== null){
  //     this.setState({
  //       event:this.props.selectedEvent
  //     })
  //   }
  // }

  // componentWillReceiveProps(nextProps){
  //   console.log('current props', this.props.selectedEvent);
  //   console.log('next props: ', nextProps.selectedEvent);
  //   if(nextProps.selectedEvent !== this.props.selectedEvent){
  //     this.setState({
  //       event:nextProps.selectedEvent || emptyEvent
  //     })
  //   }
  // }

  onFormSubmit = evt => {
    evt.preventDefault();
    console.log(this.state.event);
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: "/assets/user.png"
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };

  onTitleChange = evt => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
      event: newEvent
    });
  };

  render() {
    //const { handleFormClose } = this.props;
    const { event } = this.state;
    return (
      <div>
        <Segment>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <label>Event Title</label>
              <input
                name="title"
                value={event.title}
                onChange={this.onTitleChange}
                placeholder="Title"
              />
            </Form.Field>
            <Form.Field>
              <label>Event Date</label>
              <input
                name="date"
                value={event.date}
                onChange={this.onTitleChange}
                type="date"
                placeholder="Event Date"
              />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input
                name="city"
                value={event.city}
                onChange={this.onTitleChange}
                placeholder="City event is taking place"
              />
            </Form.Field>
            <Form.Field>
              <label>Venue</label>
              <input
                name="venue"
                value={event.venue}
                onChange={this.onTitleChange}
                placeholder="Enter the Venue of the event"
              />
            </Form.Field>
            <Form.Field>
              <label>Hosted By</label>
              <input
                name="hostedBy"
                value={event.hostedBy}
                onChange={this.onTitleChange}
                placeholder="Enter the name of person hosting"
              />
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
            <Button onClick={this.props.history.goBack} type="button">
              Cancel
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(EventForm);
