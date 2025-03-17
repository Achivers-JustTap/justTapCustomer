
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ImageBackground, Dimensions, View, Image, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const Insurance= () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Insurance',
  
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
        source={require('../../../assets/images/InsuranceBG.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        {showOverlay && (
          <LinearGradient
            colors={['rgba(224,161,161, 0.5)', 'rgba(172,195,225,0.60)']}
            style={styles.overlay}
          >

<View style={styles.Maincontainer}>
      <Text style={styles.title}>Insurance Coverage</Text>
      
      
      <View style={styles.insuranceContainer}>
        <Text style={styles.insuranceText}>₹1.5 Extra for Insurance</Text>
        <Switch
          style={styles.toggleSwitch}
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
      </View>

   
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {isEnabled
            ? 'You have opted for insurance. ₹1.5 will be added to your ride charge. This coverage will be provided in case of an accident during the ride.'
            : 'Turn on insurance for an additional ₹1.5 on your ride charge. This insurance will cover you in case of an accident.'}
        </Text>

      
      </View>
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
    width: 350,
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
    padding: 10,
    justifyContent: 'center',
    alignItems:'center'
  },
  title: {
    fontSize: 30,
    color:'#0F4A97',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  insuranceContainer: {
    marginTop: 120,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  insuranceText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleSwitch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    width:'100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
  },

});

export default Insurance;
