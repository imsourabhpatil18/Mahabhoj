import React from "react";
import { View, StyleSheet, Text, StatusBar, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const Header = ({ title }) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#628963" />
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </>
  );
};

export default Header;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#628963",
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerText: {
    color: "#ffffff",
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
  },
});
