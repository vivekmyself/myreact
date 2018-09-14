/* import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import moment from "moment";
import cuid from "cuid";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { createEvent, updateEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput"; */

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};

const actions = {
  createEvent,
  updateEvent
};

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "Please provide a category" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date")
});

class EventForm extends Component {
  onFormSubmit = values => {
    values.date = moment(values.date).format();
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };

  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location details" />
              <Field
                name="city"
                type="text"
                component={TextInput}
                placeholder="Event city"
              />
              <Field
                name="venue"
                type="text"
                component={TextInput}
                placeholder="Event venue"
              />
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Date and time of event"
              />
              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(
  reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
    EventForm
  )
);































import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import cuid from "cuid";
import moment from "moment";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { updateEvent, createEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};

const actions = {
  createEvent,
  updateEvent
};

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators({
  title: isRequired({ message: "Event Title is required" }),
  description: composeValidators(
    isRequired({ message: "Description is required" }),
    hasLengthGreaterThan(4)({ message: "Should have minimum 5 characters" })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date")
});

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

  /* onFormSubmit = evt => {
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
  }; */

  onFormSubmit = values => {
    //console.log(values);
    values.date = moment(values.date).format();
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
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
    //const { event } = this.state;
    const { invalid, submitting, pristine } = this.props;
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <Segment>
              <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                <Header sub color="teal" content="Event Details" />
                <Field
                  name="title"
                  placeholder="Event Title"
                  type="text"
                  component={TextInput}
                />
                <Field
                  name="category"
                  placeholder="Event Category"
                  type="text"
                  options={category}
                  component={SelectInput}
                />
                <Field
                  name="description"
                  placeholder="Event Description"
                  type="text"
                  rows={3}
                  component={TextArea}
                />
                <Header sub color="teal" content="Event Location Details" />
                <Field
                  name="city"
                  placeholder="Event City"
                  type="text"
                  component={TextInput}
                />
                <Field
                  name="venue"
                  placeholder="Event Venue"
                  type="text"
                  component={TextInput}
                />
                <Field
                  name="date"
                  placeholder="Date and Time of Event"
                  type="text"
                  component={DateInput}
                  dateFormat="YYYY-MM-DD HH:mm"
                  timeFormat="HH:mm"
                  showTimeSelect
                />
                {/*  <Form.Field>
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
                </Form.Field> */}
                <Button
                  disabled={invalid || submitting || pristine}
                  positive
                  type="submit"
                >
                  Submit
                </Button>
                <Button onClick={this.props.history.goBack} type="button">
                  Cancel
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(
  reduxForm({ form: "EventForm", enableReinitialize: true, validate })(
    EventForm
  )
);
