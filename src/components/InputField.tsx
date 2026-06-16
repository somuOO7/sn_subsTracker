import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface InputFieldProps {
  label: string;
  placeholder: string;
}

const InputField = (props: InputFieldProps) => {
  return (
    <View>
      <Text style={styles.labelText}>{props.label}</Text>
      <TextInput
        style={styles.textFieldContainer}
        placeholderTextColor="gray"
        placeholder={props.placeholder}
      />
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
});

export default InputField;
