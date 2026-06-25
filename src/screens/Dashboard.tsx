import React, { useCallback, useEffect } from 'react';
import { Bell } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetDetails, DashboardSummary } from '../components';
import { Colors } from '../constants';
import { fetchSubscriptionDetail } from '../services/subscriptionDetails';
import { useSubscription } from '../store';

const Dashboard = () => {
  const { subscriptionList } = useSubscription();

  useFocusEffect(
    useCallback(() => {
      fetchSubscriptionDetail();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Hello!</Text>
        <TouchableOpacity style={styles.notificationContainer}>
          <Bell size={20} />
        </TouchableOpacity>
      </View>

      <DashboardSummary
        activeSubscriptions={12}
        pendingThisMonth={2}
        totalMonthlySpend={1230}
      />

      <BottomSheetDetails
        data={subscriptionList
          .sort(
            (a, b) =>
              new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
          )
          .map(item => ({
            title: item.productId,
            amount: item.amount.toString(),
            billing_cycle: item.billingCycle,
            expiry_on: item.endDate,
          }))}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: Colors.primaryColor,
    gap: 16,
  },
  headerContainer: { flexDirection: 'row', alignItems: 'center' },
  welcomeText: { fontSize: 24, color: 'white', fontWeight: 'bold', flex: 1 },
  notificationContainer: {
    height: 36,
    width: 36,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
