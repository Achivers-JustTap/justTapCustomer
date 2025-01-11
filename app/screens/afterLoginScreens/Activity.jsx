
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Activity = () => {
  const navigation = useNavigation(); 

  const navigateToTripDetails = (tripType) => {
    navigation.navigate('TripDetails', { tripType });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="time" size={34} color="#0F4A97" />
        <Text style={styles.headerText}>Your Activity</Text>
      </View>

      <Text style={styles.sectionHeading}>Upcoming</Text>
      <TouchableOpacity onPress={() => navigateToTripDetails('YourTrip')}>
      <View style={styles.box}>
          <Text style={styles.boxText}>Your Trip Plans</Text>
        <Text style={styles.arrow}>{' >'}</Text>
      </View>
      </TouchableOpacity>
      <View style={styles.box}>
        <TouchableOpacity onPress={() => navigateToTripDetails('YourReserved')}>
          <Text style={styles.boxText}>Reserved</Text>
        </TouchableOpacity>
        <Text style={styles.arrow}>{' >'}</Text>
      </View>

      <Text style={styles.sectionHeading}>Past</Text>
      <View style={styles.pastItem}>
        <Image style={styles.imagePlaceholder} />
        <View style={styles.pastDetails}>
          <Text style={styles.locationText}>New York, NY</Text>
          <Text style={styles.dateText}>Jan 8, 2025</Text>
          <Text style={styles.timeText}>10:30 AM</Text>
          <Text style={styles.priceText}>$25.00</Text>
        </View>
        <TouchableOpacity style={styles.refreshButton}>
          <Icon name="refresh-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    top: 30,
    marginBottom: 25,
    paddingVertical: 5,
    paddingHorizontal: 2,
  
  },
  headerText: {
    fontSize: 26,
    fontWeight: '600',
    color: "#0F4A97",
    marginLeft: 2,
    top: -2
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F4A97',
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
    elevation: 2,
  },
  boxText: {
    fontSize: 18,
    color: '#0F4A97',
    fontWeight: '600',
    flex: 1,
  },
  arrow: {
    color: '#0F4A97',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'right',
  },
  pastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#b0bec5',
    borderRadius: 12,
    marginRight: 15,
  },
  pastDetails: {
    flex: 1,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F4A97',
  },
  dateText: {
    fontSize: 15,
    color: '#757575',
  },
  timeText: {
    fontSize: 15,
    color: '#757575',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F4A97',
  },
  refreshButton: {
    backgroundColor: '#0F4A97',
    padding: 12,
    borderRadius: 50,
    elevation: 3,
  },
}); 