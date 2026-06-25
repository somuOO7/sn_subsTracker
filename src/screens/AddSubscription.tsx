import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, InputField } from '../components';
import { getSubscriptionTypes } from '../services/subscriptionTypes';
import { addSubscriptionDetail } from '../services/subscriptionDetails';
import { billingCycles } from '../constants';
import { useUser } from '../store';

const AddSubscription = () => {
  const [subsType, setSubsType] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    serviceId: null,
    amount: null,
    billingCycle: null,
    startDate: null,
    endDate: null,
  });
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);

  const userId = useUser(state => state.userId);

  const fetchTypes = async () => {
    const data = await getSubscriptionTypes();
    setSubsType(data as any);
  };

  const handleModifyFormData = (
    type: 'serviceId' | 'amount' | 'billingCycle' | 'startDate' | 'endDate',
    value: any,
  ) => {
    setFormData(prev => ({ ...prev, [type]: value }));
  };

  const handleAddSubs = () => {
    let endDate: string | null = formData.endDate;

    if (endDate === null) {
      const startDate = new Date(formData.startDate || '');
      const billingCycle: any = formData?.billingCycle;

      switch (billingCycle) {
        case billingCycles.weekly:
          endDate = new Date(startDate.setDate(startDate.getDate() + 7))
            .toISOString()
            .split('T')[0];
          break;
        case billingCycles.monthly:
          endDate = new Date(startDate.setMonth(startDate.getMonth() + 1))
            .toISOString()
            .split('T')[0];
          break;
        case billingCycles.quaterly:
          endDate = new Date(startDate.setMonth(startDate.getMonth() + 3))
            .toISOString()
            .split('T')[0];
          break;
        case billingCycles.yearly:
          endDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1))
            .toISOString()
            .split('T')[0];
          break;
        default:
          endDate = new Date(startDate.setMonth(startDate.getMonth() + 1))
            .toISOString()
            .split('T')[0];
          break;
      }
    }

    addSubscriptionDetail(
      userId,
      formData.serviceId || '',
      formData.amount || 0,
      formData.billingCycle || billingCycles.monthly,
      formData.startDate || new Date().toISOString().split('T')[0],
      endDate,
    );
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    setIsSubmitBtnDisabled(
      formData.amount &&
        formData.billingCycle &&
        formData.serviceId &&
        formData.startDate
        ? false
        : true,
    );
  }, [formData]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.screenTitle}>Add Subscription</Text>

        <Card>
          <InputField
            label="Service Name"
            placeholder="Select a service"
            inputType="dropdown"
            dropdownData={subsType}
            onChangeText={val => handleModifyFormData('serviceId', val)}
          />
        </Card>

        <Card>
          <InputField
            label="Billing cycle"
            placeholder="Select a billing cycle"
            inputType="dropdown"
            dropdownData={Object.values(billingCycles).map(item => ({
              id: item,
              label: item.charAt(0).toUpperCase() + item.slice(1),
            }))}
            onChangeText={val => handleModifyFormData('billingCycle', val)}
          />
          <InputField
            label="Cost per billing cycle"
            placeholder="Enter amount"
            inputType="numeric"
            onChangeText={val => handleModifyFormData('amount', val)}
          />
        </Card>

        <Card>
          <InputField
            label="Start date"
            placeholder="Select a start date"
            inputType="datepicker"
            onChangeText={val => handleModifyFormData('startDate', val)}
          />
          <InputField
            label="End date (Optional)"
            placeholder="Select an end date"
            inputType="datepicker"
            onChangeText={val => handleModifyFormData('endDate', val)}
          />
        </Card>

        <Button
          title="Save Subscription"
          isDisabled={isSubmitBtnDisabled}
          onPress={handleAddSubs}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
