import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../Utils/utils";

const Enquiry = ({ enquiryModal, toggleEnquiryModal }) => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [message, setMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const buttons = [
    { value: "0-100", label: "0-100" },
    { value: "100-200", label: "100-200" },
    { value: "200-500", label: "200-500" },
    { value: "500", label: "500+" },
  ];

  const onModalClose = () => {
    toggleEnquiryModal();
    setText("");
    setEmail("");
    setContact("");
    setEventDate("");
    setGuestCount("");
    setMessage("");
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setEventDate(currentDate);
  };

  console.log("evenDate:", formatDate(eventDate));

  return (
    <View>
      <Modal
        visible={enquiryModal}
        onRequestClose={toggleEnquiryModal}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="h-[90%] w-full bg-white rounded-t-2xl flex-col">
            {/* Modal Header */}
            <View className="flex-row justify-between items-center px-4 py-3 ">
              <Text className="text-lg font-bold ">Patil Caterers</Text>
              <TouchableOpacity onPress={onModalClose}>
                <Entypo name="cross" size={30} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Modal Content */}
            <ScrollView
              className="flex-1 mx-4"
              showsVerticalScrollIndicator={false}
            >
              <TextInput
                className="bg-white mt-4"
                mode="outlined"
                label={"Name"}
                value={text}
                onChange={setText}
                right={<TextInput.Icon icon="account" />}
              />
              <TextInput
                className="bg-white mt-4"
                mode="outlined"
                label={"Email"}
                value={email}
                onChange={setEmail}
                keyboardType="email-address"
                right={<TextInput.Icon icon="email" />}
              />
              <TextInput
                className="bg-white mt-4"
                mode="outlined"
                label={"Contact Number"}
                value={contact}
                onChange={setContact}
                keyboardType="phone-pad"
                maxLength={10}
                right={<TextInput.Icon icon="phone" />}
              />
              <TextInput
                className="bg-white mt-4"
                mode="outlined"
                label={"Event Date"}
                value={eventDate ? formatDate(eventDate) : ""}
                onChange={setEventDate}
                onFocus={() => setShowDatePicker(true)}
                right={
                  <TextInput.Icon
                    onPress={() => setShowDatePicker(true)}
                    icon="calendar"
                  />
                }
              />
              <View className="my-5">
                {/* Title */}
                <Text className="text-base font-semibold mb-2 text-gray-600">
                  Aprox guest count
                </Text>

                {/* Custom Segmented Buttons */}
                <View className="flex-row justify-between">
                  {buttons.map((button) => (
                    <TouchableOpacity
                      key={button.value}
                      onPress={() => setGuestCount(button.value)}
                      className={`flex-1 mx-1 py-2 rounded-md border ${
                        guestCount === button.value
                          ? "bg-red-200 border-gray-400"
                          : "bg-gray-100 border-gray-300"
                      }`}
                    >
                      <Text
                        className={`text-center ${
                          guestCount === button.value
                            ? "text-black font-bold"
                            : "text-gray-600"
                        }`}
                      >
                        {button.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TextInput
                  className="bg-white mt-4"
                  mode="outlined"
                  label={"Message"}
                  value={message}
                  onChange={setMessage}
                  multiline
                  numberOfLines={4}
                  maxLength={100}
                />
              </View>
            </ScrollView>

            {/* Footer */}
            <View className="w-full py-3 ">
              <TouchableOpacity
                className="bg-red-600  py-2 px-4 rounded-md mx-4"
                onPress={onModalClose}
              >
                <Text className="text-white text-base text-center">
                  Request Pricing
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {showDatePicker && (
        <DateTimePicker
          minimumDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
          value={eventDate || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default Enquiry;
