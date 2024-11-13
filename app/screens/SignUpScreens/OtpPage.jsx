import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

const OtpPage = ({ route, navigation }) => {
  const { phoneNumber, from } = route.params; // Get the 'from' parameter
  const [otp, setOtp] = useState('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
   const exampleUserName = "Charitha"
  const verifyOtp = () => {
     const exampleUserName = "Charitha"
    if (otp === '1234') { 
      if (from === 'login') {
        Alert.alert('Success', 'OTP verified successfully for login', [
          { text: 'OK', onPress: () => navigation.navigate('DisplayScreen', { name: exampleUserName }) }
        ]);
      } else {
        Alert.alert('Success', 'OTP verified successfully for sign up', [
          { text: 'OK', onPress: () => navigation.navigate('SignUpPage') }
        ]);
      }
    } else {
      Alert.alert('Error', 'Invalid OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>You are few steps away from taking your ride</Text>
      <View style={styles.centeredContent}>
        <Text style={styles.text}>Enter OTP sent to {phoneNumber}</Text>
        <TextInput
          style={styles.input}
          placeholder="OTP"
          keyboardType="phone-pad"
          value={otp}
          onChangeText={setOtp}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={verifyOtp}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
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
  input: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    width: '40%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default OtpPage;
