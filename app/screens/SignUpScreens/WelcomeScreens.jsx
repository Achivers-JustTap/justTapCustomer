import React, { useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useFonts } from 'expo-font';

const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'SofadiOne': require('../../../assets/fonts/SofadiOne-Regular.ttf'),
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#fff" style={styles.loader} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
       
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/welcome.png')} 
            style={styles.image}
          />
        </View>

     
        <Text style={styles.title}>
          Welcome to{' '}
          <Text style={styles.justTapText}>JUST TAP!</Text>
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.memberText}>
          <Text style={{ fontSize: 19, fontFamily: 'SofadiOne' }}>JUST TAP!</Text>
          {' '}, to continue
        </Text>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          Where Every Journey Begins with a Tap!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F4A97',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 30,
    marginBottom: 20, 
  },
  imageContainer: {
    width: '90%',
    height: 330,
    backgroundColor:'white',
    borderRadius: 200, 
    overflow: 'hidden',
    marginBottom: 20, 
    top:60,
    borderWidth: 3,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    top: 70,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  justTapText: {
    fontFamily: 'SofadiOne',
    fontSize: 35,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
  memberText: {
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 50,
    paddingHorizontal: 20,
  },
});

export default WelcomeScreen;
