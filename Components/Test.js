import React from "react";
import { StyleSheet, View, Platform } from "react-native";

class Test extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.subview_container}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  subview_container: {
    ...Platform.select({
      ios: {
        backgroundColor: "red"
      },
      android: {
        backgroundColor: "blue"
      }
    })
  }
});

export default Test;
