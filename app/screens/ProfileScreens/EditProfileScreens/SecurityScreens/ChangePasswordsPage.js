import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const ChangePasswordsPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Update Password' });
  }, [navigation]);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/;
    return passwordRegex.test(password)
      ? null
      : 'Password must be at least 8 characters long, include one uppercase letter, one special character, and one digit.';
  };

  const handleCreatePassword = () => {
    if (newPassword === '' || confirmPassword === '') {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const validationError = validatePassword(newPassword);
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }

    Alert.alert('Success', 'Password changed successfully.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.instructions}>
        Your password should contain at least 8 characters, with at least one
        capital letter, one special character, and one digit.
      </Text>

   
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowNewPassword(!showNewPassword)}
        >
          <Icon
            name={showNewPassword ? 'visibility' : 'visibility-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Icon
            name={showConfirmPassword ? 'visibility' : 'visibility-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreatePassword}>
        <Text style={styles.buttonText}>Create Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F4A97',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#0F4A97',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
