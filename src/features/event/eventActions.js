import { toastr } from "react-redux-toastr";
import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS
} from "./eventConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";

import { fetchSampleData } from "../../app/data/mockApi";

export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
};

export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success("Success!", "Rocking Event Included");
    } catch (error) {
      toastr.error("Oops", "Something went wrong fix it");
    }
  };
};

export const updateEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success("Success!", "Rocking Event Updated ");
    } catch (error) {
      toastr.error("Oops", "Something went wrong fix it");
    }
  };
};

export const deleteEvent = eventId => {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_EVENT,
        payload: {
          eventId
        }
      });
      toastr.success("Success!", "Rocking Event Deleted ");
    } catch (error) {
      toastr.error("Oops", "Something went wrong fix it");
    }
  };
};

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
