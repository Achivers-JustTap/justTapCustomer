import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

const AddMoneyEnterUpi = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { method } = route.params;
  const [upiId, setUpiId] = useState('');

     useLayoutEffect(() => {
        navigation.setOptions({
          title: 'Add Money',
        });
      }, [navigation]);

  const handleSend = () => {
    navigation.navigate('PaymentMethods');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter UPI ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Number@upi"
        value={upiId}
        onChangeText={setUpiId}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMoneyEnterUpi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0f4a97',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
