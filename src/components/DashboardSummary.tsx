import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface DashboardSummaryProps {
  totalMonthlySpend: number;
  activeSubscriptions: number;
  pendingThisMonth: number;
}

const DashboardSummary = (props: DashboardSummaryProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.cardContainer, styles.topCard]}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Total Monthly Spend</Text>
          <Text style={styles.cardDescription}>₹{props.totalMonthlySpend}</Text>
        </View>
        <Image
          source={require('../assets/spendImage.png')}
          style={styles.topCardImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomCardContainer}>
        <View style={[styles.cardContainer, styles.bottomCard]}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Active subscriptions</Text>
            <Text style={styles.cardDescription}>
              {props.activeSubscriptions}
            </Text>
          </View>
        </View>

        <View style={[styles.cardContainer, styles.bottomCard]}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Pending this month</Text>
            <Text style={styles.cardDescription}>{props.pendingThisMonth}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 16 },
  cardContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    height: 84,
    borderRadius: 12,
  },
  topCard: { flexDirection: 'row' },
  bottomCard: { flex: 1 },
  cardContent: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-around',
  },
  topCardImage: {
    height: '100%',
    width: 100,
    right: -4,
  },
  cardTitle: { color: '#566470' },
  cardDescription: { fontWeight: 'bold', fontSize: 24 },
  bottomCardContainer: { flexDirection: 'row', gap: 16 },
});

export default DashboardSummary;
