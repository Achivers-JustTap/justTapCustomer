import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ReceiptPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>

         <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Icon name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
      {/* Big Heading Text */}
      <Text style={styles.heading}>Thanks for Choosing <Text style={styles.bold}>JUST TAP!</Text></Text>

      {/* Circle with Auto Image */}
      <View style={styles.circleContainer}>
        <Image
          source={require('../../../assets/images/icons/auto.png')} 
          style={styles.circleImage}
        />
      </View>

      {/* Date and Total Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.leftText}>Date: </Text>
        <Text style={styles.rightText}>08/01/2025</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.leftText}>Total: </Text>
        <Text style={styles.rightText}>₹220</Text>
      </View>

      {/* Payment Method Section */}
      <Text style={styles.paymentHeading}>Payment Method</Text>
      <View style={styles.paymentContainer}>
        <Image
           source={require('../../../assets/images/cash.png')} 
          style={styles.paymentImage}
        />
        <Text style={styles.leftText}>Cash</Text>
        <Text style={styles.rightText}>₹220</Text>
      </View>

      <Text style={styles.dateTimeText}>08/01/2025   10.55AM</Text>
    </SafeAreaView>
  );
}

export default ReceiptPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
},
  backButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
},
  heading: {
    top: 30,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#0F4A97',
    marginVertical: 20,
  },
  bold: {
    fontFamily: 'SofadiOne',
    fontSize: 35,
    color: '#0F4A97',
  },
  circleContainer: {
    marginVertical: 20,
    marginLeft: 85,
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#0F4A97',
  },
  circleImage: {
    width: 150,
    height: 150, 
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  leftText: {
    fontSize: 16,
    fontWeight: '500',
  },
  rightText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
  },
  paymentHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  paymentImage: {
    width: 40,
    height: 40,
  },
  dateTimeText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: -10,
  },
});
