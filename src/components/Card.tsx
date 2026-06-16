import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
}

const Card = (props: CardProps) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
});

export default Card;
