import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const API_URL = 'http://192.168.193.170:5000/api/maps/get-suggestions?input=';

const ShortcutsPage = ({ navigation, route }) => {
  const [showNewPlaceForm, setShowNewPlaceForm] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [placeAddress, setPlaceAddress] = useState('');
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [confirmedHomeAddress, setConfirmedHomeAddress] = useState('');
  const [confirmedWorkAddress, setConfirmedWorkAddress] = useState('');

  // Fetch homeAddress and workAddress if passed from previous screen
  useEffect(() => {
    if (route.params?.confirmedHomeAddress) {
      setConfirmedHomeAddress(route.params.confirmedHomeAddress);
    }
  }, [route.params]);
  useEffect(() => {
    if (route.params?.confirmedWorkAddress) {
      setConfirmedHomeAddress(route.params.confirmedWorkAddress);
    }
  }, [route.params]);
  
  console.log(confirmedHomeAddress);
  console.log(confirmedWorkAddress);

  // Fetch suggestions when the user types in the address input
  const fetchSuggestions = async (input) => {
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
      Alert.alert('Error fetching suggestions', error.message || 'An unknown error occurred.');
    }
  };

  const handleSavePlace = () => {
    if (placeName.trim() && placeAddress.trim()) {
      setSavedPlaces([...savedPlaces, { name: placeName, address: placeAddress }]);
      setPlaceName('');
      setPlaceAddress('');
      setSuggestions([]);
      setShowNewPlaceForm(false); // Hide form after saving
    } else {
      Alert.alert('Please enter both name and address');
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setPlaceAddress(suggestion);
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shortcuts</Text>

      <View style={styles.shortcuts}>
        <TouchableOpacity style={styles.shortcutItem} onPress={() => navigation.navigate('AddHomePage')}>
          <Icon name="home" size={24} color="black" />
          <Text style={styles.shortcutText}>Home</Text>
        </TouchableOpacity>

        {confirmedHomeAddress && (
          <View style={styles.savedPlaceItem}>
            <Text style={styles.savedPlaceName}>{confirmedHomeAddress.name}</Text> 
          </View>
        )}

        <TouchableOpacity style={styles.shortcutItem} onPress={() => navigation.navigate('AddWorkPage')}>
          <Icon name="briefcase" size={24} color="black" />
          <Text style={styles.shortcutText}>Work</Text>
        </TouchableOpacity>

        {confirmedWorkAddress && (
          <View style={styles.savedPlaceItem}>
            <Text style={styles.savedPlaceName}>{confirmedWorkAddress.name}</Text>
          </View>
        )}
      </View>

      {showNewPlaceForm ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Place Name"
            value={placeName}
            onChangeText={setPlaceName}
          />
          <TextInput
            style={styles.input}
            placeholder="Search Address"
            value={placeAddress}
            onChangeText={(text) => {
              setPlaceAddress(text);
              fetchSuggestions(text);
            }}
          />

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
          <TouchableOpacity onPress={handleSavePlace} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setShowNewPlaceForm(true)} style={styles.newPlaceButton}>
          <Text style={styles.newPlaceText}>+ New Place</Text>
        </TouchableOpacity>
      )}

      {/* Display saved places */}
      <View style={styles.savedPlaces}>
        {savedPlaces.length > 0 ? (
          savedPlaces.map((place, index) => (
            <View key={index} style={styles.savedPlaceItem}>
              <Icon name="star" size={20} color="#FFD700" style={styles.starIcon} />
              <View>
                <Text style={styles.savedPlaceName}>{place.name}</Text>
                <Text style={styles.savedPlaceAddress}>{place.address}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.savedPlaceName}>No saved places yet.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  shortcuts: {
    marginBottom: 20,
  },
  shortcutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  shortcutText: {
    fontSize: 18,
    marginLeft: 10,
  },
  savedPlaceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  savedPlaceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  savedPlaceAddress: {
    fontSize: 14,
    color: '#555',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  suggestionsList: {
    maxHeight: 150,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
  },
  suggestionText: {
    fontSize: 16,
  },
  newPlaceButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  newPlaceText: {
    color: 'white',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  savedPlaces: {
    marginTop: 20,
  },
  starIcon: {
    marginRight: 10,
  },
});

export default ShortcutsPage;
