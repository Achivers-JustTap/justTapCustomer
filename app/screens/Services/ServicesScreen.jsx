import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, ImageBackground, Dimensions, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ServicesScreen = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();  
  
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

  const navigateToService = (service) => {
    navigation.navigate(service);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      
      <ImageBackground 
        source={require('../../../assets/images/service.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle} 
      >
        {showOverlay && (
          <LinearGradient
            colors={['rgba(246, 215, 215, 0.58)', 'rgba(202, 229, 231, 0.58)']} 
            style={styles.overlay}
          >
            {/* Intercity */}
            <View style={styles.boxContainer}>
              <TouchableOpacity style={styles.squareBox} onPress={() => navigateToService('Intercity')}>
                <Image style={styles.boxImage} source={require('../../../assets/images/icons/intercity.png')} />
              </TouchableOpacity>
              <Text style={styles.boxText}>Intercity</Text>
            </View>

            {/* Rentals */}
            <View style={styles.boxContainer}>
              <TouchableOpacity style={styles.squareBox} onPress={() => navigateToService('Rentals')}>
                <Image style={styles.boxImage} source={require('../../../assets/images/icons/rentals.png')} />
              </TouchableOpacity>
              <Text style={styles.boxText}>Rentals</Text>
            </View>

            {/* Parcels */}
            <View style={styles.boxContainer}>
              <TouchableOpacity style={styles.squareBox} onPress={() => navigateToService('Parcel')}>
                <Image style={styles.boxImage} source={require('../../../assets/images/icons/parcel.png')} />
              </TouchableOpacity>
              <Text style={styles.boxText}>Parcels</Text>
            </View>

            {/* Reserved */}
            <View style={styles.boxContainer}>
              <TouchableOpacity style={styles.squareBox} onPress={() => navigateToService('Reserved')}>
                <Image style={styles.boxImage} source={require('../../../assets/images/icons/reserved.png')} />
              </TouchableOpacity>
              <Text style={styles.boxText}>Reserve</Text>
            </View>

            {/* Ride */}
            <View style={styles.boxContainer}>
              <TouchableOpacity style={styles.squareBox} onPress={() => navigateToService('EnterLocation')}>
              <Image style={styles.boxImage} source={require('../../../assets/images/icons/ride.png')} />
              </TouchableOpacity>
              <Text style={styles.boxText}>Ride</Text>
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
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-around',
  },
  squareBox: {
    width: 100,  
    height: 100, 
    backgroundColor: '#0F4A97', 
    borderRadius: 10,
    justifyContent: 'center',  
    alignItems: 'center',      
  },
  boxImage: {
    width: 80, 
    height: 80, 
    backgroundColor: 'white', 
    borderRadius: 10, 
    marginBottom: 0.3, 
  },
  boxText: {
    color: '#0F4A97',
    fontSize:16,
    textShadowColor: 'grey',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5, 
  },
  
  boxContainer: {
    marginTop: 70,
    alignItems: 'center', 
    marginBottom: 20, 
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent', 
  },
});

export default ServicesScreen;
