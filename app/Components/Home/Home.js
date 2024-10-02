import React from "react";
import { View, Text } from "react-native";
import BottomNavbar from "../Utils/BottomNavBar";

const Home = () => {
  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Home</Text>
      </View>
      <BottomNavbar />
    </>
  );
};

export default Home;
