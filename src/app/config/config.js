import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "#",
  authDomain: "myrevents-50ba3.firebaseapp.com",
  databaseURL: "https://myrevents-50ba3.firebaseio.com",
  projectId: "myrevents-50ba3",
  storageBucket: "myrevents-50ba3.appspot.com",
  messagingSenderId: "203767025983"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const settings = {
  timestampsInSnapshots: true
};

firestore.settings(settings);

export default firebase;
