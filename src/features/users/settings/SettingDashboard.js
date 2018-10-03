import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import SettingNav from "./SettingNav";
import { Switch, Route, Redirect } from "react-router-dom";
import AboutPage from "./AboutPage";
import BasicPage from "./BasicPage";
import AccountPage from "./AccountPage";
import PhotoPage from "./PhotoPage";
import { updatePassword } from "../../auth/authActions";

const actions = {
  updatePassword
};

const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId
});

const SettingDashboard = ({ updatePassword, providerId }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route path="/settings/basic" component={BasicPage} />
          <Route
            path="/settings/account"
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
          <Route path="/settings/photos" component={PhotoPage} />
          <Route path="/settings/about" component={AboutPage} />
        </Switch>
      </Grid.Column>
      <SettingNav />
    </Grid>
  );
};

export default connect(
  mapState,
  actions
)(SettingDashboard);
