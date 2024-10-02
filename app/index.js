import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./Components/Auth/Login";
import MainLayout from "./MainLayout";
import Home from "./Components/Home/Home";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const userData = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem("isLoggedInQR");
        setIsLoggedIn(loginStatus === "true");
      } catch (error) {
        console.error("Failed to fetch data from AsyncStorage", error);
      }
    };

    userData();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // return <MainLayout>{isLoggedIn ? <Home /> : <Login />}</MainLayout>;
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
};

export default Index;
