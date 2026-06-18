import database from '@react-native-firebase/database';

export const getSubscriptionTypes = () => {
  return database()
    .ref('/subscription_types')
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
