import React, { Component } from "react";
import { connect } from "react-redux";
import Script from "react-load-script";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { incrementCounter, decrementCounter } from "./testActions";
import { Button, Icon } from "semantic-ui-react";

const mapState = state => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter
};

const Marker = () => <Icon name="marker" color="red" size="big" />;

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: "",
    scriptLoaded: false
  };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };
  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };
  onChange = address => this.setState({ address });
  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };
    const { incrementCounter, decrementCounter, data } = this.props;
    return (
      <div>
        {/* <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4wlHSS3y4edz1PJ-4EolL8Q3RmfalMZs&libraries=places"
          onLoad={this.handleScriptLoad}
        /> */}
        <h1>Test Component in </h1>
        <h3>The value redux is: {data}</h3>
        <Button onClick={incrementCounter} content="Increment" color="green" />
        <Button onClick={decrementCounter} content="Decrement" color="red" />
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && (
            <PlacesAutocomplete inputProps={inputProps} />
          )}
          <button type="submit">Submit</button>
        </form>

        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyD4wlHSS3y4edz1PJ-4EolL8Q3RmfalMZs"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker lat={59.955413} lng={30.337844} text={"Kreyser Avrora"} />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(TestComponent);
