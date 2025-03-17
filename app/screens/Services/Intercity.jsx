import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, ImageBackground, Dimensions, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import DateTimePicker from '@react-native-community/datetimepicker'; // Commented out DateTimePicker import

const Intercity = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState('oneWay');
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [dropoffDate, setDropoffDate] = useState(new Date());
  const [dropoffTime, setDropoffTime] = useState(new Date());

  const [prevSelectedTrip, setPrevSelectedTrip] = useState('oneWay');
  const [prevPickupDate, setPrevPickupDate] = useState(new Date());
  const [prevPickupTime, setPrevPickupTime] = useState(new Date());
  const [prevDropoffDate, setPrevDropoffDate] = useState(new Date());
  const [prevDropoffTime, setPrevDropoffTime] = useState(new Date());
  
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showPickupTimePicker, setShowPickupTimePicker] = useState(false);
  const [showDropoffDatePicker, setShowDropoffDatePicker] = useState(false);
  const [showDropoffTimePicker, setShowDropoffTimePicker] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      setShowOverlay(false);

      const timer = setTimeout(() => {
        setShowOverlay(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isFocused]);

  const handleTripSelection = (trip) => {
    setPrevSelectedTrip(selectedTrip);
    setPrevPickupDate(pickupDate);
    setPrevPickupTime(pickupTime);
    setPrevDropoffDate(dropoffDate);
    setPrevDropoffTime(dropoffTime);
    
    setSelectedTrip(trip);
  };

  const handlePlanTrip = () => {
    navigation.navigate('EnterLocation');
  };

  const handleBackPress = () => {
    if (
      selectedTrip !== prevSelectedTrip ||
      pickupDate !== prevPickupDate ||
      pickupTime !== prevPickupTime ||
      dropoffDate !== prevDropoffDate ||
      dropoffTime !== prevDropoffTime
    ) {
      setSelectedTrip(prevSelectedTrip);
      setPickupDate(prevPickupDate);
      setPickupTime(prevPickupTime);
      setDropoffDate(prevDropoffDate);
      setDropoffTime(prevDropoffTime);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      
      <ImageBackground 
        source={require('../../../assets/images/intercity.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle} 
      >
        {showOverlay && (
          <LinearGradient
            colors={['rgba(213, 227, 211, 0.55)', 'rgba(150, 154, 150, 0.55)']} 
            style={styles.overlay}
          >
            <View style={styles.tripOptionsContainer}>
              <TouchableOpacity 
                style={[styles.tripOption, selectedTrip === 'oneWay' && styles.selectedOption]} 
                onPress={() => handleTripSelection('oneWay')}
              >
                <Text style={styles.tripOptionText}>One Way</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tripOption, selectedTrip === 'roundTrip' && styles.selectedOption]} 
                onPress={() => handleTripSelection('roundTrip')}
              >
                <Text style={styles.tripOptionText}>Round Trip</Text>
              </TouchableOpacity>
              <View style={[styles.indicator, { left: selectedTrip === 'oneWay' ? 0 : '50%' }]} />
            </View>

            {/* One Way Input Fields */}
            {selectedTrip === 'oneWay' && (
              <View style={styles.oneWayContainer}>
                <TouchableOpacity style={styles.timeDateBox} onPress={() => setShowPickupDatePicker(true)}>
                  <Text style={styles.label}>Pick Up Date</Text>
                  <Text>{pickupDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {/* <DateTimePicker
                  value={pickupDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowPickupDatePicker(false);
                    if (selectedDate) {
                      setPickupDate(selectedDate);
                    }
                  }}
                /> */}

                <TouchableOpacity style={styles.timeDateBox} onPress={() => setShowPickupTimePicker(true)}>
                  <Text style={styles.label}>Pick Up Time</Text>
                  <Text>{pickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>
                {/* <DateTimePicker
                  value={pickupTime}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowPickupTimePicker(false);
                    if (selectedTime) {
                      setPickupTime(selectedTime);
                    }
                  }}
                /> */}

                {/* Replaced DateTimePicker with TextInput for Date */}
               

              </View>
            )}

            {/* Round Trip Input Fields */}
            {selectedTrip === 'roundTrip' && (
              <View style={styles.roundTripContainer}>
                <View style={styles.timeDateRow}>
                  <TouchableOpacity style={styles.timeDateBox} onPress={() => setShowPickupDatePicker(true)}>
                    <Text style={styles.label}>Pick Up Date</Text>
                    <Text>{pickupDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {/* <DateTimePicker
                    value={pickupDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowPickupDatePicker(false);
                      if (selectedDate) {
                        setPickupDate(selectedDate);
                      }
                    }}
                  /> */}
                  {/* Replaced DateTimePicker with TextInput for Date */}
                

                  <TouchableOpacity style={styles.timeDateBox} onPress={() => setShowPickupTimePicker(true)}>
                    <Text style={styles.label}>Pick Up Time</Text>
                    <Text>{pickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  </TouchableOpacity>
                  {/* <DateTimePicker
                    value={pickupTime}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                      setShowPickupTimePicker(false);
                      if (selectedTime) {
                        setPickupTime(selectedTime);
                      }
                    }}
                  /> */}
                
                </View>

                <View style={styles.timeDateRow}>
                  <TouchableOpacity style={styles.timeDateBox} onPress={() => setShowDropoffDatePicker(true)}>
                    <Text style={styles.label}>Drop Off Date</Text>
                    <Text>{dropoffDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {/* <DateTimePicker
                    value={dropoffDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDropoffDatePicker(false);
                      if (selectedDate) {
                        setDropoffDate(selectedDate);
                      }
                    }}
                  /> */}
                 

                  <TouchableOpacity style={styles.timeDateBox} onPress={() => setShowDropoffTimePicker(true)}>
                    <Text style={styles.label}>Drop Off Time</Text>
                    <Text>{dropoffTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  </TouchableOpacity>
                  {/* <DateTimePicker
                    value={dropoffTime}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                      setShowDropoffTimePicker(false);
                      if (selectedTime) {
                        setDropoffTime(selectedTime);
                      }
                    }}
                  /> */}
                 
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.planButton} onPress={handlePlanTrip}>
              <Text style={styles.planButtonText}>Plan Your Trip... Pack Your Bags</Text>
            </TouchableOpacity>
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
    backgroundColor: 'white',
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
  backgroundImage: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'stretch',
  },
  overlay: {
    width: width * 0.94, 
    height: height * 0.9, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20, 
    alignSelf: 'center',
    marginTop: height * 0.04,
    position: 'relative',
  },
  tripOptionsContainer: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, 
    position: 'relative',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  tripOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  selectedOption: {
    borderRadius: 10,
  },
  tripOptionText: {
    color: '#0F4A97',
    fontWeight:'500'
  },
  indicator: {
    position: 'absolute',
    marginLeft:5,
    bottom: 5,
    width: '50%', 
    height: '100%',
    backgroundColor: 'rgba(15, 74, 151, 0.5)', 
    borderColor: '#0F4A97', 
    borderWidth: 2, 
    borderRadius: 10, 
  },
  oneWayContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  roundTripContainer: {
    width: '90%',
    marginTop: 20,
  },
  timeDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  timeDateBox: {
    width: '48%', 
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight:'500',
    color: '#0F4A97',
  },
  planButton: {
    width: '90%',
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  planButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Intercity;
