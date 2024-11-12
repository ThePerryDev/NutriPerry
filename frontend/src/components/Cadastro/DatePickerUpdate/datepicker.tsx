import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import styles from "./styles";

type DatePickerRegisterComponentProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

const DatePickerUpdate: React.FC<DatePickerRegisterComponentProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false); 

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      onDateChange(date);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {moment(selectedDate).format("DD-MM-YYYY")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.datePickerContainer}>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
    </View>
  );
};

export default DatePickerUpdate;
