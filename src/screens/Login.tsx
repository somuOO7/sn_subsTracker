import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ShieldX } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, InputField } from '../components';
import { Colors } from '../constants';

import { getErrorText } from '../utils/auth';

const Login = () => {
  const navigation = useNavigation();

  const [formValue, setFormValue] = useState({ email: '', password: '' });
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (formValue.email !== '' && formValue.password !== '')
      setIsLoginBtnDisabled(false);
    else setIsLoginBtnDisabled(true);
  }, [formValue]);

  const handleLogin = () => {
    setIsLoginBtnDisabled(true);
    auth()
      .signInWithEmailAndPassword(formValue.email, formValue.password)
      .then(userCreds => {
        console.log(userCreds);
        navigation.navigate('MainStack');
      })
      .catch(err => {
        console.log(err);
        setError(getErrorText(err.code));
      });
  };

  const handleTextChange = (type: 'email' | 'password', text: string) => {
    setError('');
    setFormValue(prev => ({
      ...prev,
      [type]: text,
    }));
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
          inputType="email-address"
          onChangeText={text => handleTextChange('email', text)}
        />
        <InputField
          label="Password"
          placeholder="Enter your password..."
          onChangeText={text => handleTextChange('password', text)}
        />
        {error !== '' && (
          <View style={styles.errorContainer}>
            <ShieldX color="red" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </Card>

      <Button
        title="Login"
        onPress={handleLogin}
        isDisabled={isLoginBtnDisabled}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    gap: 32,
  },
  titleText: { fontSize: 32, fontWeight: 800, color: Colors.primaryColor },
  subtitleText: { fontSize: 20 },
  errorContainer: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  errorText: { color: 'red' },
});

export default Login;
