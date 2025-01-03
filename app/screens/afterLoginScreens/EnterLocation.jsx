// Import necessary modules
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const EnterLocation = ({ navigation }) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isPickupFocused, setIsPickupFocused] = useState(true);

  const handleInputChange = async (input) => {
    try {
      const response = await axios.get(`http://192.168.0.105:5000/api/maps/get-suggestions?input=${input}`);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSelectSuggestion = (address) => {
    if (isPickupFocused) {
      setPickup(address);
    } else {
      setDestination(address);
    }
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleConfirm = async () => {
    try {
      const pickupResponse = await axios.get(`http://192.168.0.105:5000/api/maps/get-coordinates?address=${pickup}`);
      const destinationResponse = await axios.get(`http://192.168.0.105:5000/api/maps/get-coordinates?address=${destination}`);

      const coordinates = {
        pickupCoordinates: pickupResponse.data.coordinates,
        destinationCoordinates: destinationResponse.data.coordinates,
      };

      navigation.navigate('LocationMapScreen', { coordinates });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter pickup location"
        value={pickup}
        onFocus={() => setIsPickupFocused(true)}
        onChangeText={(text) => {
          setPickup(text);
          handleInputChange(text);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter destination"
        value={destination}
        onFocus={() => setIsPickupFocused(false)}
        onChangeText={(text) => {
          setDestination(text);
          handleInputChange(text);
        }}
      />

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
              <Text style={styles.suggestion}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Button title="Confirm" onPress={handleConfirm} color="#0F4A97" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
});

export default EnterLocation;
