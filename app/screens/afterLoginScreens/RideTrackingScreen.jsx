import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RideTrackingScreen = ({ navigation }) => {
  const [isRideCancelled, setIsRideCancelled] = useState(false);
  const [isBirthday, setIsBirthday] = useState(true);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    // Navigate to RideTracking screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.navigate('RatingPage');
    }, 5000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  const handleCashClick = () => {
    navigation.navigate('PaymentMethods'); 
  };

  const cancelRide = () => {
    Alert.alert(
      'Cancel Ride',
      'Are you sure you want to cancel the ride?',
      [
        { 
          text: 'No', 
          style: 'cancel', 
          onPress: () => setIsRideCancelled(false)  
        },
        { 
          text: 'Yes', 
          style: 'destructive', 
          onPress: () => {
            setIsRideCancelled(true);  
            navigation.navigate("HomeTabs");  
          }
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapbox}>
        <Text> Map </Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.otpTimeContainer}>
          <View style={styles.otpContainer}>
            <Text style={styles.otpContainerTitle}>Your PIN for Confirming Ride</Text>
            <View style={styles.otpBoxes}>
              <Text style={styles.otpText}>0</Text>
              <Text style={styles.otpText}>0</Text>
              <Text style={styles.otpText}>0</Text>
              <Text style={styles.otpText}>0</Text>
            </View>
          </View>

          
          <View style={styles.pickupTimeBox}>
            <Text style={styles.timeBoxHeading}>DropOff Time</Text>
            <Text style={styles.timeText}>00:00</Text>
          </View>
          <View style={styles.arrivingTimeBox}>
            <Text style={styles.ArrivingBoxHeading}>Arriving In</Text>
            <Text style={styles.ArrivingTimeText}>0 min</Text>
          </View>
        </View>

        <View style={styles.driverDetailsContainer}>
          <View style={styles.driverInfoContainer}>
            <Image source={require('../../../assets/images/icons/DriverIcon.jpg')} style={styles.driverIcon} />
          </View>

          <View style={{ top: 7, left: -5 }}>
            <Text style={styles.driverName}>Driver Name</Text>
            <Text style={styles.vehicleName}>Vehicle Name</Text>
          </View>

          <View style={styles.vehicleInfoContainer}>
            <View style={styles.vehicleNumberContainer}>
              <Text style={styles.vehicleNumber}>AB12CD3456</Text>
            </View>
            <View style={styles.iconsContainer}>
              <Icon name="chatbubbles" size={24} top={-2} left={3} color="#0F4A97" />
              <Icon name="call" size={24} top={-2} left={3} color="#0F4A97" />
            </View>
          </View>

          <View style={styles.profileAndRatingContainer}>
            <View style={styles.profileContainer}>
              <Image source={require('../../../assets/images/icons/ProfileIcon.png')} style={styles.profileIcon} />
              
              <View style={styles.starsContainer}>
                <Text style={styles.driverRating}>4.5</Text>
                {[...Array(5)].map((_, index) => (
                  <Icon
                    key={index}
                    name="star"
                    size={10}
                    top={-0.4}
                    left={2}
                    color={index < 4.5 ? "#FFD700" : "#D3D3D3"} 
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {isBirthday && (
          <View style={styles.birthdayMessageContainer}>
            <Text style={styles.birthdayMessageText}>
              Today is our JUST TAP! partner John Doe’s birthday🎉🎂. We have already sent our wishes, now it's your turn.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.TotalFareContainer}>
        <TouchableOpacity onPress={handleCashClick} style={styles.cashOptionContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.rupeesText}>Total Fare : ₹0</Text>
          </View>
          <Image source={require('../../../assets/images/cash.png')} style={styles.cashImage} />
          <Text style={styles.cashOption}>Cash</Text>
          <View style={styles.triangle} />
        </TouchableOpacity>
      </View>

      <View style={styles.cancelRideContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={cancelRide}>
          <Text style={styles.cancelButtonText}>Cancel Ride</Text>
        </TouchableOpacity>
      </View>

      {isRideCancelled && (
        <View style={styles.cancelConfirmationContainer}>
          <Text style={styles.cancelConfirmationText}>Ride Cancelled!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  header: {
    position: 'absolute',   
    top: 35,
    left: 15,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: '#0F4A97',
    padding: 7,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapbox:{
   backgroundColor:'grey',
   width:'100%',
   height: 500,
  },
  detailsContainer: {
    backgroundColor: '#f0f0f0',
    paddingTop: 10,
    height:345,
  },
  otpTimeContainer: {
    padding: 5,
    backgroundColor: "#fff",
    flexDirection: 'row',
  },
  otpContainer: {
    padding: 5,
    backgroundColor: "#0F4A97",
    borderRadius: 10,
    right: 5,
  },
  otpContainerTitle: {
    textAlign: 'center',
    color: "white",
    fontSize: 10,
  },
  otpBoxes: {
    flexDirection: 'row',
  },
  otpText: {
    fontSize: 13,
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 3,
    marginHorizontal: 2,
    borderRadius: 7,
    fontWeight: 'bold',
  },
  pickupTimeBox: {
    borderColor: "#0F4A97",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 2,
    padding: 3,
    width: 60,
    left: 70,
  },
  timeBoxHeading: {
    fontSize: 12,
    color: "#0F4A97",
    textAlign: 'center',
  },
  timeText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: "#0F4A97",
  },
  arrivingTimeBox: {
    backgroundColor: "#0F4A97",
    borderRadius: 10,
    padding: 3,
    left: 80,
  },
  ArrivingBoxHeading: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  ArrivingTimeText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
  driverDetailsContainer: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  driverInfoContainer: {
    top: 10
  },
  driverIcon: {
    width: 30,
    height: 30,
    marginRight: 7,
  },
  driverName: {
    textAlign:'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: "#0F4A97",
  },
  vehicleName: {
    textAlign:'center',
    fontSize: 11,
    color: "#0F4A97",
  },
  vehicleInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleNumberContainer: {
    top: -2,
    left:2,
    borderColor:"#0F4A97",
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
  },
  vehicleNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconsContainer: {
    marginHorizontal:5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAndRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  profileIcon: {
    backgroundColor:'#D9D9D9',
    width: 32,
    height: 32,
    borderRadius: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 1,
  },
  driverRating: {
    marginTop:-1,
    fontSize: 10 ,
    fontWeight: 'bold',
  },
  birthdayMessageContainer: {
    backgroundColor: '#0F4A97',
    padding: 10,
    marginTop: 3,
    borderRadius: 10,
  },
  birthdayMessageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  TotalFareContainer: {
    padding: 10,
    marginTop: -85,
    marginBottom: 0,
    backgroundColor: 'white',
  },
  cashOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rupeesText: {
    fontSize: 16,
    color: '#0F4A97',
  },
  cashImage: {
    width: 30,
    height: 30,
   right: -80,
  },
  cashOption: {
    top:2,
    right:-30,
    fontSize: 16,
    color: '#0F4A97',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'green',
  },
  cancelRideContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 100,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelConfirmationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  cancelConfirmationText: {
    fontSize: 18,
    color: 'red',
  },
}); 

export default RideTrackingScreen;
