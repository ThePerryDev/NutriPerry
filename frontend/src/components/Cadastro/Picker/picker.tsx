import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";

interface PickerItem {
  label: string;
  value: string;
}

interface CustomPickerProps {
  label: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  items: PickerItem[];
}

const CustomPicker: React.FC<CustomPickerProps> = ({
  label,
  selectedValue,
  onValueChange,
  items,
}) => {
  return (
    <View>
      <Text style={styles.textgeral}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          mode="dropdown"
        >
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CustomPicker;
