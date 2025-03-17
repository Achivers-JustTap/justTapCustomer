import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, ImageBackground, Dimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const CommunicationPage = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [selectedPreference, setSelectedPreference] = useState('');

  const handleSelectPreference = (preference) => {
    setSelectedPreference(preference);
  };

  const handleResetPreferences = () => {
    setSelectedPreference(''); // Resets the selected preference
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Communication Preferences',
    });
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      setShowOverlay(false); // Initially hide the overlay

      const timer = setTimeout(() => {
        setShowOverlay(true); // Show overlay after 2 seconds
      }, 1000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Display Background Image */}
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('../../../../assets/images/otherImages/CommunicationBG2.jpeg')}
          style={styles.backgroundImage}
          imageStyle={styles.imageStyle}
        >
          {showOverlay && (
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.8)']}
              style={styles.overlay}
            >
              <View style={styles.Maincontainer}>
                <Text style={styles.description}>
                  Choose your preferred communication method for updates and support in the Just Tap!
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      selectedPreference === 'Chat and Call' && styles.selectedButton,
                    ]}
                    onPress={() => handleSelectPreference('Chat and Call')}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        selectedPreference === 'Chat and Call' && styles.selectedButtonText,
                      ]}
                    >
                      Chat and Call
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      selectedPreference === 'Call' && styles.selectedButton,
                    ]}
                    onPress={() => handleSelectPreference('Call')}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        selectedPreference === 'Call' && styles.selectedButtonText,
                      ]}
                    >
                      Call
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      selectedPreference === 'Chat' && styles.selectedButton,
                    ]}
                    onPress={() => handleSelectPreference('Chat')}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        selectedPreference === 'Chat' && styles.selectedButtonText,
                      ]}
                    >
                      Chat
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.selectedPreference}>
                  Selected Preference: {selectedPreference || 'None'}
                </Text>

                {/* Reset Button */}
                <TouchableOpacity
                  style={[styles.resetbutton, styles.resetButton]}
                  onPress={handleResetPreferences}
                >
                  <Text style={styles.buttonText}>Reset Preferences</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          )}
        </ImageBackground>
      </View>
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
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    width: width * 0.94,
    height: height * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  Maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60%'
  },
  description: {
    fontSize: 20,
    fontWeight:'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    borderWidth: 2,
    borderColor: '#0F4A97',
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#0F4A97',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedButtonText: {
    color: '#fff',
  },
  selectedPreference: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#0F4A97',
    padding: 20,
    borderRadius: 15,
  },
  resetButton: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FF8C00',
    marginTop: 20, 
  },
});

export default CommunicationPage;
