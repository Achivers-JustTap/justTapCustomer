import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

const paymentMethodsData = [
  { id: '1', name: 'Cash', image: require('../../../assets/images/cash.png') },
  { id: '2', name: 'Credit Card'},
  { id: '3', name: 'Debit Card' },
  { id: '4', name: 'Google Pay' },
];

  const PaymentMethods = ({ navigation }) => {
    const renderPaymentMethodItem = ({ item }) => (
      <TouchableOpacity 
        style={styles.paymentMethodItem}
        onPress={() => navigation.navigate('BookingScreen', { selectedPaymentMethod: item })} // Pass the selected item
      >
        <Image source={item.image} style={styles.paymentMethodImage} />
        <Text style={styles.paymentMethodName}>{item.name}</Text>
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Payment Method</Text>
      <FlatList
        data={paymentMethodsData}
        keyExtractor={(item) => item.id}
        renderItem={renderPaymentMethodItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.paymentList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  paymentList: {
    paddingBottom: 16,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  paymentMethodImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  paymentMethodName: {
    fontSize: 18,
  },
});

export default PaymentMethods;
