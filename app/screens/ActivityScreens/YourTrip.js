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
            
      <Text style={styles.upcomingTripsText}>You have no Upcoming Trips</Text>
      <View style={styles.planTripContainer}>
        <TouchableOpacity style={styles.planTripButton}>
          <Text style={styles.planTripText}>Plan a Trip</Text>
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
  upcomingTripsText: {
    paddingTop: 100,
    fontSize: 25,
    fontWeight:'bold',
    marginBottom: 16,
  },
  planTripContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  planTripButton: {
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 8,
  },
  planTripText: {
    fontSize: 16,
    color: 'rgba(15,74,151, 0.76)',
  },
  arrowIcon: {
    marginLeft:80,
    marginTop: -21
  },
});
