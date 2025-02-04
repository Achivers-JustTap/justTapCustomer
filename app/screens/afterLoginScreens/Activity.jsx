import React, { useState, useRef } from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, 
  Image, ScrollView, Animated, Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Activity = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [tripDetails, setTripDetails] = useState(null); 
  const slideAnim = useRef(new Animated.Value(height)).current;

 
  const fetchTripDetails = () => {
    
    const exampleData = {
      rideType: 'Auto Ride to Hitech City',
      date: 'Jan 8, 2025',
      time: '10:30 AM',
      totalFare: '₹220.00',
      pickupPoint: 'KPHB',
      pickupTime: '10:30 AM',
      destination: 'Hitech City',
      dropoffTime: '10:50 AM',
    };

    setTripDetails(exampleData); 
  };


  const openSlide = () => {
    fetchTripDetails(); 
    setIsVisible(true);
    Animated.timing(slideAnim, {
      toValue: height * 0.2,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

 
  const closeSlide = () => {
    Animated.timing(slideAnim, {
      toValue: height, 
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsVisible(false));
  };

  return (
    <LinearGradient colors={['#fff', '#fff']} style={styles.container}>
      <LinearGradient colors={['#0D47A1', '#1976D2']} style={styles.header}>
        <Icon name="time" size={30} color="#fff" />
        <Text style={styles.headerTitle}>Your Activity</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>TO BE TAKEN</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.card, styles.cardWithShadow]}
            onPress={() => navigation.navigate('YourTrip')}
          >
            <LinearGradient colors={['#2196F3', '#64B5F6']} style={styles.cardBackground}>
              <View style={styles.cardIcon}>
                <Icon name="car-outline" size={30} color="#fff" />
              </View>
              <View>
                <Text style={styles.cardText}>Plan Your Ride</Text>
                <Text style={styles.cardSubtitle}>Manage your upcoming trips</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.cardWithShadow]}
            onPress={() => navigation.navigate('YourReserved')}
          >
            <LinearGradient colors={['#2196F3', '#64B5F6']} style={styles.cardBackground}>
              <View style={styles.cardIcon}>
                <Icon name="lock-closed-outline" size={30} color="#fff" />
              </View>
              <View>
                <Text style={styles.cardText}>Reserved Rides</Text>
                <Text style={styles.cardSubtitle}>View reserved trips</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>PAST RIDES</Text>
        <TouchableOpacity style={[styles.historyCard, styles.cardWithShadow]} onPress={openSlide}>
          <Image style={styles.historyImage} source={require('../../../assets/images/icons/auto.png')} />
          <View style={styles.historyDetails}>
            <Text style={styles.historyTitle}>KPHB</Text>
            <Text style={styles.historyInfo}>Jan 8, 2025, 10:30 AM</Text>
            <Text style={styles.historyPrice}>₹220.00</Text>
          </View>
          <TouchableOpacity style={styles.rebookButton} onPress={() => navigation.navigate('RebookScreen')}>
            <Icon name="refresh-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>

  
      {isVisible && tripDetails && (
        <Animated.View style={[styles.bottomSheet, { top: slideAnim }]}>
          <View style={styles.bottomHeader}>
            <Text style={styles.bottomTitle}>Trip Details</Text>
            <TouchableOpacity onPress={closeSlide}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.grayBox}></View>
          <View style={styles.bottomContainer}>

          <Text style={styles.rideType}>{tripDetails.rideType}</Text>

          <View style={styles.row}>
            <Text style={styles.dateTimeText}>{tripDetails.date}</Text>
            <Text style={styles.dateTimeText}>{tripDetails.time}</Text>
          </View>

    
          <Text style={styles.totalFare}>Total Fare: {tripDetails.totalFare}</Text>

        
          <View style={styles.infoRow}>
            <Text style={styles.pickupLabel}>Pickup Point:</Text>
            <Text style={styles.location}>{tripDetails.pickupPoint}</Text>
            <Text style={styles.pickupTime}>{tripDetails.pickupTime}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.destinationLabel}>Destination:</Text>
            <Text style={styles.location}>{tripDetails.destination}</Text>
            <Text style={styles.dropoffTime}>{tripDetails.dropoffTime}</Text>
          </View>
          </View>
        </Animated.View>
      )}
    </LinearGradient>
  ); 
};

export default Activity;


const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
  header: {
    margin: 0,
    paddingLeft: 20,
    flexDirection: 'row',
    paddingVertical: 20,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 26,
    top: -3,
    left: 5,
    fontWeight: '700',
    color: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D47A1',
    marginVertical: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    borderRadius: 15,
    marginRight: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
  },
  cardWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  historyImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  historyDetails: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D47A1',
  },
  historyInfo: {
    fontSize: 14,
    color: '#757575',
  },
  historyPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D47A1',
  },
  rebookButton: {
    backgroundColor: '#0D47A1',
    padding: 10,
    borderRadius: 50,
    elevation: 3,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height * 0.35,
    backgroundColor: '#1976D2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 20,
  },
  bottomTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  grayBox: {
    backgroundColor: '#B0BEC5',
    height: 200,
    borderRadius: 10,
    top:-40,
    margin: 20,
  },
  bottomContainer:{
    top:-53,
     backgroundColor:'white',
     height:height * 0.6,
     padding:20,
     
  },
  rideType: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#000',
  },
  totalFare: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginVertical: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'center',
  },
  pickupLabel: {
    fontSize: 16,
    color: 'green',
    fontWeight: '600',
  },
  destinationLabel: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
  },
  location: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    marginLeft: 5,
  },
  pickupTime: {
    fontSize: 16,
    color: '#000',
  },
  dropoffTime: {
    fontSize: 16,
    color: '#000',
  },
});
