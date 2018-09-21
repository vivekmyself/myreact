import { createReducer } from "../../app/common/util/reducerUtil";
import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from "./asyncConstants";

const initianState = {
  loading: false
};

export const asyncActionStart = state => {
  return { ...state, loading: true };
};

export const asyncActionFinish = state => {
  return { ...state, loading: false };
};

export const asyncActionError = state => {
  return { ...state, loading: false };
};

export default createReducer(initianState, {
  [ASYNC_ACTION_START]: asyncActionStart,
  [ASYNC_ACTION_FINISH]: asyncActionFinish,
  [ASYNC_ACTION_ERROR]: asyncActionError
});
