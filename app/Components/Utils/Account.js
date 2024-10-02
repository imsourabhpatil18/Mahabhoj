import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import BottomNavbar from "./BottomNavBar";
import Header from "./Header";

const Account = () => {
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const userData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("usernameQR");
        const loginStatus = await AsyncStorage.getItem("isLoggedInQR");
        const email = await AsyncStorage.getItem("emailQR");

        setUsername(storedUsername || "Guest");
        setIsLoggedIn(loginStatus === "true");
        setEmail(email || "---");
      } catch (error) {
        console.error("Failed to fetch data from AsyncStorage", error);
      }
    };

    userData();
  }, []);

  const handleLoginLogout = async () => {
    if (isLoggedIn) {
      Alert.alert(
        "Log Out",
        "Are you sure you want to log out of your account?",
        [
          {
            text: "Logout",
            onPress: async () => {
              await AsyncStorage.removeItem("usernameQR");
              await AsyncStorage.removeItem("isLoggedInQR");
              await AsyncStorage.removeItem("emailQR");

              setIsLoggedIn(false);
              setUsername("Guest");
              navigation.navigate("Login");
            },
            style: "destructive",
          },
          { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
        ]
      );
    } else {
      navigation.navigate("Login");
    }
  };

  const Data = [
    {
      icon: "account",
      title: "Account & Profile",
      navigateTo: "Account",
    },
    {
      icon: "cog",
      title: "General",
      navigateTo: "Forget",
    },
    {
      icon: "lock",
      title: "Privacy",
      navigateTo: "Account",
    },
    {
      icon: "bell",
      title: "Notifications",
      navigateTo: "Account",
    },
    {
      icon: "phone",
      title: "Contact Us",
      navigateTo: "Account",
    },
    {
      icon: "help-circle",
      title: "Help & Feedback",
      navigateTo: "Account",
    },
    {
      icon: isLoggedIn ? "logout" : "login",
      title: isLoggedIn ? "Logout" : "Login",
      navigateTo: () => navigation.navigate("Login"),
    },
  ];

  const renderitem = ({ item }) => (
    <TouchableOpacity
      style={[styles.flatContainer, { borderColor: "gray" }]}
      onPress={() => {
        if (item.title === "Logout" || item.title === "Login") {
          handleLoginLogout();
        } else {
          console.log("clicked");
        }
      }}
    >
      <MaterialCommunityIcons
        name={item.icon}
        style={styles.flatIcon}
        size={RFPercentage(3)}
      />
      <Text style={styles.flatText}>{item.title}</Text>
      <MaterialCommunityIcons
        name="chevron-right"
        style={styles.flatArrow}
        size={RFPercentage(3)}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <Header title="My Profile" />
      <View style={[styles.container, { backgroundColor: "#f8f8f8" }]}>
        <TouchableOpacity style={styles.profileCon}>
          <TouchableOpacity style={styles.circle}>
            <MaterialCommunityIcons
              name="camera"
              style={styles.img}
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.nameCon}>
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </TouchableOpacity>
        <SafeAreaView>
          <FlatList
            data={Data}
            renderItem={renderitem}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      </View>
      <BottomNavbar />
    </>
  );
};

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  profileCon: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "gray",
    height: "10%",
    paddingBottom: 10,
  },
  circle: {
    backgroundColor: "#4380F2",
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "white",
    padding: 16,
    marginLeft: "2%",
  },
  img: {
    color: "white",
  },
  nameCon: {
    marginLeft: "4%",
  },
  name: {
    color: "black",
    fontSize: RFPercentage(2.1),
    fontWeight: "bold",
  },
  email: {
    color: "black",
    fontSize: RFPercentage(2.1),
    fontWeight: "400",
    letterSpacing: 1,
  },
  flatContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width,
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: "5%",
  },
  flatIcon: {
    color: "gray",
    marginLeft: "4%",
  },
  flatText: {
    color: "black",
    fontSize: RFPercentage(2.1),
    fontWeight: "800",
    letterSpacing: 1,
    marginLeft: "5%",
  },
  flatArrow: {
    position: "absolute",
    right: 0,
    marginRight: "5%",
  },
});

export default Account;
