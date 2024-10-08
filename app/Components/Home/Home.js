import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import BottomNavbar from "../Utils/BottomNavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Catere from "../../../assets/latestCatere.png";
import ExploreNearYou from "H../../../assets/Explore3D.png";
import ThaliImg from "../../../assets/Thali.png";
import { Link } from "expo-router";

const Home = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView className="flex-1">
        <View className="p-5 flex-row justify-between">
          <View>
            <Text className="font-semibold text-gray-500 text-base tracking-wider">
              Good Afternoon
            </Text>
            <Text className="font-bold text-2xl px-1 tracking-wider">
              Sourabh
            </Text>
          </View>
          <TouchableOpacity>
            <View className="flex-row py-2">
              <Ionicons name="location" size={22} color="black" />
              <Text className="ml-1 font-bold tracking-wider">Pune</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View className="my-5">
            <Image
              source={{
                uri:
                  "https://img.freepik.com/premium-photo/delicious-food-buffet-with-curry-seafood-dishes_1287633-5894.jpg?size=626&ext=jpg",
              }}
              resizeMode="cover"
              className="w-full h-60"
            />
          </View>

          <View className="mx-5 mb-5">
            <Text className="font-bold text-sm tracking-wide">
              Select a service
            </Text>
            <View className="py-4 w-full flex-row justify-between">
              <Link href="/Components/ExploreCaterers/CaterersList" asChild>
                <TouchableOpacity className="w-[48%] h-20 bg-gray-200 justify-center pl-2 rounded-lg flex-row items-center shadow-md shadow-black">
                  <View className="flex-1">
                    <Text className="font-bold text-gray-600 text-xs tracking-wider">
                      Explore
                    </Text>
                    <Text className="font-bold text-gray-600 text-xs tracking-wider">
                      Caterers
                    </Text>
                  </View>
                  <Image source={Catere} className="w-2/5 h-3/4 bg-gray-200" />
                </TouchableOpacity>
              </Link>

              <TouchableOpacity className="w-[48%] h-20 bg-gray-200 justify-center px-2 rounded-lg flex-row items-center shadow-md shadow-black">
                <View className="flex-1">
                  <Text className="font-bold text-gray-600 text-xs tracking-wider">
                    Explore near
                  </Text>
                  <Text className="font-bold text-gray-600 text-xs tracking-wider">
                    you
                  </Text>
                </View>
                <Image
                  source={ExploreNearYou}
                  className="w-2/5 h-3/4 bg-gray-200 object-cover "
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mx-5 mb-10">
            <Text className="font-bold text-sm tracking-wide">
              Customise Your Thali
            </Text>

            <View className="py-5">
              <TouchableOpacity className=" w-full h-36 mb-5 bg-emerald-300  px-2  rounded-lg flex-row  shadow-md shadow-black">
                <View className="flex-1 py-6">
                  <Text className="font-bold text-gray-600 text-lg tracking-wide shadow-sm">
                    Design your own personalized thali and find the ideal
                    caterer
                  </Text>
                </View>
                <Image source={ThaliImg} className="w-2/5 h-full" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavbar />
    </>
  );
};

export default Home;
