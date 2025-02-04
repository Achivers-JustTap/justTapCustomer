import {
    StyleSheet, SafeAreaView, View, Text, TextInput,
    TouchableOpacity, Alert, FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const API_URL = 'http://192.168.0.107:5000/api/maps/get-suggestions?input=';

const EnterLocation = ({ route, navigation }) => {
    const { currentLocation } = route.params || {};
    const [currentLocationText, setCurrentLocationText] = useState(currentLocation || '');
    const [destination, setDestination] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [currentLocationSuggestions, setCurrentLocationSuggestions] = useState([]);

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const fetchSuggestions = async (input, setSuggestions) => {
        if (input.trim() === '') {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`${API_URL}${input}`);
            setSuggestions(response.data.slice(0, 5) || []);
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Your Pickup Location"
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

                <View style={[styles.inputWrapper, { marginTop: 5 }]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Destination"
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
});

export default EnterLocation;
