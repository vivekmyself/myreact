import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../../features/nav/navBar/NavBar";
import EventDashboard from "../../features/event/eventDashboard/EventDashboard";
import EventForm from "../../features/event/eventForm/EventForm";
import PeopleDashboard from "../../features/users/PeopleDashboard/PeopleDashboard";
import UserDetailsPage from "../../features/users/userDetail/UserDetailsPage";
import SettingDashboard from "../../features/users/settings/SettingDashboard";
import EventDetails from "../../features/event/eventDetails/eventDetails";
import HomePage from "../../features/home/HomePage";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <div className="App">
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/event/:id" component={EventDetails} />
                  <Route path="/people" component={PeopleDashboard} />
                  <Route path="/profile/:id" component={UserDetailsPage} />
                  <Route path="/settings" component={SettingDashboard} />
                  <Route path="/createEvent" component={EventForm} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
