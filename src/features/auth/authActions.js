import { SubmissionError } from "redux-form";
//import { SIGN_OUT_USER } from "./authConstants";
import { closeModal } from "../modals/modalActions";
/* import firebase from 'firebase'

firebase.auth().signInWithEmailAndPassword */

export const login = creds => {
  // return {
  //   type: LOGIN_USER, payload: { creds }
  // };

  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

/* export const logout = () => {
  return {
    type: SIGN_OUT_USER
  };
}; */

export const registerUser = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    //create user
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    console.log(createdUser);
    //update the auth profile
    await createdUser.updateProfile({
      displayName: user.displayName
    });
    //create new profile in firestore
    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp()
    };
    await firestore.set(`users/${createdUser.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};
