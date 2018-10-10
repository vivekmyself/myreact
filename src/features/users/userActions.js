import moment from "moment";
import { toastr } from "react-redux-toastr";

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
  }
  try {
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "Profile Updated");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: fileName
  };
  try {
    //upload photo to firebase
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    let userDoc = await firestore.get(`users/${user.uid}`);
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }

    //add photo to photo collection
    return await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: fileName,
        url: downloadURL
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Problem uploading photo");
  }
};
