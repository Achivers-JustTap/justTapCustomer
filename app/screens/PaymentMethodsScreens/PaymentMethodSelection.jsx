import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentMethodSelection = ({ route, navigation }) => {
    const { totalAmount, setPaymentMethod } = route.params;
    const [selectedMethod, setSelectedMethod] = useState('Cash');

    const upiImages = {
        gpay: require('../../../assets/images/gpay.png'),
        paytm: require('../../../assets/images/Paytm.png'),
        phonepe: require('../../../assets/images/phonepe.png'),
    };

    const handleSelection = (method) => {
        setSelectedMethod(method);
    };

    const handleConfirm = () => {
        setPaymentMethod(selectedMethod);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalAmount}>₹{totalAmount}</Text>
            </View>
            
            <TouchableOpacity style={styles.option} onPress={() => handleSelection('Wallet')}>
                <Text>Wallet</Text>
                <Text style={styles.walletBalance}>₹0.00</Text>
                
                <Icon name={selectedMethod === 'Wallet' ? "radio-button-on" : "radio-button-off"} size={20} />
            </TouchableOpacity>
            {selectedMethod === 'Wallet' && totalAmount > 0 && (
                    <Text style={styles.warningText}>Go to payment methods to add amount</Text>
                )}
            
            <TouchableOpacity style={styles.option} onPress={() => handleSelection('AmazonPay')}>
                <Image source={require('../../../assets/images/amazonPay.png')} style={styles.icon} />
                <Text>Amazon Pay</Text>
                
                <Icon name={selectedMethod === 'AmazonPay' ? "radio-button-on" : "radio-button-off"} size={20} />
            </TouchableOpacity>
            {selectedMethod === 'AmazonPay' && (
                    <Text style={styles.warningText}>Go to payment methods to link Amazon Pay</Text>
                )}

            <View style={styles.upiHeadingContainer}>
                <Image source={require('../../../assets/images/icons/UPI_Logo.png')} style={styles.upiIcon} />
                <Text style={styles.sectionTitle}>UPI Payment</Text>
            </View>
            <View style={styles.upiList}>
                {Object.keys(upiImages).map((upi) => (
                    <TouchableOpacity key={upi} style={styles.upiOption} onPress={() => handleSelection(upi)}>
                        <Image source={upiImages[upi]} style={styles.icon} />
                        <Text>{upi}</Text>
                        <Icon name={selectedMethod === upi ? "radio-button-on" : "radio-button-off"} size={20} />
                    </TouchableOpacity>
                ))}
                
            
            </View>
            <TouchableOpacity style={styles.option} onPress={() => handleSelection('Cash')}>
                <Image source={require('../../../assets/images/cash.png')} style={styles.icon} />
                <Text>Cash</Text>
                <Icon name={selectedMethod === 'Cash' ? "radio-button-on" : "radio-button-off"} size={20} />
            </TouchableOpacity>
            
            <View style={styles.footer}>
                <TouchableOpacity style={styles.GotoButton} onPress={() => navigation.navigate('PaymentMethods')}>
                    <Text style={styles.GotoButtonText}>Go to Payment Methods</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: 'white' },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    totalText: { fontSize: 18, fontWeight: 'bold' },
    totalAmount: { fontSize: 18, fontWeight: 'bold', color: 'green' },
    option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    walletBalance: { color: 'gray' },
    warningText: { color: 'red', fontSize: 12, marginLeft: 10 },
    sectionTitle:{
        fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 10
    },
    upiHeadingContainer: { flexDirection: 'row',alignItems: 'center', marginTop: 20 },
    upiIcon: { width: 55, height: 15, marginRight: 10 },
    upiList: { flex: 1 },
    upiOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginTop: 10 },
    icon: { width: 50, 
        height: 50,
        marginRight: 10,
        resizeMode: 'contain', marginRight: 10 },
    footer: { marginTop: 'auto', paddingTop: 20 },
    GotoButton:{
      borderColor: '#0F4A97', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 10, borderWidth: 3,
    },
    confirmButton: { backgroundColor: '#0F4A97', padding: 15, borderRadius: 5, alignItems: 'center' },
    confirmButtonText: { color: 'white', fontWeight: 'bold' }
});

export default PaymentMethodSelection;
