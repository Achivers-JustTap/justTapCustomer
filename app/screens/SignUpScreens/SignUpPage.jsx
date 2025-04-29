import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setCustomerData } from '../../../storemanagement_customer/actions_customer/customerActions';

const SignUpPage = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !dateOfBirth.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate the date format (dd/mm/yyyy)
    const datePattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    if (!datePattern.test(dateOfBirth)) {
      Alert.alert('Error', 'Please enter a valid date in dd/mm/yyyy format');
      return;
    }

    const [day, month, year] = dateOfBirth.split('/');
    const customerData = {
      name,
      email,
      phoneNumber,
      gender,
      dateOfBirth: `${year}-${month}-${day}`, // Convert to YYYY-MM-DD format
    };

    try {
      const response = await axios.post('http://192.168.193.170:5000/api/users/register', customerData);

      if (response.data) {
        const { id } = response.data.user;
        dispatch(setCustomerData({ ...customerData, id }));

        Alert.alert('Success', 'Account created successfully.', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('DisplayScreen', {
                name,
                isSignUp: true,
              }),
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
      console.error('SignUp Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>You are few steps away from taking your first ride</Text>

      <View style={styles.centeredContent}>
        <Text style={styles.text}>Enter Your Details to Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name..."
          keyboardType="default"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your email..."
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.pickerContainer}>
          <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: dateOfBirth ? 'black' : '#888' }}>
            {dateOfBirth || 'Select your date of birth'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                const day = selectedDate.getDate().toString().padStart(2, '0');
                const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                const year = selectedDate.getFullYear();
                setDateOfBirth(`${day}/${month}/${year}`);
              }
            }}
          />
        )}

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  signUpButton: {
    width: '40%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default SignUpPage;
