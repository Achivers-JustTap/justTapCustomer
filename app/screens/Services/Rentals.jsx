import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
  View,
  TextInput,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const Rentals = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState('oneWay');
  const [timeNeeded, setTimeNeeded] = useState(1);
  const [charge, setCharge] = useState(200);
  const [isLaterClicked, setIsLaterClicked] = useState(false);
  const [isPickupTimeSet, setIsPickupTimeSet] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const currentDate = new Date();
  const [selectedDateObj, setSelectedDateObj] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(moment(currentDate).format('MMMM Do YYYY'));
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(moment(currentDate).format('dddd'));
  const [selectedTime, setSelectedTime] = useState(moment(currentDate).format('hh:mm A'));

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      setShowOverlay(false);
      const timer = setTimeout(() => setShowOverlay(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isFocused]);

  useEffect(() => {
    setCharge(200 * timeNeeded);
  }, [timeNeeded]);

  const handleIncreaseTime = () => {
    setTimeNeeded(prev => prev + 0.5);
  };

  const handleDecreaseTime = () => {
    setTimeNeeded(prev => (prev > 1 ? prev - 0.5 : prev));
  };

  const handleTakeRide = () => {
    // Ride booking logic here
  };

  const handleLater = () => {
    setIsLaterClicked(true);
  };

  const handleChooseVehicle = () => {
    navigation.navigate('EnterLocation');
  };

  const handleBack = () => {
    if (isLaterClicked) {
      setIsLaterClicked(false);
    } else {
      navigation.goBack();
    }
  };

  const handleSetPickup = () => {
    setIsPickupTimeSet(true);
    setIsLaterClicked(false);
  };

  const handleDateChange = (event, date) => {
    if (event.type === 'set' && date) {
      setSelectedDateObj(date);
      setSelectedDate(moment(date).format('MMMM Do YYYY'));
      setSelectedDayOfWeek(moment(date).format('dddd'));
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, date) => {
    if (event.type === 'set' && date) {
      setSelectedTime(moment(date).format('hh:mm A'));
    }
    setShowTimePicker(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <ImageBackground
        source={require('../../../assets/images/rentals.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        {showOverlay && !isLaterClicked && (
          <LinearGradient
            colors={['rgba(185, 206, 233, 0.48)', 'rgba(177, 167, 130, 0.48)']}
            style={styles.overlay}
          >
            <Text style={styles.timeSettingText}>
              <Text style={styles.justTapText}>JUST TAP! </Text>to set the time you need
            </Text>

            <View style={styles.centerContent}>
              <View style={styles.timeContainer}>
                <TouchableOpacity style={styles.adjustButton} onPress={handleDecreaseTime}>
                  <Text style={styles.adjustButtonText}>−</Text>
                </TouchableOpacity>
                <View style={styles.timeBox}>
                  <Text style={styles.timeText}>{timeNeeded} hour</Text>
                </View>
                <TouchableOpacity style={styles.adjustButton} onPress={handleIncreaseTime}>
                  <Text style={styles.adjustButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.chargeContainer}>
                <View style={styles.chargeRow}>
                  <Text style={styles.startsFromText}>Starts from </Text>
                  <Text style={styles.chargeText}>₹{charge.toFixed(2)}</Text>
                </View>
                <Text style={styles.perHourText}>₹200.00/hour</Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.blueButton} onPress={handleTakeRide}>
                  <Text style={styles.buttonText}>Take Ride</Text>
                </TouchableOpacity>

                {isPickupTimeSet ? (
                  <TouchableOpacity style={styles.setButton} onPress={handleLater}>
                    <Text style={styles.pickupDetails}>
                      Pickup on {selectedDayOfWeek},{'\n'}
                      {selectedDate}{'\n'} at {selectedTime}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.blueButton} onPress={handleLater}>
                    <Text style={styles.buttonText}>Later</Text>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity style={styles.chooseVehicleButton} onPress={handleChooseVehicle}>
                <Text style={styles.chooseVehicleText}>Choose Vehicle For Trip</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}

        {isLaterClicked && (
          <LinearGradient
            colors={['rgba(185, 206, 233, 0.48)', 'rgba(177, 167, 130, 0.48)']}
            style={styles.overlay}
          >
            <Text style={styles.laterText}>When do you want to get picked up?</Text>

            <View style={styles.whiteBox}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.whiteBoxText}>📅 {selectedDate}</Text>
              </TouchableOpacity>
              <Text style={styles.whiteBoxText}>{selectedDayOfWeek}</Text>
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text style={styles.whiteBoxText}>⏰ {selectedTime}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.blueButton} onPress={handleSetPickup}>
                <Text style={styles.buttonText}>Set Pick Up Date & Time</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}
      </ImageBackground>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDateObj}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={selectedDateObj}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width,
    height,
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
    marginTop: height * 0.04,
  },
  timeSettingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F4A97',
    position: 'absolute',
    top: 20,
  },
  justTapText: {
    fontSize: 25,
    color: '#0F4A97',
    fontWeight: 'bold',
  },
  laterText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F4A97',
    position: 'absolute',
    top: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adjustButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F4A97',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  adjustButtonText: {
    color: 'white',
    fontSize: 24,
  },
  timeBox: {
    width: 80,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0F4A97',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: 'white',
    fontSize: 18,
  },
  chargeContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  chargeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startsFromText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  chargeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F4A97',
    marginLeft: 10,
  },
  perHourText: {
    fontSize: 16,
    color: 'grey',
    marginTop: 5,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  blueButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    minWidth: 140,
    alignItems: 'center',
  },
  setButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    minWidth: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  pickupDetails: {
    color: 'white',
    textAlign: 'center',
  },
  chooseVehicleButton: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  chooseVehicleText: {
    color: '#0F4A97',
    fontSize: 18,
  },
  whiteBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
  },
  whiteBoxText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
});

export default Rentals;
