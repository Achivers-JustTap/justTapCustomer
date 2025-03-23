import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const AddMoneyUPI = () => {
  const navigation = useNavigation();
   useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Add Money',
      });
    }, [navigation]);
  
  const upiMethods = [
    { name: 'GPay', image: require('../../../assets/images/gpay.png') },
    { name: 'Paytm', image: require('../../../assets/images/Paytm.png') },
    { name: 'PhonePe', image: require('../../../assets/images/phonepe.png') },
    { name: 'AmazonPay', image: require('../../../assets/images/amazonPay.png') }
  ];

  const handleSelectMethod = (method) => {
    navigation.navigate('AddMoneyEnterUpi', { method });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a UPI Method</Text>
      <View style={styles.methodContainer}>
        {upiMethods.map((method, index) => (
          <TouchableOpacity key={index} style={styles.method} onPress={() => handleSelectMethod(method.name)}>
            <Image source={method.image} style={styles.methodImage} resizeMode="contain" />
            <Text style={styles.methodText}>{method.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.stepsTitle}>Steps to Add Money</Text>
      <View style={styles.stepsContainer}>
        <Text style={styles.step}>1. Select a UPI Method</Text>
        <Text style={styles.step}>2. Enter your UPI ID</Text>
        <Text style={styles.step}>3. Click on the Send button to request payment</Text>
        <Text style={styles.step}>4. Open your UPI payment app and complete the payment</Text>
      </View>
    </View>
  );
};

export default AddMoneyUPI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  methodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    flexWrap: 'wrap', 
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  method: {
    alignItems: 'center',
    marginHorizontal: 20, 
    marginVertical: 20,
  },
  methodImage: {
    width: 80, 
    height: 80,
    borderRadius: 40, 
  },
  methodText: {
    marginTop: 5,
    fontSize: 16,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepsContainer: {
    alignItems: 'flex-start',
  },
  step: {
    fontSize: 16,
    marginVertical: 5,
  },
});
