import {
  StyleSheet, SafeAreaView, View, Text, TextInput,
  TouchableOpacity, Alert, FlatList
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { UserLocationContext } from '../../../Context/UserLocationContext';

const API_URL = 'http://192.168.29.13:5000/api/maps/get-suggestions?input=';

const AddHomePage = ({ route, navigation }) => {
  const { location, setLocation } = useContext(UserLocationContext);
  const [currentLocationText, setCurrentLocationText] = useState('');
  const [homeAddress, setHomeAddress] = useState(''); // Corrected the name here
  const [suggestions, setSuggestions] = useState([]);
  const [confirmedHomeAddress, setConfirmedHomeAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const { currentLocation } = route.params || {};

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

  const handleSuggestionPress = (suggestion) => {
    setHomeAddress(suggestion);
    setSuggestions([]);
  };

  const handleConfirm = async () => {
    if (!homeAddress.trim()) {
      Alert.alert('Please enter location');
      return;
    }

    const dropoff = await getCoordinates(homeAddress);

    if (dropoff) {
      setConfirmedHomeAddress(dropoff);
    }
  };
  const handleSave = () => {
    if (confirmedHomeAddress) {
      navigation.goBack({
        confirmedHomeAddress, 
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
       <View style={styles.inputRow}>
       <Icon name="home" size={30} color="#0f4a97" marginRight={5} style={styles.pinIcon} />
        <View style={[styles.inputWrapper, { marginTop: 5 }]}>
        
          <TextInput
            style={styles.input}
            placeholder="Add Home Address"
            placeholderTextColor="white"
            value={homeAddress}
            onChangeText={(text) => {
              setHomeAddress(text); // Use the correct setter function
              fetchSuggestions(text, setSuggestions);
            }}
          />
          {homeAddress !== '' && (
            <TouchableOpacity onPress={() => setHomeAddress('')} style={styles.clearButton}>
              <Icon name="close-circle" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
        </View>

        {confirmedHomeAddress && (
          <View style={styles.confirmedLocations}>
            <Text style={styles.locationText}>Home Location: {confirmedHomeAddress.name}</Text>
          </View>
        )}
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

      <TouchableOpacity
        onPress={confirmedHomeAddress ? handleSave : handleConfirm}
        style={styles.confirmButton}
      >
        <Text style={styles.confirmButtonText}>
          {confirmedHomeAddress ? 'Save' : 'Confirm'}
        </Text>
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
  clearButton: {
    padding: 5,
  },
  suggestionsList: {
    width: 300,
    maxHeight: 300,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  suggestionText: {
    color: '#333',
  },
  confirmedLocations: {
    marginTop: 20,
    alignItems: 'center',
    borderColor: "#0f4a97",
    borderRadius: 10,
    borderWidth: 2
  },
  locationText: {
    fontWeight: 'bold',
    padding: 20,
    fontSize: 16,
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

export default AddHomePage;
