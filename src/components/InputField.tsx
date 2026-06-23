import React, { useState } from 'react';
import {
  Image,
  KeyboardType,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants';
import DateTimePicker from '@react-native-community/datetimepicker';

interface InputFieldProps {
  label: string;
  placeholder: string;
  inputType?: KeyboardType | 'dropdown' | 'datepicker';
  dropdownData?: { id: string; label: string; icon?: string }[];
  onChangeText?: (text: string) => void;
}

const InputField = (props: InputFieldProps) => {
  const [dropdownLabel, setDropdownLabel] = useState(props.placeholder);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dateValue, setDateValue] = useState<Date | null>(null);

  const handleDropdownItemSelected = (selectedItem: {
    id: string;
    label: string;
    icon?: string;
  }) => {
    setDropdownLabel(selectedItem.label);
    setIsDropdownOpen(false);
    props.onChangeText && props.onChangeText(selectedItem.id);
  };

  return (
    <View>
      <Text style={styles.labelText}>{props.label}</Text>
      {props.inputType !== 'dropdown' && props.inputType !== 'datepicker' ? (
        <TextInput
          style={styles.textFieldContainer}
          placeholderTextColor="gray"
          placeholder={props.placeholder}
          keyboardType={props.inputType}
          onChangeText={props.onChangeText}
        />
      ) : (
        <>
          {props.inputType === 'datepicker' && Platform.OS === 'ios' ? (
            <DateTimePicker
              value={dateValue || new Date()}
              onValueChange={(_, date) => {
                if (date) {
                  const selectedDate = date.toISOString().split('T')[0];
                  setDateValue(new Date(selectedDate));
                  props.onChangeText && props.onChangeText(selectedDate);
                }
              }}
            />
          ) : (
            <TouchableOpacity
              style={styles.textFieldContainer}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.placeholderText}>{dropdownLabel}</Text>
            </TouchableOpacity>
          )}
          {props.inputType === 'dropdown' && isDropdownOpen && (
            <View style={styles.dropdownContainer}>
              {props.dropdownData?.map(
                (item: { id: string; icon?: string; label: string }) => {
                  return (
                    <Pressable
                      key={item.id}
                      style={styles.dropdownItemContainer}
                      onPress={() => handleDropdownItemSelected(item)}
                    >
                      <Image
                        source={{ uri: item.icon }}
                        style={{ width: 24, height: 24 }}
                        resizeMode="contain"
                      />
                      <Text>{item.label}</Text>
                    </Pressable>
                  );
                },
              )}
            </View>
          )}
          {props.inputType === 'datepicker' &&
            Platform.OS === 'android' &&
            isDropdownOpen && (
              <DateTimePicker
                value={dateValue || new Date()}
                onValueChange={(_, date) => {
                  if (date) {
                    const selectedDate = date.toISOString().split('T')[0];
                    setDateValue(new Date(selectedDate));
                    props.onChangeText && props.onChangeText(selectedDate);
                    setDropdownLabel(selectedDate);
                    setIsDropdownOpen(false);
                  }
                }}
              />
            )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: { fontWeight: 500 },
  textFieldContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  placeholderText: { color: 'gray' },
  dropdownContainer: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderRadius: 12,
    overflow: 'hidden',
  },
  dropdownItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.backgroundColor,
  },
});

export default InputField;
