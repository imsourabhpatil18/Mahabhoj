import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = ({ title }) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="bg-white py-4 px-5 flex-row items-center  ">
        <Link href="../" asChild>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </Link>
        <Text className="ml-4 text-lg font-bold text-gray-700">{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;
