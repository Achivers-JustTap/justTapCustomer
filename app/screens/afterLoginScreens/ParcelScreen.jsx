import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, ImageBackground, Dimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const ParcelScreen = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused(); 

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
        source={require('../../../assets/images/parcels.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle} 
      >
        {showOverlay && (
          <LinearGradient
            colors={['rgba(183, 206, 185, 0.61)', 'rgba(143,176,220,0.61)']} 
            style={styles.overlay}
          >
            <TouchableOpacity style={styles.button}>
              <View style={styles.iconAndText}>
                <Feather name="package" size={24} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Send Parcel</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <View style={styles.iconAndText}>
                <FontAwesome name="inbox" size={24} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Receive Parcel</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <View style={styles.iconAndText}>
                <Entypo name="shop" size={24} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Pick From Store</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window'); 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    marginTop: height * 0.04
  },
  button: {
    backgroundColor: '#0F4A97',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '70%',
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10, 
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ParcelScreen;
