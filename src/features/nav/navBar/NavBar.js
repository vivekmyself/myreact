import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";
//import { logout } from "../../auth/authActions";

const actions = {
  openModal
  //logout
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile:state.firebase.profile
});
class NavBar extends Component {
  // state = {
  //   authendicated: false
  // };

  handleSignIn = () => {
    // this.setState({
    //   authendicated: true
    // });
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };
  handleSignOut = () => {
    // this.setState({
    //   authendicated: false
    // });
    this.props.firebase.logout();
    this.props.history.push("/");
  };
  render() {
    //const { authendicated } = this.state;
    const { auth , profile} = this.props;
    //console.log(auth);
    //const authendicated = auth.authenticated;
    const authendicated = auth.isLoaded && !auth.isEmpty;
    console.log(authendicated);
    console.log(profile);
    return (
      <div>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item as={Link} to="/" header>
              <img src="/assets/logo.png" alt="logo" />
              Re-vents
            </Menu.Item>
            <Menu.Item as={NavLink} to="/events" name="Events" />
            <Menu.Item as={NavLink} to="/test" name="Test" />
            {authendicated && (
              <Menu.Item as={NavLink} to="/people" name="People" />
            )}
            {authendicated && (
              <Menu.Item>
                <Button
                  as={Link}
                  to="/createEvent"
                  floated="right"
                  positive
                  inverted
                  content="Create Event"
                />
              </Menu.Item>
            )}
            {authendicated ? (
              <SignedInMenu profile={profile} signOut={this.handleSignOut} />
            ) : (
              <SignedOutMenu
                signIn={this.handleSignIn}
                register={this.handleRegister}
              />
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(NavBar)
  )
);
