import React, { useState } from 'react';
import {
  Image,
  KeyboardType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface InputFieldProps {
  label: string;
  placeholder: string;
  inputType?: KeyboardType | 'dropdown';
  dropdownData?: { id: string; label: string; icon?: string }[];
  onChangeText?: (text: string) => void;
}

const InputField = (props: InputFieldProps) => {
  const [dropdownLabel, setDropdownLabel] = useState(props.placeholder);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownItemSelected = (selectedItem: {
    id: string;
    label: string;
    icon: string;
  }) => {
    setDropdownLabel(selectedItem.label);
    setIsDropdownOpen(false);
  };

  return (
    <View>
      <Text style={styles.labelText}>{props.label}</Text>
      {props.inputType !== 'dropdown' ? (
        <TextInput
          style={styles.textFieldContainer}
          placeholderTextColor="gray"
          placeholder={props.placeholder}
          keyboardType={props.inputType}
          onChangeText={props.onChangeText}
        />
      ) : (
        <>
          <TouchableOpacity
            style={styles.textFieldContainer}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text>{dropdownLabel}</Text>
          </TouchableOpacity>
          {isDropdownOpen && (
            <View style={styles.dropdownContainer}>
              {props.dropdownData?.map(item => {
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
              })}
            </View>
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
  dropdownContainer: {},
  dropdownItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default InputField;
