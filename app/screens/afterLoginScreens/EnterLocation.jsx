import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location'; 
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const EnterLocation = ({ route, navigation }) => {
    const { currentLocation } = route.params;
    const [currentLocationText, setCurrentLocationText] = useState(currentLocation);
    const [destination, setDestination] = useState('');
    const [currentLocationCoords, setCurrentLocationCoords] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const getCurrentLocationCoordinates = async (locationInput) => {
        try {
            const searchResults = await Location.geocodeAsync(locationInput);
            if (searchResults.length === 0) {
                Alert.alert('Current location not found');
                return null;
            }
            return searchResults[0]; 
        } catch (error) {
            Alert.alert('Error fetching current location');
            return null;
        }
    };

    const getDestinationCoordinates = async (destination) => {
        try {
            const searchResults = await Location.geocodeAsync(destination);
            if (searchResults.length === 0) {
                Alert.alert('Location not found');
                return null;
            }
            return searchResults[0]; 
        } catch (error) {
            Alert.alert('Error fetching location');
            return null;
        }
    };

    const fetchSuggestions = async (input) => {
        if (input.trim() === '') {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`http://192.168.0.108:5000/api/maps/get-suggestions?input=${input}`);
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

    const handleConfirm = async () => {
        if (currentLocationText.trim() === '') {
            Alert.alert('Please enter a current location');
            return;
        }
    
        const locationCoords = await getCurrentLocationCoordinates(currentLocationText);
        if (!locationCoords) return; 
    
        setCurrentLocationCoords(locationCoords);
        
        if (destination.trim() === '') {
            Alert.alert('Please enter a destination');
            return;
        }
    
        const destinationCoords = await getDestinationCoordinates(destination);
        if (destinationCoords) {
            navigation.navigate('LocationMapScreen', {
                currentLocationCoords: { latitude: locationCoords.latitude, longitude: locationCoords.longitude },
                destinationCoords: { latitude: destinationCoords.latitude, longitude: destinationCoords.longitude },
                destination: destination,
                currentLocationText: currentLocationText,
                destinationText: destination,
            });
        }
    };

    const handleSuggestionPress = (suggestion) => {
        setDestination(suggestion); // Set the selected suggestion as the destination
        setSuggestions([]); // Clear suggestions
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.searchBackground}>
                    <TextInput
                        style={styles.currentLocation}
                        placeholder="Your Source Location"
                        placeholderTextColor="white"
                        value={currentLocationText}
                        onChangeText={setCurrentLocationText}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.searchBackground, { marginTop: 5 }]}>
                    <TextInput
                        style={styles.destination}
                        placeholder="Enter Destination"
                        placeholderTextColor="white"
                        value={destination}
                        onChangeText={(text) => {
                            setDestination(text);
                            fetchSuggestions(text); // Fetch suggestions on input change
                        }}
                    />
                </TouchableOpacity>

                {/* Suggestions List */}
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
    searchBackground: {
        backgroundColor: 'white',
        borderColor: '#0F4A97',
        borderWidth: 3,
        borderRadius: 25,
        height: 45,
        width: 300,
        zIndex: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0, 
    },
    currentLocation: {
        height: 35,
        width: 290,
        borderColor: '#0F4A97',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#0F4A97',
        paddingHorizontal: 5,
        color: 'white',
    },
    destination: {
        height: 35,
        width: 290,
        borderColor: '#0F4A97',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#0F4A97',
        paddingHorizontal: 5,
        color: 'white',
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
});

export default EnterLocation;
