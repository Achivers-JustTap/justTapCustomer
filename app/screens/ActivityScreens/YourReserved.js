import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const YourTrip = ({navigation}) => {
   useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleBack = () => {
        navigation.goBack();
      };
  
  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <FontAwesome name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
             
      <Text style={styles.upcomingTripsText}>

      Looks like you haven’t reserved a ride with <Text style={styles.justTapText}>JUST TAP!</Text> yet. Ready to lock in your next journey?
      
      </Text>
      <View style={styles.planTripContainer}>
        <TouchableOpacity style={styles.planTripButton}>
          <Text style={styles.planTripText}>Reserve</Text>
          <Feather name="arrow-right" size={24} color='rgba(15,74,151, 0.76)' style={styles.arrowIcon} />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default YourTrip;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: '#0F4A97', 
    padding: 10,
    borderRadius: 50,
  },
  justTapText: {
    fontFamily: 'SofadiOne',
    fontSize: 30,
    color: '#0F4A97',
  },
  upcomingTripsText: {
    paddingTop: 100,
    fontSize: 23,
    fontWeight:'bold',
    marginBottom: 16,
    textAlign:'justify'
  },
  planTripContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  planTripButton: {
    paddingVertical: 0,
    paddingHorizontal: -3,
    borderRadius: 8,
  },
  planTripText: {
    fontSize: 16,
    color: 'rgba(15,74,151, 0.76)',
  },
  arrowIcon: {
    marginLeft:60,
    marginTop: -21
  },
});
