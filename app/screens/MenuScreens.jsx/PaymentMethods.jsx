import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const paymentMethodsData = [
  { id: '1', name: 'Cash', image: require('../../../assets/images/cash.png') },
  { id: '2', name: 'UPI Payments', image: require('../../../assets/images/icons/UPI_Logo.png'), subMethods: [
      { id: 'upi-1', name: 'GPay', image: require('../../../assets/images/gpay.png') },
      { id: 'upi-2', name: 'Paytm', image: require('../../../assets/images/Paytm.png') },
      { id: 'upi-3', name: 'PhonePe', image: require('../../../assets/images/phonepe.png') }
    ]
  },
  { id: '3', name: 'Amazon Pay', image: require('../../../assets/images/amazonPay.png') }
];

const PaymentMethods = ({ navigation }) => {
  const [expanded, setExpanded] = useState(null);
  const [selectedUPIMethod, setSelectedUPIMethod] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
    if (!id.startsWith('upi-')) {
      setSelectedUPIMethod(null);
    }
  };

  const toggleUPIMethod = (id) => {
    setSelectedUPIMethod(selectedUPIMethod === id ? null : id);
  };

  const renderPaymentMethodItem = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.paymentMethodItem} onPress={() => toggleExpand(item.id)}>
        <Image source={item.image} style={styles.paymentMethodImage} />
        <Text style={styles.paymentMethodName}>{item.name}</Text>
        {item.id !== '3' && (
          <AntDesign name={expanded === item.id ? 'up' : 'down'} size={20} color="black" style={styles.arrowIcon} />
        )}
        {item.id === '3' && (
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Link</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      
      {item.id === '1' && expanded === item.id && (
        <Text style={styles.infoText}>You can pay cash directly to the driver.</Text>
      )}
      
      {item.subMethods && expanded === item.id && (
        <View style={styles.subMethodContainer}>
          {item.subMethods.map((sub) => (
            <View key={sub.id}>
              <TouchableOpacity style={styles.subMethodItem} onPress={() => toggleUPIMethod(sub.id)}>
                <Image source={sub.image} style={styles.subMethodImage} />
                <Text style={styles.paymentMethodName}>{sub.name}</Text>
                <AntDesign name={selectedUPIMethod === sub.id ? 'up' : 'down'} size={20} color="black" style={styles.arrowIcon} />
              </TouchableOpacity>
              {selectedUPIMethod === sub.id && (
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>Pay online using {sub.name} to App Scanner or to the Driver directly.</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Payment Method</Text>
      <View style={styles.walletContainer}>
        <Text style={styles.walletHeading}>Wallet</Text>
        <Text style={styles.walletContainerText}>₹0.00</Text>
        <TouchableOpacity style={styles.walletButton} onPress={() => navigation.navigate('AddMoneyScreen')}>
          <Text style={styles.walletButtonText}>+ Add Money</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionHeader}>Other Payment Methods</Text>
      <FlatList
        data={paymentMethodsData}
        keyExtractor={(item) => item.id}
        renderItem={renderPaymentMethodItem}
        contentContainerStyle={styles.paymentList}
      />
      <TouchableOpacity style={styles.transactionButton}>
        <AntDesign name="profile" size={20} color="white" />
        <Text style={styles.transactionButtonText}>Transaction Record</Text>
      </TouchableOpacity>
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  walletContainer: {
    padding: 20,
    backgroundColor: '#dae7f8',
    borderRadius: 20,
    marginBottom: 20,
  },
  walletHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  walletContainerText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    marginTop: 10,
  },
  walletButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  walletButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    minHeight: 70, 
  },
  paymentMethodName:{
    fontSize: 16,
    fontWeight:'bold'
  },
  subMethodContainer: {
    paddingLeft: 40,
    paddingTop: 5,
  },
  subMethodItem: {
  
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  paymentMethodImage: {
    width: 50, 
    height: 50,
    marginRight: 10,
    resizeMode: 'contain', 
  },
  subMethodImage: {
    width: 50, 
    height: 50, 
    marginRight: 10,
    borderRadius: 25, 
    resizeMode: 'contain', 
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  infoText: {
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  transactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  transactionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  linkButton: {
    marginLeft: 'auto',
    padding: 5,
  },
  linkButtonText: {
    color: '#0F4A97',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default PaymentMethods;
