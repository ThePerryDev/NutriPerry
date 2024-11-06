import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para mostrar o calendário

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      onDateChange(date); // Atualiza a data selecionada
    }
    setShowDatePicker(false); // Oculta o calendário após a seleção
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Data:     </Text>

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

export default DatePickerComponent;
