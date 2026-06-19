import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, InputField } from '../components';
import { getSubscriptionTypes } from '../services/subscriptionTypes';
import { addSubscriptionDetail } from '../services/subscriptionDetails';
import { billingCycles } from '../constants';
import { useUser } from '../store';

const AddSubscription = () => {
  const [subsType, setSubsType] = useState<any[]>([]);

  const userId = useUser(state => state.userId);

  const fetchTypes = async () => {
    const data = await getSubscriptionTypes();
    setSubsType(data as any);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Add Subscription</Text>

      <Card>
        <InputField
          label="Service Name"
          placeholder="Select a service"
          inputType="dropdown"
          dropdownData={subsType}
        />
      </Card>

      <Card>
        <InputField label="Billing cycle" placeholder="Select a service" />
        <InputField label="Cost per billing cycle" placeholder="Enter amount" />
      </Card>

      <Button
        title="Save Subscription"
        isDisabled={false}
        onPress={() => {
          addSubscriptionDetail(
            userId,
            'NETFLIX',
            199,
            billingCycles.monthly,
            '2026-06-15',
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 16,
    flex: 1,
  },
  screenTitle: { fontSize: 18, fontWeight: 'bold' },
});

export default AddSubscription;
