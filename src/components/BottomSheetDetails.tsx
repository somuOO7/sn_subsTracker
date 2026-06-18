import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface BottomSheetDetailsProps {
  data: {
    title: string;
    amount: string;
    billing_cycle: string;
    expiry_on: string;
  }[];
}

const BottomSheetDetails = (props: BottomSheetDetailsProps) => {
  const renderItems = (item: BottomSheetDetailsProps['data'][0]) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.amount}</Text>
        <Text>{item.billing_cycle}</Text>
        <Text>{item.expiry_on}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text>My Subscriptions</Text>
      <FlatList
        data={props.data}
        renderItem={({ item }) => renderItems(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: -16,
    marginBottom: -34,
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export default BottomSheetDetails;
