import React, { useState } from "react";
import {
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome6";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import StarRating from "react-native-star-rating-widget";
import Enquiry from "./Enquiry";

const CaterersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [enquiryModal, setEnquiryModal] = useState(false);

  const toggleEnquiryModal = () => {
    setEnquiryModal(!enquiryModal);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const caterersData = [
    {
      id: 1,
      profileImage:
        "https://media.istockphoto.com/id/483561017/photo/catering-service-at-company-event-offer-food.jpg?s=612x612&w=0&k=20&c=QXIpVDWN6FZ-8yCkSCsN2NaUNLyYAdSeqs5XtK_FCyk=",
      name: "Delicious Catering ",
      city: "Satara",
      pricePerPlate: "170",
      reviews: 4.5,
    },
    {
      id: 2,
      profileImage:
        "https://images.squarespace-cdn.com/content/v1/5841c96159cc68a03ba9467f/1582217144274-CEG850VAEPKLPD0FPZ5T/chi3+copy.jpg",
      name: "Desai Caterers",
      city: "Sangli",
      pricePerPlate: "150",
      reviews: 4.8,
    },
    {
      id: 3,
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJTfTVBU8IXaZDbA4cylm4fs1s-jU83h0Gig&s",
      name: "Patil Caterers",
      city: "Kolhapur",
      pricePerPlate: "200",
      reviews: 4.0,
    },
    {
      id: 4,
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJTfTVBU8IXaZDbA4cylm4fs1s-jU83h0Gig&s",
      name: "Mahalaxmi Catering Services",
      city: "Kolhapur",
      pricePerPlate: "200",
      reviews: 4.0,
    },
  ];

  const renderCatererCard = ({ item }) => (
    <View
      key={item.id}
      className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
      style={{ elevation: 6 }}
    >
      <Image
        source={{ uri: item.profileImage }}
        className="w-full h-52 rounded-b-xl"
      />

      <View className="p-4 space-y-3">
        <Text className="text-xl font-bold text-gray-900 tracking-wider">
          {item.name}
        </Text>
        <View pointerEvents="none">
          <StarRating starSize={18} rating={item.reviews} color="#D4A017" />
        </View>

        <Text className="text-sm font-medium text-gray-500 tracking-wider">
          {item.city}
        </Text>

        <View className="flex-row items-center space-x-2 mt-1">
          <FontAwesome name="bowl-food" size={16} color="#FFA500" />
          <Text className="text-base text-gray-700 tracking-wider">
            <Text className="font-semibold ">Starting from: </Text>
            <FontAwesome name="indian-rupee-sign" size={12} color="#666" />
            {item.pricePerPlate}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-red-500 rounded-lg py-2 mt-3 shadow-md"
          onPress={toggleEnquiryModal}
        >
          <Text className="text-white text-center font-medium text-sm">
            Enquiry
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
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

        <View className="flex-row items-center justify-between px-5 my-2">
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
        <View className="p-5">
          <FlatList
            data={caterersData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCatererCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
      </SafeAreaView>

      <Enquiry
        enquiryModal={enquiryModal}
        toggleEnquiryModal={toggleEnquiryModal}
      />
    </>
  );
};

export default CaterersList;
