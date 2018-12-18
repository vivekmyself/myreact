import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import UserDetailsHeader from "./UserDetailsHeader";
import UserDetailsDescription from "./UserDetailsDescription";
import UserDetailsPhoto from "./UserDetailsPhoto";
import UserDetailsSidebar from "./UserDetailsSidebar";
import UserDetailsEvents from "./UserDetailsEvents";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};

const mapState = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos
});

class UserDetailsPage extends Component {
  render() {
    const { profile, photos } = this.props;
    return (
      <Grid>
        <UserDetailsHeader profile={profile} />
        <UserDetailsDescription profile={profile} />
        <UserDetailsSidebar />
        {photos && photos.length > 0 && <UserDetailsPhoto photos={photos} />}
        <UserDetailsEvents />
      </Grid>
    );
  }
}

export default compose(
  connect(mapState),
  firestoreConnect(auth => query(auth))
)(UserDetailsPage);
