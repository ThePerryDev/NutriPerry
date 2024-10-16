import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import styles from "./styles";


type DatePickerComponentProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const showPicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event: any, date?: Date) => {
    const currentDate = date || selectedDate;
    onDateChange(currentDate);
    setShowDatePicker(false);
  };

  return (
    <View style={styles.dateContainer}>
      <Text style={styles.dateLabel}>Data:</Text>
      
      <TouchableOpacity onPress={showPicker}
      style={styles.dateBox}
      >
        <Text style={styles.dateText}>
          {moment(selectedDate).format("DD-MM-YYYY")}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DatePickerComponent;
