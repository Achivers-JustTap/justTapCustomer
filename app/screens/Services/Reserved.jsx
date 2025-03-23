import React, { useState, useEffect,useContext, } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text,View, ImageBackground, Dimensions, TextInput, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import * as Location from 'expo-location';
  import Icon from 'react-native-vector-icons/Ionicons';
  import axios from 'axios';
  import { UserLocationContext } from '../../Context/UserLocationContext';
  
  const API_URL = 'http://192.168.29.13:5000/api/maps/get-suggestions?input=';

const Rentals = ({route,navigation}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused();
  const { location, setLocation } = useContext(UserLocationContext);
    const [currentLocationText, setCurrentLocationText] = useState('');
    const [destination, setDestination] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [currentLocationSuggestions, setCurrentLocationSuggestions] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
     const { currentLocation } = route.params || {};

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
  
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
  
    useEffect(() => {
        const getLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
  
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location.coords);
  
                const { latitude, longitude } = location.coords;
                const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
  
                if (reverseGeocode.length > 0) {
                    const {
                        name,
                        street,
                        district,
                        city,
                        region,
                        postalCode,
                        country
                    } = reverseGeocode[0];
  
                    const detailedLocation = `${name ? name + ', ' : ''}${street ? street + ', ' : ''}${district ? district + ', ' : ''}${city ? city + ', ' : ''}${region ? region + ', ' : ''}${postalCode ? postalCode + ', ' : ''}${country}`;
  
                    setCurrentLocationText(detailedLocation);
                }
            } catch (error) {
                console.error(error);
                setErrorMsg('Error fetching location: ' + error.message);
            }
        };
  
        getLocation();
    }, []);
  
    const fetchSuggestions = async (input, setSuggestions) => {
        if (input.trim() === '') {
            setSuggestions([]);
            return;
        }
  
        try {
            const response = await axios.get(`${API_URL}${input}`);
            if (response.data && response.data.length > 0) {
                setSuggestions(response.data.slice(0, 5)); // Limit to 5 suggestions
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            Alert.alert('Error fetching suggestions');
        }
    };
  
    const getCoordinates = async (locationInput) => {
        try {
            const searchResults = await Location.geocodeAsync(locationInput);
            if (searchResults.length === 0) {
                Alert.alert('Location not found');
                return null;
            }
            return {
                latitude: searchResults[0].latitude,
                longitude: searchResults[0].longitude,
                name: locationInput
            };
        } catch (error) {
            Alert.alert('Error fetching location coordinates');
            return null;
        }
    };
  
    const handleSuggestionPress = (suggestion, isPickup = false) => {
        if (isPickup) {
            setCurrentLocationText(suggestion);
            setCurrentLocationSuggestions([]);
        } else {
            setDestination(suggestion);
            setSuggestions([]);
        }
    };
  
    const handleConfirm = async () => {
        if (!currentLocationText.trim() || !destination.trim()) {
            Alert.alert('Please enter both pickup and destination locations');
            return;
        }
        const pickup = await getCoordinates(currentLocationText);
        const dropoff = await getCoordinates(destination);

        if (pickup && dropoff) {
            navigation.navigate('LocationMapScreen', {
                pickupCoords: { latitude: pickup.latitude, longitude: pickup.longitude },
                dropoffCoords: { latitude: dropoff.latitude, longitude: dropoff.longitude },
                pickupName: pickup.name,
                dropoffName: dropoff.name
            });
        }
    };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  useEffect(() => {
    if (isFocused) {
      const timer = setTimeout(() => {
        setShowOverlay(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isFocused]);

  const handleBack = () => {
    navigation.goBack();
  };

    
  
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
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <FontAwesome name="arrow-left" size={24} color="white"  />
      </TouchableOpacity>

      <ImageBackground 
        source={require('../../../assets/images/reserved.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle} 
      >
        {showOverlay && (
          <LinearGradient
            colors={['rgba(172, 195, 225, 0.40)', 'rgba(224, 161, 161, 0.40)']} 
            style={styles.overlay}
          >
            <Text style={styles.heading}>
              <Text style={styles.justTapText}>JUST TAP! </Text>to set the time & date for Pick up and Drop off
            </Text>

            <View style={styles.Maincontainer}>
              
                        <View style={styles.inputContainer}>
                           
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Current Location"
                                    placeholderTextColor="white"
                                    value={currentLocationText}
                                    onChangeText={(text) => {
                                        setCurrentLocationText(text);
                                        fetchSuggestions(text, setCurrentLocationSuggestions);
                                    }}
                                />
                                {currentLocationText !== '' && (
                                    <TouchableOpacity onPress={() => setCurrentLocationText('')} style={styles.clearButton}>
                                        <Icon name="close-circle" size={20} color="white" />
                                    </TouchableOpacity>
                                )}
                            </View>
              
                            {/* Suggestion list for sender location */}
                            {currentLocationSuggestions.length > 0 && (
                                <FlatList
                                    data={currentLocationSuggestions}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleSuggestionPress(item, true)} style={styles.suggestionItem}>
                                            <Text style={styles.suggestionText}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                    style={styles.suggestionsList}
                                />
                            )}
              
                            {/* Receiver Location Input */}
                            <View style={[styles.inputWrapper, { marginTop: 5 }]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Destination"
                                    placeholderTextColor="white"
                                    value={destination}
                                    onChangeText={(text) => {
                                        setDestination(text);
                                        fetchSuggestions(text, setSuggestions);
                                    }}
                                />
                                {destination !== '' && (
                                    <TouchableOpacity onPress={() => setDestination('')} style={styles.clearButton}>
                                        <Icon name="close-circle" size={20} color="white" />
                                    </TouchableOpacity>
                                )}

                                
                            </View>
                            {suggestions.length > 0 && (
                                <FlatList
                                    data={suggestions}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.suggestionItem}>
                                            <Text style={styles.suggestionText}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                    style={styles.suggestionsList}
                                />
                            )}
                            <View style={styles.tripOptionsContainer}>
                                      <TouchableOpacity 
                                        style={[styles.tripOption, selectedTrip === 'oneWay' && styles.selectedOption]} 
                                        onPress={() => handleTripSelection('oneWay')}
                                      >
                                        <Text style={styles.tripOptionText}>Pick Up</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                        style={[styles.tripOption, selectedTrip === 'roundTrip' && styles.selectedOption]} 
                                        onPress={() => handleTripSelection('roundTrip')}
                                      >
                                        <Text style={styles.tripOptionText}>Drop Off</Text>
                                      </TouchableOpacity>
                                      <View style={[styles.indicator, { left: selectedTrip === 'oneWay' ? 0 : '50%' }]} />
                                    </View>
                        
                                  
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
              
                          
                        </View>

                        <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                            <Text style={styles.confirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
              
                       
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
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 35, 
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
    height: height * 0.94, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    borderRadius: 20, 
    alignSelf: 'center',
    marginTop: height * 0.1,
  },
  heading: {
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
  Maincontainer: {
    flex: 1,
    paddingTop: 50,
    marginTop: 30,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
    borderRadius: 20,
    width: 300,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'white',
    paddingHorizontal: 10,
  },
  clearButton: {
    padding: 5,
  },
  suggestionsList: {
    width: 300,
    maxHeight: 150,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  suggestionText: {
    color: '#333',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  changeLocationButton: {
    marginTop: 10,
    backgroundColor: '#0F4A97',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  changeLocationButtonText: {
    color: 'white',
    fontSize: 14,
  },
  tripOptionsContainer: {
    width: '90%',
    height: 50,
    marginTop: 30,
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

export default Rentals;
