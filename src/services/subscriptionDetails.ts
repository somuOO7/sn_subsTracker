import { getDatabase, ref, set, get } from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import { billingCycles, databaseRefs } from '../constants';
import { useLoader, useSubscription, useUser } from '../store';
import { SubscriptionItem } from '../store/useSubscription';

export const addSubscriptionDetail = (
  userId: string,
  productId: string,
  amount: number,
  billingCycle: billingCycles,
  startDate: string,
  endDate?: string,
) => {
  const { showLoader, hideLoader } = useLoader.getState();

  showLoader();
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

  const db = getDatabase();
  set(ref(db, `${databaseRefs.subscription_detail}/${id}`), {
    userId,
    productId,
    amount,
    billingCycle,
    startDate,
    endDate,
  })
    .then(res => {
      console.log('Data set:', res);
      hideLoader();
    })
    .catch(err => {
      console.log('Error while setting data', err);
      hideLoader();
    });
};

export const fetchSubscriptionDetail = () => {
  const { showLoader, hideLoader } = useLoader.getState();
  const { setSubscription } = useSubscription.getState();
  const { userId } = useUser.getState();

  showLoader();

  const db = getDatabase();
  get(ref(db, databaseRefs.subscription_detail))
    .then(snapshot => {
      let subscriptionData: SubscriptionItem[] = [];
      const data = snapshot.val();
      const keys = data ? Object.keys(data) : [];

      keys.forEach(key => {
        console.log(
          'SOMU data[key].userId === userId',
          data[key].userId === userId,
          'userId: ',
          userId,
          'data[key].userId:',
          data[key].userId,
        );
        if (data[key].userId === userId) {
          subscriptionData.push({
            id: key,
            productId: data[key].productId,
            amount: data[key].amount,
            billingCycle: data[key].billingCycle,
            startDate: data[key].startDate,
            endDate: data[key].endDate,
          });
        }
      });

      setSubscription(subscriptionData);
      hideLoader();
    })
    .catch(err => {
      console.log('Error while fetching data', err);
      hideLoader();
    });
};

