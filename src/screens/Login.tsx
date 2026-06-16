import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, InputField } from '../components';
import { Colors } from '../constants';

const Login = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('MainStack');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>Welcome to your Subscriptions!</Text>
        <Text style={styles.subtitleText}>
          Login to seamlessly track your subscriptions
        </Text>
      </View>

      <Card>
        <InputField
          label="Email address"
          placeholder="Enter your email address..."
        />
        <InputField label="Password" placeholder="Enter your password..." />
      </Card>

      <Button title="Login" onPress={handleLogin} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    gap: 16,
  },
  titleText: { fontSize: 32, fontWeight: 800, color: Colors.primaryColor },
  subtitleText: { fontSize: 20 },
});

export default Login;
