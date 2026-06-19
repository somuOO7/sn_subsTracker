import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import { billingCycles, databaseRefs } from '../constants';

export const addSubscriptionDetail = (
  userId: string,
  productId: string,
  amount: number,
  billingCycle: billingCycles,
  startDate: string,
  endDate?: string,
) => {
  const id = uuid.v4();
  if (!endDate) {
    const start = new Date(startDate);
    let daysToAdd = 0;
    switch (billingCycle) {
      case billingCycles.weekly:
        daysToAdd = 7;
        break;
      case billingCycles.monthly:
        daysToAdd = 30;
        break;
      case billingCycles.quaterly:
        daysToAdd = 90;
        break;
      case billingCycles.yearly:
        daysToAdd = 365;
        break;
    }
    start.setDate(start.getDate() + daysToAdd);
    endDate = start.toISOString().split('T')[0];
  }

  database()
    .ref(databaseRefs.subscription_detail + `/${id}`)
    .set({ userId, productId, amount, billingCycle, startDate, endDate })
    .then(res => console.log('Data set:', res))
    .catch(err => console.log('Error while setting data', err));
};
