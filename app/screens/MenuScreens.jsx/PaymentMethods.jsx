import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

const paymentMethodsData = [
  { id: '1', name: 'Cash', image: require('../../../assets/images/cash.png') },
  { id: '2', name: 'UPI Payments', image: require('../../../assets/images/icons/UPI_Logo.png')},
];

const PaymentMethods = ({ navigation }) => {
  const renderPaymentMethodItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.paymentMethodItem}
      onPress={() => navigation.navigate('BookingScreen', { selectedPaymentMethod: item })} 
    >

      <Image 
        source={item.image} 
        style={[
          styles.paymentMethodImage, 
          item.name === 'UPI Payments' && styles.upiImage 
        ]} 
      />
      <Text style={styles.paymentMethodName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Payment Method</Text>
      <View style={styles.walletContainer}>
        <Text style={styles.walletHeading}>Wallet</Text>
        <Text style={styles.walletContainerText}>₹0.00</Text>
        <TouchableOpacity style={styles.walletButton}><Text style={styles.walletButtonText}>+ Add Money</Text></TouchableOpacity>
      </View>

      <Text style={{fontSize: 20,fontWeight: 'bold',marginBottom: 16}}>Other Payment Methods</Text>
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
  walletContainer: {
    padding: 20,
    backgroundColor:'#dae7f8',
    borderRadius: 20,
    marginBottom:20,
  },
  walletHeading:{
  fontSize: 20,
  fontWeight: 'bold',
  },
  walletContainerText:{
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    marginTop: 10,

  },
  walletButton:{
    backgroundColor:'#0F4A97',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  walletButtonText:{
    color:'#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  

  paymentMethodImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  upiImage: {
    width: 37,
    height: 10
  },
  paymentMethodName: {
    fontSize: 18,
  },
});

export default PaymentMethods;
