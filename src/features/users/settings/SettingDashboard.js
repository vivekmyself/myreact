import React from "react";
import { Grid } from "semantic-ui-react";
import SettingNav from "./SettingNav";
import { Switch, Route, Redirect } from "react-router-dom";
import AboutPage from "./AboutPage";
import BasicPage from "./BasicPage";
import AccountPage from "./AccountPage";
import PhotoPage from "./PhotoPage";

const SettingDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route path="/settings/basic" component={BasicPage} />
          <Route path="/settings/account" component={AccountPage} />
          <Route path="/settings/photos" component={PhotoPage} />
          <Route path="/settings/about" component={AboutPage} />
        </Switch>
      </Grid.Column>
      <SettingNav />
    </Grid>
  );
};

export default SettingDashboard;
