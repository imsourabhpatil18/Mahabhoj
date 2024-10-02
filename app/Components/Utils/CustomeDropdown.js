import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const { width, height } = Dimensions.get("window");

const CustomDropdown = ({
  items,
  selectedValue,
  onValueChange,
  placeholder,
  isDarkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const filteredItems = items?.filter((item) =>
    item?.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          styles.pickerButton,
          {
            borderColor: "gray",
            backgroundColor: isDarkMode ? "#333" : "white",
          },
        ]}
      >
        <Text
          style={[
            styles.pickerText,
            {
              color: selectedValue ? "black" : "gray",
            },
          ]}
        >
          {selectedValue ? selectedValue.label : placeholder}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.modalContainer,
                  { backgroundColor: isDarkMode ? "#333" : "#fff" },
                ]}
              >
                <TextInput
                  style={[
                    styles.searchInput,
                    {
                      backgroundColor: isDarkMode ? "#444" : "#eee",
                      color: isDarkMode ? "#fff" : "#000",
                    },
                  ]}
                  placeholder="Search..."
                  placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <FlatList
                  data={filteredItems}
                  ListEmptyComponent={
                    <Text style={styles.emptyText}>No Data found</Text>
                  }
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.item,
                        { backgroundColor: isDarkMode ? "#333" : "#fff" },
                      ]}
                      onPress={() => handleSelect(item)}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          { color: isDarkMode ? "#fff" : "#000" },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                  style={styles.list}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    marginBottom: 15,
  },
  pickerButton: {
    padding: 15,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: "center",
  },
  pickerText: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: width * 0.9,
    maxHeight: height * 0.5,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    overflow: "hidden",
    padding: 10,
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  list: {
    maxHeight: height * 0.4,
  },
  item: {
    padding: 15,
  },
  itemText: {
    fontSize: 18,
  },
  emptyText: {
    paddingLeft: 15,
    paddingHorizontal: 20,
    color: "#888",
    fontSize: 16,
  },
});

export default CustomDropdown;
