import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const BottomNavbar = () => {
  return (
    <View style={styles.navbar}>
      <Link href="/Components/Home/Home" asChild>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons name="home" size={24} color="gray" />
          <Text style={styles.linkText}>Home</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/Components/Bookings/BookingDetails" asChild>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons name="calendar" size={24} color="gray" />
          <Text style={styles.linkText}>Booking</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/Components/Utils/Account" asChild>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="account-outline"
            size={24}
            color="gray"
          />
          <Text style={styles.linkText}>Account</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF", // Static background color
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0", // Static border color
  },
  iconContainer: {
    alignItems: "center",
  },
  linkText: {
    fontSize: 12,
    textAlign: "center",
    paddingTop: 2,
    color: "#000000", // Static text color
  },
});

export default BottomNavbar;
