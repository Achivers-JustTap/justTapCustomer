import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text,Dimensions, View, Image, Animated } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

const  LoansRegistration = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Get Instant Loans',
  
      });
    }, [navigation]);
    

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3, // Reduce opacity
          duration: 500, // 500ms fade out
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1, // Restore opacity
          duration: 500, // 500ms fade in
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

 

 

  return (
    <SafeAreaView style={styles.container}>
     

      <Image
        source={require('../../../assets/images/otherImages/LoansBG.jpeg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      />
       
            <View style={styles.Maincontainer}>
              <Text style={styles.heading}>Apply.Approve.Achieve.</Text>       
              <Text style={styles.subText}>Tap the icon below & get instant loans</Text>
              <Text style={styles.benefits}>
              Get easy loans, quick approvals, and flexible repayments to achieve your goals!
              </Text>

              <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store')}>
        <Image
          source={require('../../../assets/images/OnGooglePlay.png')}
          style={styles.playstoreImage}
        />
      </TouchableOpacity>
    </Animated.View>
            </View>

        
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  
  
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  Maincontainer: {
        flex: 1,
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

export default  LoansRegistration;
