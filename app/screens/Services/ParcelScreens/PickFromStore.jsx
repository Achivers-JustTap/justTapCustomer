import {
    StyleSheet, SafeAreaView, View, Text, TextInput,
    TouchableOpacity, Alert, FlatList
  } from 'react-native';
  import React, { useContext, useEffect, useState } from 'react';
  import * as Location from 'expo-location';
  import Icon from 'react-native-vector-icons/Ionicons';
  import Entypo from 'react-native-vector-icons/Entypo';
  import axios from 'axios';
  import { UserLocationContext } from '../../../Context/UserLocationContext';
  
  const API_URL = 'http://192.168.29.13:5000/api/maps/get-suggestions?input=';
  
  const PickFromStore = ({ route, navigation }) => {
    const { location, setLocation } = useContext(UserLocationContext);
    const [currentLocationText, setCurrentLocationText] = useState('');
    const [destination, setDestination] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [currentLocationSuggestions, setCurrentLocationSuggestions] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
  
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
            navigation.navigate('ParcelDetailsPage', {
              fromPickFromStore: true,  // Pass this flag to indicate it's coming from ReceiveParcel
              currentLocationText,
              destination,
              pickupCoords: { latitude: pickup.latitude, longitude: pickup.longitude },
        dropoffCoords: { latitude: dropoff.latitude, longitude: dropoff.longitude },
        pickupName: pickup.name,
        dropoffName: dropoff.name,
               
            });
        }
    };
  
    const handleCurrentLocationClick = async () => {
        // This method will be called when user clicks to update current location
        const updatedLocation = await getLocation();
        if (updatedLocation) {
            setCurrentLocationText(updatedLocation);
        }
    };
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>
  
            <View style={styles.inputContainer}>
                {/* Sender Location Input */}
              
                   <View style={styles.inputRow}>
                        <Entypo name="shop" size={24} color="green" style={styles.pinIcon} />
                <View style={styles.inputWrapper} >
                    <TextInput
                        style={styles.input}
                        placeholder="Store Location"
                        placeholderTextColor="white"
                        value={destination}
                        onChangeText={(text) => {
                            setDestination(text);
                            fetchSuggestions(text, setSuggestions);
                        }}
                    />
                    
                </View>
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

                 <View style={styles.inputRow}>
                                <Icon name="location-sharp" size={24} color="red" style={styles.pinIcon} />
  
                {/* Receiver Location Input */}
                <View  style={[styles.inputWrapper, { marginTop: 5 }]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Receiver's Location"
                        placeholderTextColor="white"
                        value={currentLocationText}
                        onChangeText={(text) => {
                            setCurrentLocationText(text);
                            fetchSuggestions(text, setCurrentLocationSuggestions);
                        }}
                    />
                  
                    
                </View>
                </View>
  
                {/* Suggestion list for receiver location */}
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
            </View>
  
            {/* Confirm button */}
            <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        marginTop: 30,
        backgroundColor: 'white',
    },
    header: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 10,
    },
    backButton: {
        backgroundColor: '#0F4A97',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 40,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputWrapper: {
        backgroundColor: '#0F4A97',
        borderRadius: 20,
        width: 300,
        height: 40,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: 'white',
        paddingHorizontal: 10,
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
  });
  
  export default PickFromStore;
  