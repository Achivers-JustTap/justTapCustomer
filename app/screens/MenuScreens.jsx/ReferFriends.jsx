import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, Dimensions, View, ImageBackground, Clipboard, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const ReferFriends = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const referralCode = "REFER@123";

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Refer Friends',
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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/otherImages/ReferFriendsBG.jpeg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        {showOverlay && (
          <LinearGradient
            colors={['rgba(254, 254, 254, 0.82)', 'rgba(199, 221, 249, 0.82)']}
            style={styles.overlay}
          >
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
    backgroundColor: '#f0f0f0',
  },
  backgroundImage: {
    width: '100%',
    height: 700,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: width * 0.96,
    height: height * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
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
  copyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inviteButton: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#0f4a97',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%'
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
    marginBottom: 10,
  },
  howItWorksText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default ReferFriends;
