import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, ImageBackground, Dimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Rentals = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState('oneWay');
  const [timeNeeded, setTimeNeeded] = useState(1);
  const [charge, setCharge] = useState(200); 
  const [isLaterClicked, setIsLaterClicked] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const currentDate = new Date();
  const formattedDate = moment(currentDate).format('MMMM Do YYYY');
  const dayOfWeek = moment(currentDate).format('dddd');
  const currentTime = moment(currentDate).format('hh:mm A');


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [selectedTime, setSelectedTime] = useState(currentTime);
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(dayOfWeek);
  const [isPickupTimeSet,setIsPickupTimeSet] = useState(false);

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


  const handleIncreaseTime = () => {
    setTimeNeeded(prevTime => prevTime + 0.5);
    setCharge(prevTime => (timeNeeded >= 1 ? prevTime + 100 : 200));  
  };


  const handleDecreaseTime = () => {
    setTimeNeeded(prevTime => (prevTime > 1 ? prevTime - 0.5 : prevTime));
    setCharge(prevTime => (timeNeeded > 1.5 ? prevTime - 100 : 200));  
  };

  const handleTakeRide = () => {
 
  };

  const handleLater = () => {
    setIsLaterClicked(true);
  };

  const handleChooseVehicle = () => {
   navigation.navigate('EnterLocation')
  };

  const handleBack = () => {
    if (isLaterClicked) {
      setIsLaterClicked(false);
    } else {
      navigation.goBack();
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(moment(date).format('MMMM Do YYYY'));
    setSelectedDayOfWeek(moment(date).format('dddd'));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    setSelectedTime(moment(time).format('hh:mm A'));
    hideTimePicker();
  };
   
  const handleSetPickup =() =>{
    setIsPickupTimeSet(true);
    setIsLaterClicked(false);
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
                  <TouchableOpacity style={styles.setButton} onPress={handleLater} >
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
            <Text style={styles.laterText}>
              When do you want to get picked up?
            </Text>
            
            <View style={styles.whiteBox}>
              <TouchableOpacity style={styles.whiteBox} onPress={showDatePicker}>
                <Text style={styles.whiteBoxText}>{selectedDate}</Text>
              </TouchableOpacity>
              <Text style={styles.whiteBoxText}>{selectedDayOfWeek}</Text>
              <TouchableOpacity style={styles.whiteBox} onPress={showTimePicker}>
                <Text style={styles.whiteBoxText}>{selectedTime}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.blueButton} onPress={handleSetPickup}>
                <Text style={styles.buttonText}>Set Pick Up Date&Time</Text>
              </TouchableOpacity>
      
            </View>
          </LinearGradient>
        )}
      </ImageBackground>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
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
  timeSettingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F4A97',
    position: 'absolute', 
    top: 20, 
  },
  justTapText: {
    fontFamily: 'SofadiOne',
    fontSize: 25,
    color: '#0F4A97',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 4, 
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
    alignItems: 'flex-start',
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
    marginLeft:'37%',
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  setButton:{
   backgroundColor:'#0F4A97',
   padding: 10,
   width:150,
   borderRadius: 5,
   marginHorizontal: 10,
  },
  pickupDetails:{
    color: 'white'
  },
  blueButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    textAlign:'center',
    fontSize: 18,
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
    padding: 5,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteBoxText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    
  },
});

export default Rentals;
