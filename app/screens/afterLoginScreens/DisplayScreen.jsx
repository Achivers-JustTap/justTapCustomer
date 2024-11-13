import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const DisplayScreen = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { name, isSignUp } = route.params || { name: '', isSignUp: false };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('HomeTabs'); // Navigate to HomeTabs after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {isSignUp ? ( 
        <>
          <Text style={styles.header}>"Hurray" {name}!</Text>
          <Text style={styles.subHeader}>
             we are happy that you chose our {' '} service!"
            <Text style={styles.justTapText}>JUST TAP!</Text>
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.header}>We're thrilled {name} to have you back!</Text>
          <Text style={styles.subHeader}>
          it’s been too long since your last ride. {' '} and choose your ride!"
            <Text style={styles.justTapText}>JUST TAP!</Text>
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
  },
  justTapText: {
    fontFamily: 'SofadiOne',
    color: 'white',
  },
});

export default DisplayScreen;
