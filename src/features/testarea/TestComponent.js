import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCounter, decrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";

const mapState = state => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter
};

class TestComponent extends Component {
  render() {
    const { incrementCounter, decrementCounter, data } = this.props;
    return (
      <div>
        <h1>Test Component in </h1>
        <h3>The value redux is: {data}</h3>
        <Button onClick={incrementCounter} content="Increment" color="green" />
        <Button onClick={decrementCounter} content="Decrement" color="red" />
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(TestComponent);
