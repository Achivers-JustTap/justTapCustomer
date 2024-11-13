import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Rentals = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <FontAwesome name="arrow-left" size={24} color="white" />
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
});

export default Rentals;
