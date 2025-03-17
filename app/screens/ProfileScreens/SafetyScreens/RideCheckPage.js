
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, Dimensions, View, ImageBackground, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const RideCheckPage = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [selectedPreference, setSelectedPreference] = useState('');

  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Ride Check',
    });
  }, [navigation]);
// State to manage notification toggle
const [isNotificationEnabled, setIsNotificationEnabled] = useState(false)

// Handler to toggle the notification setting
const toggleNotification = () => setIsNotificationEnabled(previousState => !previousState)

  const handleSelectPreference = (preference) => {
    setSelectedPreference(preference);
  };

  const handleResetPreferences = () => {
    setSelectedPreference(''); 
  };



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
              source={require('../../../../assets/images/otherImages/RideCheckBG.jpeg')}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}
            >
      {showOverlay && (
        <LinearGradient
          colors={['rgba(254, 254, 254, 0.8)', 'rgba(199, 221, 249, 0.8)']}
          style={styles.overlay}
        >
         <View style={styles.Maincontainer}>
 
         <Text style={styles.title}>Ride Check</Text>
   
      <Text style={styles.infoText}>
        Stay informed about your ride safety preferences. Turn on notifications to receive important ride check alerts and ensure a safe journey.
      </Text>

      

      <View style={styles.notificationSection}>
        <Text style={styles.notificationText}>Enable Ride Check Notifications</Text>
        <Switch
          value={isNotificationEnabled}
          onValueChange={toggleNotification}
          trackColor={{ false: '#767577', true: 'black' }}
          thumbColor={isNotificationEnabled ? 'skyblue' : '#f4f3f4'}
        />
      </View>

      {isNotificationEnabled && (
        <Text style={styles.notificationStatus}>Notifications are enabled for ride check safety preferences.</Text>
      )}
      {!isNotificationEnabled && (
        <Text style={styles.notificationStatus}>Notifications are disabled for ride check safety preferences.</Text>
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
    marginTop:'60%',
    justifyContent:'center',
    alignItems:'center',
  },
  infoText: {
    fontSize: 20,
    textAlign:'center',
    fontWeight:'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 30,
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
    fontSize: 15,
    color: '#000',
    fontWeight:'bold',
    marginTop: 10,
  },
});

export default RideCheckPage;
