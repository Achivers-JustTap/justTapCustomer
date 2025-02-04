import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import socket from '../../../socket'
import { useSelector } from 'react-redux';

const DisplayScreen = ({ route, navigation }) => {
  const{customer}  = useSelector((state)=>state.customer)
  console.log("customer", customer)
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
//   useEffect(() => {
//     // Emit the 'register-socket' event when the user logs in
//     socket.emit('register-socket', {
//         userId: customer._id,
//         userType: 'user'
//     });

//     // Listen for ride notifications
//     // socket.on('new-ride', (ride={
//     //     "rideId": "64b435f5d3a56b7d930f3c61",
//     //     "pickup": "123 Main Street, Springfield",
//     //     "destination": "456 Elm Street, Springfield",
//     //     "vehicleType": "car"
//     // }) => {
//     //     console.log('New ride request:', ride);
//     //     // Add logic to display the ride request in the app
//     // });

   
// }, []);
useEffect(() => {
  if (customer && customer._id) {
      socket.emit('register-socket', {
          userId: customer._id,
          userType: 'user'
      });
  } else {
      console.error("User ID is undefined, cannot register socket");
  }
}, [customer]);

  const { name, isSignUp } = route.params || { name: '', isSignUp: false };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('HomeTabs'); // Navigate to HomeTabs after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {isSignUp ? ( 
        <>
          <Text style={styles.header}>"Hurray" {name}!</Text>
          <Text style={styles.subHeader}>
             we are happy that you chose our {' '} service!"
            <Text style={styles.justTapText}>JUST TAP!</Text>
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.header}>We're thrilled {name} to have you back!</Text>
          <Text style={styles.subHeader}>
          it’s been too long since your last ride. {' '} and choose your ride!"
            <Text style={styles.justTapText}>JUST TAP!</Text>
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
  },
  justTapText: {
    fontFamily: 'SofadiOne',
    color: 'white',
  },
});

export default DisplayScreen;
