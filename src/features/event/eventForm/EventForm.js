/*global google*/
import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import cuid from "cuid";
import moment from "moment";
import Script from "react-load-script";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
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
import PlaceInput from "../../../app/common/form/PlaceInput";

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
    cityLanLng: {},
    venueLanLng: {},
    scriptLoaded: false
  };
  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLanLng: latlng
        });
      })
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };

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
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4wlHSS3y4edz1PJ-4EolL8Q3RmfalMZs&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
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
                  component={PlaceInput}
                  options={{ types: ["(cities)"] }}
                  onSelect={this.handleCitySelect}
                />
                {this.state.scriptLoaded && (
                  <Field
                    name="venue"
                    placeholder="Event Venue"
                    type="text"
                    component={PlaceInput}
                    options={{
                      location: new google.maps.LatLng(this.state.cityLanLng),
                      radius: 1000,
                      types: ["establishment"]
                    }}
                  />
                )}

                <Field
                  name="date"
                  placeholder="Date and Time of Event"
                  type="text"
                  component={DateInput}
                  dateFormat="YYYY-MM-DD HH:mm"
                  timeFormat="HH:mm"
                  showTimeSelect
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
