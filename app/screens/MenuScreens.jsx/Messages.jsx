import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

const Messages = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messagesContainer}>
        <Text style={styles.heading}>
          Thanks for Choosing <Text style={styles.bold}>JUST TAP!</Text>
        </Text>
        <Image
          source={require("../../../assets/images/otherImages/WelcomeBoy.png")}
          style={styles.image}
        />
        <Text style={styles.messageText}>Now, you can choose your rides at very low prices</Text>
        <TouchableOpacity style={styles.messageButton} onPress={()=> navigation.navigate('EnterLocation')}>
          <Text style={styles.messageButtonText}>Choose Your Ride</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dae7f8',
    borderRadius: 20,
    padding: 30,  
  },
  heading: {
    marginTop: 5,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0F4A97',
  },
  bold: {
    fontFamily: 'SofadiOne',
    fontSize: 35,
    color: '#0F4A97',
  },
  messageText: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 20,
  },
  messageButton: {
    marginTop: 10,
    backgroundColor: '#0F4A97',
    padding: 20,  
    borderRadius: 10,
  },
  messageButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    width: 300,  
    height: 200,
    resizeMode: 'contain',  
  },
});
// Fixed typo here