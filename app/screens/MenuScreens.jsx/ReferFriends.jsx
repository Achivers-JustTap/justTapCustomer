import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, Dimensions, View, ImageBackground, Clipboard, Share,Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const ReferFriends = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const referralCode = "REFER@123";

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Refer Friends',
    });
  }, [navigation]);

 

  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    alert('Referral code copied!');
  };

  const shareReferral = async () => {
    try {
      await Share.share({
        message: `Join JUST TAP! using my referral code ${referralCode} and earn rewards!`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
    
      <Image
        source={require('../../../assets/images/otherImages/ReferFriendsBG1.jpeg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      />
            <View style={styles.referralContainer}>
              <Text style={styles.referralCode}>{referralCode}</Text>
              <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
              <Ionicons name="copy" size={20} color="white" style={styles.copyIcon} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.howItWorksContainer}>
              <Text style={styles.howItWorksTitle}>How It Works</Text>
              <Text style={styles.howItWorksText}>
                Refer a friend and earn ₹50 in your wallet if your friend downloads the app.
              </Text>
              <Text style={styles.howItWorksText}>
                If your friend completes a ride with JUST TAP! within 1 week of registration, you will earn ₹50 again.
              </Text>
            </View>
            <TouchableOpacity style={styles.inviteButton} onPress={shareReferral}>
              <Text style={styles.inviteButtonText}>Invite Your Friends</Text>
            </TouchableOpacity>
            
    
    </SafeAreaView>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  backgroundImage: {
    width: 400,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
 
  referralContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderColor:'#0f4a97',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 30
  },
  referralCode: {
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
    color: '#0f4a97',
  },
  copyButton: {
    padding: 5,
    backgroundColor: '#5b9bd5',
    borderRadius: 5,
  },

  inviteButton: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#0f4a97',
    borderRadius: 10,
    marginBottom: 30,
    width: '80%'
  },
  inviteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  howItWorksContainer: {
    alignItems: 'center',
  },
  howItWorksTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  howItWorksText: {
    fontSize: 18,
    color: 'black',
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default ReferFriends;
