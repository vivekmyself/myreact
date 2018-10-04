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
import{updateProfile} from '../userActions'

const actions = {
  updatePassword,
  updateProfile
};

const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});

const SettingDashboard = ({ updatePassword, providerId, user, updateProfile }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route
            path="/settings/basic"
            render={() => <BasicPage updateProfile={updateProfile} initialValues={user} />}
          />
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
          <Route path="/settings/about" render={()=><AboutPage updateProfile={updateProfile} initialValues={user} />} />
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
