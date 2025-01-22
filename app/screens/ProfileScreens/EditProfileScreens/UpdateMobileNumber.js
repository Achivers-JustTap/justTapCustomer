import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

const UpdateMobileNumber = ({ navigation, route }) => {
  const [number, setNumber] = useState(route.params?.number || '');
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Update Mobile Number',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const handleNext = () => {
    if (!number) {
      Alert.alert('Validation Error', 'Please enter a mobile number');
      return;
    }
    setIsVerifying(true); 
  };

  const handleVerify = () => {
    if (code === '1234') { 
      Alert.alert('Success', 'Mobile number verified');
      navigation.navigate('EditProfilePage', { updatedNumber: number });
    } else {
      Alert.alert('Error', 'Invalid verification code');
    }
  };

  return (
    <View style={styles.container}>
      {!isVerifying ? (
        <>
          <Text style={styles.heading}>Enter Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            value={number}
            onChangeText={setNumber}
          />
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.heading}>Enter Verification Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 4-digit code"
            keyboardType="numeric"
            maxLength={4}
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default UpdateMobileNumber;

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
