import React from "react";
import {
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const CaterersList = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View className="bg-white py-4 px-5 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Link href="../" asChild>
              <TouchableOpacity>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
            </Link>
            <Text className="ml-4 text-lg font-bold text-gray-700">
              Caterers List
            </Text>
          </View>
          <TouchableOpacity className="px-1">
            <FontAwesome name="filter" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View className="flex-row items-center justify-between mx-5 my-2">
        <View className="flex-row items-center border border-gray-400 px-4 py-2 rounded-xl flex-1 bg-white ">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 text-black"
            placeholder="Search here"
            placeholderTextColor="#666"
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
      </View>
    </>
  );
};

export default CaterersList;
