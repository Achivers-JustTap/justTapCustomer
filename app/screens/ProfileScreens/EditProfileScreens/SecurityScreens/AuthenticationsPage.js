import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const AuthenticationsPage = ({ navigation }) => {
  const [selectedAuth, setSelectedAuth] = useState(null);

  useEffect(() => {
    navigation.setOptions({ title: 'Authentications' });
  }, [navigation]);

  const handleAuth = (authType) => {
    setSelectedAuth(authType);
  };

  const handleSuccess = () => {
    Alert.alert('Success', `${selectedAuth} added successfully!`);
    setSelectedAuth(null);
  };

  return (
    <View style={styles.container}>
      {!selectedAuth ? (
       
        <View>
          <Text style={styles.title}>Select Authentication Method</Text>
          <Text style={styles.accSecure}>Make Your Accout More Secure with these Authentications </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAuth('Fingerprint Authentication')}
          >
            <Icon name="fingerprint" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Fingerprint Authentication</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAuth('Face Authentication')}
          >
            <Icon name="face-recognition" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Face Authentication</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAuth('Device PIN or Pattern')}
          >
            <Icon name="lock-pattern" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Device PIN or Pattern</Text>
          </TouchableOpacity>
        </View>
      ) : (
       
        <View style={styles.authContainer}>
          <Text style={styles.title}>Perform {selectedAuth}</Text>
          <Text style={styles.instructions}>
            {selectedAuth === 'Fingerprint Authentication' &&
              'Place your finger on the fingerprint scanner to proceed.'}
            {selectedAuth === 'Face Authentication' &&
              'Position your face in front of the camera to proceed.'}
            {selectedAuth === 'Device PIN or Pattern' &&
              'Enter your device PIN or pattern to proceed.'}
          </Text>
          <TouchableOpacity style={styles.authButton} onPress={handleSuccess}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AuthenticationsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F4A97',
    marginBottom: 20,
    textAlign: 'center',
  },
  accSecure:{
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: 300,
  },
  icon: {
    marginRight: 10, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  authContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  instructions: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
  authButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
});
