import database from '@react-native-firebase/database';
import { databaseRefs } from '../constants';
import { useLoader } from '../store';

export const getSubscriptionTypes = () => {
  const { showLoader, hideLoader } = useLoader.getState();
  showLoader();

  return database()
    .ref(databaseRefs.subscription_type)
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      const keys = Object.keys(data);
      hideLoader();
      return keys.map((key: string) => ({
        id: key,
        label: data[key].name,
        icon: data[key].image,
      }));
    })
    .catch(err => {
      console.log('Error while fetching subscription types =>', err);
      hideLoader();
    });
};
