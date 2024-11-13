import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker'; 
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('male'); 
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirthString, setDateOfBirthString] = useState(''); 

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSignUp = () => {
    if (!name.trim() || !email.trim() || !dateOfBirthString.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      navigation.navigate('DisplayScreen',  { name, isSignUp: true }); 
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowPicker(false);
    setDateOfBirth(currentDate);
   
    const formattedDate = currentDate.toISOString().split('T')[0];
    setDateOfBirthString(formattedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>You are few steps away from taking your first ride</Text>
      
      <View style={styles.centeredContent}>
        <Text style={styles.text}>Enter Your Details to Sign Up</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your name..."
          keyboardType='default'
          value={name}
          onChangeText={setName} 
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter your email..."
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail} 
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowPicker(true)} 
        >
          <Text style={{ fontSize: 16 }}>{dateOfBirthString || "date of birth..."}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp} 
        >
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
  dateInput: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
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

export default SignUp;
