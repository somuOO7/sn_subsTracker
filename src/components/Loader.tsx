import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../constants';
import { useLoader } from '../store';

const Loader = () => {
  const { isLoading } = useLoader();
  return (
    <>
      {isLoading > 0 ? (
        <View style={styles.container}>
          <ActivityIndicator color={Colors.primaryColor} size={'large'} />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Loader;
