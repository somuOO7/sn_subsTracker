import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isDisabled: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      style={[styles.container, props.isDisabled && styles.disabled]}
      onPress={props.onPress}
    >
      <Text style={styles.titleText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: { color: 'white', fontWeight: 500 },
  disabled: { opacity: 0.5 },
});

export default Button;
