import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons'; 

const YourTrip = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.upcomingTripsText}>You have no Upcoming Trips</Text>
      <View style={styles.planTripContainer}>
        <TouchableOpacity style={styles.planTripButton}>
          <Text style={styles.planTripText}>Plan a Trip</Text>
        </TouchableOpacity>
        <Feather name="arrow-right" size={24} color="black" style={styles.arrowIcon} />
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
  upcomingTripsText: {
    fontSize: 18,
    marginBottom: 16,
  },
  planTripContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  planTripButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFA500', 
    borderRadius: 8,
  },
  planTripText: {
    fontSize: 16,
    color: 'white',
  },
  arrowIcon: {
    marginLeft: 8,
  },
});
