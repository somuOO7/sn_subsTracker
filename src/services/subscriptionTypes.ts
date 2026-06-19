import database from '@react-native-firebase/database';
import { databaseRefs } from '../constants';

export const getSubscriptionTypes = () => {
  return database()
    .ref(databaseRefs.subscription_type)
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      const keys = Object.keys(data);
      return keys.map((key: string) => ({
        id: key,
        label: data[key].name,
        icon: data[key].image,
      }));
    })
    .catch(err =>
      console.log('Error while fetching subscription types =>', err),
    );
};
