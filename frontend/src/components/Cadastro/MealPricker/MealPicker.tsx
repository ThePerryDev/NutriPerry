import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";

type MealPickerProps = {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
};

const MealPicker: React.FC<MealPickerProps> = ({
  label,
  selectedValue,
  onValueChange,
  items,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelectItem = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.pickerBox}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerText}>
          {selectedValue
            ? items.find((item) => item.value === selectedValue)?.label
            : "Selecione uma opção"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleSelectItem(item.value)}
              >
                <Text style={styles.modalItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default MealPicker;
