import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const AddMoneyScreen = ({ navigation }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Wallet',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}> Wallet Balance </Text>
      <View style={styles.WalletBalance}>
        <Text style={styles.WalletBalanceText}>₹0.00</Text>
      </View>

      <View style={styles.AddMoneyContainer}>
        {['₹50', '₹100', '₹500'].map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.AddMoneyText,
              selectedAmount === amount && styles.selectedAmount, 
            ]}
            onPress={() => setSelectedAmount(amount)}
          >
            <Text style={styles.AddMoneyTextLabel}>{amount}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.AddMoneyButton,
          !selectedAmount && styles.disabledButton, 
        ]}
        onPress={() => navigation.navigate('AddMoneyUPI')}
        disabled={!selectedAmount}
      >
        <Text style={styles.AddMoneyButtonText}>Add Money</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddMoneyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 60, 
  },
  heading: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  WalletBalance: {
    marginTop: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 3,
    width: '80%',
  },
  WalletBalanceText: {
    fontSize: 18,
    textAlign: 'center',
  },
  AddMoneyContainer: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    width: '80%',
  },
  AddMoneyText: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#0f4a97',
    borderRadius: 5,
    color: '#fff',
  },
  AddMoneyTextLabel: {
    color: '#fff',
  },
  selectedAmount: {
    backgroundColor: 'skyblue', 
  },
  AddMoneyButton: {
    backgroundColor: '#0f4a97',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  AddMoneyButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#b0b0b0', 
  },
});
