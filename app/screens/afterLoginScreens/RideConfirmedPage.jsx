import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';  

const RideConfirmedPage = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const navigation = useNavigation();

   useEffect(() => {
              navigation.setOptions({ headerShown: false });
       });
  

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 1000, 
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('DriverArrivingPage'); 
    }, 1000);

    return () => clearTimeout(timer); 
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fadeContainer, { opacity: fadeAnim }]}>
        <Text style={styles.text}>Ride Confirmed</Text>
      </Animated.View>
    </View>
  );
};

export default RideConfirmedPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4A97', 
  },
  fadeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
