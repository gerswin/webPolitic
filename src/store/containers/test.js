import React from "react";
import { connect } from "react-redux";
import { sayHello } from "../actions";
import { Text, View, Button } from "react-native";

let Act = ({ whatsUp, stateObject, saySomething }) => (
  <View>
  <Button
  onPress={saySomething}
  title="PRESS TO DISPATCH FIRST ACTION"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
   <Button
  onPress={saySomething}
  title="PRESS TO DISPATCH FIRST ACTION"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
    <Text>{whatsUp}</Text>
    <Button onPress={() => console.log("Redux State:", stateObject)}>
      <Text>Press to inspect STATE in console panel</Text>
    </Button>
  </View>
);

const mapStateToProps = state => ({
  whatsUp: state.say,
  stateObject: state
});

const mapDispatchToProps = dispatch => ({
  saySomething: () => {
    dispatch(sayHello());
  }
});

Act = connect(
  mapStateToProps,
  mapDispatchToProps
)(Act);

export default Act;
