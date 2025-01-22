import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';

const UpdateEmailId = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params?.email || '');
  const [isVerificationMode, setIsVerificationMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Update Email',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const handleUpdate = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }
    setIsVerificationMode(true); 
  };

  const handleVerify = () => {
    if (verificationCode.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit code');
      return;
    }
    Alert.alert('Success', 'Email verified successfully');
    navigation.navigate('EditProfilePage', { updatedEmail: email });
  };

  return (
    <View style={styles.container}>
      {!isVerificationMode ? (
        <>
          <Text style={styles.heading}>Enter Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.heading}>Enter Verification Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit code"
            keyboardType="number-pad"
            value={verificationCode}
            onChangeText={setVerificationCode}
            maxLength={6}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default UpdateEmailId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0F4A97',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
