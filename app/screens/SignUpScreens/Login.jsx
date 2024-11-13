import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleLogin = () => {
    if (phoneNumber.trim() === '') {
      Alert.alert('Error', 'Please enter your mobile number');
    } else {
      // Navigate to OtpPage for login flow
      navigation.navigate('OtpPage', { phoneNumber, from: 'login' }); 
    }
  };

  const handleSignUp = () => {
    if (phoneNumber.trim() === '') {
      Alert.alert('Error', 'Please enter your mobile number');
    } else {
      // Navigate to OtpPage for sign-up flow
      navigation.navigate('OtpPage', { phoneNumber, from: 'signup' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>You are few steps away from taking your ride</Text>

      <View style={styles.centeredContent}>
        <Text style={styles.text}>
          <Text style={styles.justTapText}>JUST TAP!</Text> {' '}
          to SignUp or Login
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your number..."
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp} // Sign up flow
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Have an account?{' '}
          <Text
            style={styles.loginLinkText}
            onPress={handleLogin} // Login flow
          >
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F4A97',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 80,
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  justTapText: {
    fontFamily: 'SofadiOne',
    fontSize: 22,
    color: 'white',
  },
  input: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  signUpButton: {
    width: '40%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: 'white',
  },
  loginLinkText: {
    fontWeight: 'bold',
    color: 'white',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Login;
