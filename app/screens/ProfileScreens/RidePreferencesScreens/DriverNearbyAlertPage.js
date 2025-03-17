import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, Dimensions, View, ImageBackground, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const RideCheckPage = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Driver Nearby & Waiting Alert',
    });
  }, [navigation]);
// State to manage notification toggle
const [isNotificationEnabled, setIsNotificationEnabled] = useState(false)

// Handler to toggle the notification setting
const toggleNotification = () => setIsNotificationEnabled(previousState => !previousState)

 

  useEffect(() => {
     if (isFocused) {
       setShowOverlay(false);
 
       const timer = setTimeout(() => {
         setShowOverlay(true);
       }, 1000);
 
       return () => clearTimeout(timer);
     }
   }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground
              source={require('../../../../assets/images/otherImages/DriverNearbyAlert.jpeg')}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}
            >
      {showOverlay && (
        <LinearGradient
          colors={['rgba(254, 254, 254, 0.83)', 'rgba(199, 221, 249, 0.83)']}
          style={styles.overlay}
        >
         <View style={styles.Maincontainer}>
      {/* Title */}
      <Text style={styles.title}>Driver Nearby & Waiting ALert</Text>
   
      <Text style={styles.infoText}>
        When you are near a driver or waiting for a driver, you can enable notifications to alert you when the driver is nearby or waiting for you.
      </Text>

      

      <View style={styles.notificationSection}>
        <Text style={styles.notificationText}>Enable Notifications</Text>
        <Switch
          value={isNotificationEnabled}
          onValueChange={toggleNotification}
          trackColor={{ false: '#767577', true: 'black' }}
          thumbColor={isNotificationEnabled ? 'skyblue' : '#f4f3f4'}
        />
      </View>

      {isNotificationEnabled && (
        <Text style={styles.notificationStatus}>Notifications are enabled for Driver Nearby & Waiting Alert.</Text>
      )}
      {!isNotificationEnabled && (
        <Text style={styles.notificationStatus}>Notifications are disabled for Driver Nearby & Waiting Alert.</Text>
      )}
    </View>
        </LinearGradient>
      )}

</ImageBackground>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
 
  backgroundImage: {
    width: 450,
    height: 730,
    right: 35,
    marginTop:-10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: width * 0.96,
    height: height * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 50,
    left: 35,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
   
  },
  Maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: '70%',
  
  },
  infoText: {
    fontSize: 20,
    color: '#000',
    fontWeight:'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    textAlign:'center',
    color:'#0F4A97',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationText: {
    fontSize: 18,
    fontWeight:'bold',
    marginRight: 10,
  },
  notificationStatus: {
    fontSize: 16,
    fontWeight:'bold',
    color: '#000',
    marginTop: 10,
  },
  
});

export default RideCheckPage;
