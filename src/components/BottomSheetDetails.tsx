import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants';
import { getSubscriptionTypes } from '../services/subscriptionTypes';

interface BottomSheetDetailsProps {
  data: {
    title: string;
    amount: string;
    billing_cycle: string;
    expiry_on: string;
  }[];
}

const BottomSheetDetails = (props: BottomSheetDetailsProps) => {
  const [subscriptionTypes, setSubscriptionTypes] = useState<
    {
      id: string;
      label: string;
      icon: string;
    }[]
  >();

  useEffect(() => {
    getSubscriptionTypes().then(types => {
      if (types) {
        setSubscriptionTypes(types);
      }
    });
  }, []);

  const getTitle = (id: string) => {
    return subscriptionTypes?.find(item => item.id === id)?.label || id;
  };

  const getImage = (id: string) => {
    return subscriptionTypes?.find(item => item.id === id)?.icon || id;
  };

  const getStatus = (expiryDate: string) => {
    return new Date(expiryDate) < new Date() ? 'Expired' : 'Active';
  };

  const renderItems = (item: BottomSheetDetailsProps['data'][0]) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemMainContainer}>
          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            <Image
              src={getImage(item.title)}
              style={styles.subsImage}
              resizeMode="contain"
            />

            <Text style={styles.subValue}>{getTitle(item.title)}</Text>
          </View>
          <Text
            style={[
              styles.tag,
              getStatus(item.expiry_on) === 'Active'
                ? styles.activeTag
                : styles.expiredTag,
            ]}
          >
            {getStatus(item.expiry_on)}
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.itemMainContainer}>
          <View style={styles.itemSubContainer}>
            <Text style={styles.subTitle}>Plan</Text>
            <Text
              style={styles.subValue}
            >{`Premium - ₹${item.amount}/${item.billing_cycle}`}</Text>
          </View>
          <View style={[styles.itemSubContainer, { alignItems: 'flex-end' }]}>
            <Text style={styles.subTitle}>Next payment</Text>
            <Text style={styles.subValue}>{item.expiry_on}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My Subscriptions</Text>
      <FlatList
        data={props.data}
        renderItem={({ item }) => renderItems(item)}
        style={styles.listContainer}
        contentContainerStyle={styles.itemWrapper}
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
  headerText: { fontSize: 18, fontWeight: 'bold', marginBottom: 18 },
  listContainer: { flex: 1 },
  itemWrapper: { gap: 16 },
  itemContainer: {
    borderColor: Colors.backgroundColor,
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  itemMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemSubContainer: {},
  subTitle: { color: 'gray' },
  subValue: { fontWeight: 600 },
  subsImage: { height: 28, width: 28 },
  separator: { height: 1, backgroundColor: Colors.backgroundColor },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeTag: { color: '#237227', backgroundColor: '#E8F5BD' },
  expiredTag: { color: '#BE1A1A', backgroundColor: '#FFE8E8' },
});

export default BottomSheetDetails;
