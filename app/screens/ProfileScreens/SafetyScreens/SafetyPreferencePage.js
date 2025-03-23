import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, Dimensions, View, ImageBackground } from 'react-native';
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
    setSelectedPreference(''); 
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Safety Preferences',
    });
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

  return (
    <SafeAreaView style={styles.container}>
        
        <ImageBackground
              source={require('../../../../assets/images/otherImages/SafetyPreferenceBG.jpeg')}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}
            >
      {showOverlay && (
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.7)']}
          style={styles.overlay}
        >
          <View style={styles.Maincontainer}>
          <Text style={styles.description}>
          Your Safety Our First Priority. Below You can Trun On safety Preference</Text>
           

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedPreference === 'Drop-Off Check' && styles.selectedButton,
                ]}
                onPress={() => handleSelectPreference('Drop-Off Check')}
              >

                <Text
                  style={[
                    styles.buttonText,
                    selectedPreference === 'Drop-Off Check' && styles.selectedButtonText,
                  ]}
                >
                  Drop-Off Check
                </Text>
                <Text style={styles.buttonDescription}>We check on you immediately, if the ride ends early.</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  selectedPreference === 'Audio Recording' && styles.selectedButton,
                ]}
                onPress={() => handleSelectPreference('Audio Recording')}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedPreference === 'Audio Recording' && styles.selectedButtonText,
                  ]}
                >
                  Audio Recording
                </Text>
                <Text style={styles.buttonDescription}>We record audio during the ride for your safety.</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  selectedPreference === 'Trip Info Sharing' && styles.selectedButton,
                ]}
                onPress={() => handleSelectPreference('Trip Info Sharing')}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedPreference === 'Trip Info Sharing' && styles.selectedButtonText,
                  ]}
                >
                  Trip Info Sharing
                </Text>
                <Text style={styles.buttonDescription}>We share your trip info with your trusted contacts.</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.selectedPreference}>
              Selected Preference: {selectedPreference || 'None'}
            </Text>

            {/* Reset Button */}
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={handleResetPreferences}
            >
              <Text style={styles.buttonText}>Reset Preferences</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  description: {
    fontSize: 20,
    fontWeight:'bold',
    padding: 10,
    marginTop: -10,
    textAlign: 'center',
    color: '#0f4a97',
  },
  backgroundImage: {
    width: 450,
    height: 730,
    right: 35,
    marginTop:-10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: width * 0.94,
    height: height * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    left: 35,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  Maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
 
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#dae7f8',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#0F4A97',
    color: '#fff',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  buttonDescription:{
   fontWeight:'bold',
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
    backgroundColor: '#FF8C00', 
    marginTop: 20, 
  },
});

export default CommunicationPage;
