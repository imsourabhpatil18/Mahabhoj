import React from "react";
import { View, Text } from "react-native";
import BottomNavbar from "../Utils/BottomNavBar";

const BookingDetails = () => {
  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Here are your booking details</Text>
      </View>
      <BottomNavbar />
    </>
  );
};

export default BookingDetails;
