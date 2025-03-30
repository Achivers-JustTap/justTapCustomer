import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, StyleSheet, Alert } from 'react-native';

const AddMoneyScreen = ({ navigation }) => {
  const [selectedAmount, setSelectedAmount] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Wallet',
    });
  }, [navigation]);

  const handleNext = () => {
    const amount = parseInt(selectedAmount);
    if (amount >= 50 && amount <= 500) {
      navigation.navigate('AddMoneyUPI', { amount });
    } else {
      Alert.alert('Invalid Amount', 'Please enter an amount between ₹50 and ₹500.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Wallet Balance</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter amount (₹50 - ₹500)"
        value={selectedAmount}
        onChangeText={setSelectedAmount}
      />
      
      <View style={styles.AddMoneyContainer}>
        {['50', '100', '500'].map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.AddMoneyText,
              selectedAmount === amount && styles.selectedAmount,
            ]}
            onPress={() => setSelectedAmount(amount)}
          >
            <Text style={styles.AddMoneyTextLabel}>₹{amount}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.AddMoneyButton, !selectedAmount && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedAmount}
      >
        <Text style={styles.AddMoneyButtonText}>Add Money</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddMoneyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#fff', paddingBottom: 60 },
  heading: { marginTop: 20, fontSize: 24, fontWeight: 'bold' },
  input: { width: '80%', borderBottomWidth: 2, fontSize: 18, textAlign: 'center', marginTop: 20 },
  AddMoneyContainer: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-around', width: '80%' },
  AddMoneyText: { padding: 10, fontSize: 18, fontWeight: 'bold', backgroundColor: '#0f4a97', borderRadius: 5 },
  AddMoneyTextLabel: { color: '#fff' },
  selectedAmount: { backgroundColor: 'skyblue' },
  AddMoneyButton: { backgroundColor: '#0f4a97', padding: 15, borderRadius: 10, width: '80%', position: 'absolute', bottom: 20 },
  AddMoneyButtonText: { fontSize: 18, color: '#fff', textAlign: 'center' },
  disabledButton: { backgroundColor: '#b0b0b0' },
});
