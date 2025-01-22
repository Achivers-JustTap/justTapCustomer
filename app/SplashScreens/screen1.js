import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native'; 

const Screen1 = () => {
  const [fontsLoaded] = useFonts({
    Koulen: require('../../assets/fonts/Koulen-Regular.ttf'),
    'Konkhmer Sleokchher': require('../../assets/fonts/KonkhmerSleokchher-Regular.ttf'),
  });

  const navigation = useNavigation();

  const bgColor = useRef(new Animated.Value(0)).current; 
  const jPosition = useRef(new Animated.Value(0)).current;
  const tPosition = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current; 
  const ustOpacity = useRef(new Animated.Value(0)).current;
  const apOpacity = useRef(new Animated.Value(0)).current;
  const exclamationOpacity = useRef(new Animated.Value(0)).current; 

  const [colorsChanged, setColorsChanged] = useState(false); 

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
      
        Animated.parallel([
          Animated.timing(jPosition, {
            toValue: -130, 
            duration: 1500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(tPosition, {
            toValue: 35,
            duration: 1500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0, 
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]).start(() => {
          Animated.parallel([
            Animated.timing(ustOpacity, {
              toValue: 1,
              duration: 800,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(apOpacity, {
              toValue: 1,
              duration: 800,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ]).start(() => {
            Animated.timing(exclamationOpacity, {
              toValue: 1,
              duration: 800,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => {
          
              Animated.timing(bgColor, {
                toValue: 1,
                duration: 800,
                easing: Easing.ease,
                useNativeDriver: false,
              }).start(() => {
                setColorsChanged(true); 

          
                setTimeout(() => {
                  navigation.navigate('WelcomeScreens'); 
                }, 800); 
              });
            });
          });
        });
      }, 1000); 
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  const interpolatedBgColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFDFD', '#0F4A97'],
  });

  const textColor = colorsChanged ? '#FFFFFF' : '#0F4A97';

  return (
    <Animated.View style={[styles.container, { backgroundColor: interpolatedBgColor }]}>
      <View style={styles.logo}>
       
        <Animated.Text
          style={[
            styles.jText,
            { transform: [{ translateX: jPosition }], color: textColor },
          ]}
        >
          J
        </Animated.Text>
        <Animated.Text style={[styles.smallText, styles.ustBesideJ, { opacity: ustOpacity, color: textColor }]}>
          ust
        </Animated.Text>

        <Animated.Text style={[styles.tTextWhite, { opacity, color: '#FFF' }]}>t</Animated.Text>

     
        <Animated.Text
          style={[styles.tTextBlue, { transform: [{ translateX: tPosition }], color: textColor }]}
        >
          t
        </Animated.Text>
        <Animated.Text style={[styles.smallText, styles.apBesideT, { opacity: apOpacity, color: textColor }]}>
          ap
        </Animated.Text>

        <Animated.Text
          style={[styles.exclamation, { opacity: exclamationOpacity, color: textColor }]}
        >
          !
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 360,
    height: 640,
    position: 'relative',
  },
  jText: {
    position: 'absolute',
    left: 139,
    top: 229,
    fontSize: 100,
    fontFamily: 'Koulen',
    fontWeight: '400',
  },
  tTextWhite: {
    position: 'absolute',
    left: 170,
    top: 213,
    fontSize: 122,
    fontFamily: 'Konkhmer Sleokchher',
    fontWeight: '400',
  },
  tTextBlue: {
    position: 'absolute',
    left: 172,
    top: 229,
    fontSize: 100,
    fontFamily: 'Konkhmer Sleokchher',
    fontWeight: '400',
  },
  smallText: {
    fontSize: 80,
    fontFamily: 'Konkhmer Sleokchher',
    fontWeight: '400',
  },
  ustBesideJ: {
    position: 'absolute',
    left: 53,
    top: 252,
  },
  apBesideT: {
    position: 'absolute',
    left: 245,
    top: 253.5,
  },
  exclamation: {
    position: 'absolute',
    left: 335,
    top: 255,
    fontSize: 80,
    fontFamily: 'Konkhmer Sleokchher',
    fontWeight: '400',
  },
});

