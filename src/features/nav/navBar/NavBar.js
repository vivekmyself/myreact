import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";

class NavBar extends Component {
  state = {
    authendicated: false
  };
  handleSignIn = () => {
    this.setState({
      authendicated: true
    });
  };
  handleSignOut = () => {
    this.setState({
      authendicated: false
    });
  };
  render() {
    const { authendicated } = this.state;
    return (
      <div>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item as={Link} to="/" header>
              <img src="assets/logo.png" alt="logo" />
              Re-vents
            </Menu.Item>
            <Menu.Item as={NavLink} to="/events" name="Events" />
            <Menu.Item as={NavLink} to="/people" name="People" />
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
            {authendicated ? (
              <SignedInMenu signOut={this.handleSignOut} />
            ) : (
              <SignedOutMenu signIn={this.handleSignIn} />
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

export default NavBar;
