import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import EventDetailHeader from "./eventDetailHeader";
import EventDetailInfo from "./eventDetailInfo";
import EventDetailChat from "./eventDetailChat";
import EventDetailSidebar from "./eventDetailSidebar";

const mapToState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  };
};

const EventDetails = ({ event }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapToState)(EventDetails);
