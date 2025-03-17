
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, ImageBackground, Dimensions, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native';

const DriverRegistration = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Be a JustTap Earner',
  
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
        source={require('../../../assets/images/BeADriverBG.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        {showOverlay && (
          <LinearGradient
            colors={['rgba(215,208,180,0.80)', 'rgba(110,161,227,0.60)']}
            style={styles.overlay}
          >
            <View style={styles.Maincontainer}>
              <Text style={styles.heading}>Drive. Earn. Repeat.</Text>       
              <Text style={styles.subText}>Tap the icon below & start making money today!</Text>
              <Text style={styles.benefits}>
                Get the best fares, instant payouts, and 24/7 support to maximize your earnings!
              </Text>

              <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store')}>
                <Image
                  source={require('../../../assets/images/OnGooglePlay.png')}
                  style={styles.playstoreImage}
                />
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
 
  backgroundImage: {
    width: 450,
    height: 450,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'stretch',
  },
  overlay: {
    width: width * 0.94,
    height: height * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: -5,
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  Maincontainer: {
        flex: 1,
        marginTop: '110%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#0F4A97',
      },
      subText: {
        fontSize: 16,
        fontWeight:'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#000',
      },
      benefits: {
        fontSize: 15,
        textAlign: 'center',
        color: '#0F4A97', 
        fontWeight: '600',
        marginBottom: 20,
      },
      playstoreImage: {
        width: 250,
        height: 70,
      },
});

export default DriverRegistration;
