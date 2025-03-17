import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, Dimensions, View, ImageBackground, Switch, TextInput, Button, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const PrivacyAndData = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    dataTracking: false,
    genderIdentity: false,
    deviceLocation: false,
    liveLocation: false,
  });
  const [gender, setGender] = useState('Female');
  const [isEditingGender, setIsEditingGender] = useState(false);
  const [newGender, setNewGender] = useState(gender);
  const [isDataTrackingEnabled, setIsDataTrackingEnabled] = useState(true);
  const [isDeviceLocationEnabled, setIsDeviceLocationEnabled] = useState(true);
  const [isLiveLocationEnabled, setIsLiveLocationEnabled] = useState(true);
  
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Privacy and Data',
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
   const handleToggleSection = (section) => {
    setExpandedSections((prev) => {
      const newSections = { ...prev };
      
     
      if (newSections[section]) {
        newSections[section] = false; 
      } else {
      
        for (let key in newSections) {
          newSections[key] = false;
        }
       
        newSections[section] = true;
      }
      
      return newSections;
    });
  };
  

  const handleSaveGender = () => {
    setGender(newGender);
    setIsEditingGender(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../../assets/images/otherImages/privacy.jpeg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        {showOverlay && (
          <LinearGradient
            colors={['rgba(254, 254, 254, 0.8)', 'rgba(199, 221, 249, 0.8)']}
            style={styles.overlay}
          >
            <ScrollView style={styles.scrollView}>
              <Text style={styles.title}>Privacy and Data</Text>
              <View style={styles.section}>
                <TouchableOpacity onPress={() => handleToggleSection('dataTracking')} style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>Data Tracking</Text>
                </TouchableOpacity>
                {expandedSections.dataTracking && (
                  <View style={styles.sectionContent}>
                    <Text style={styles.sectionContentText}>Why We Track Data</Text>
                    <Text style={styles.sectionContentSubText}>
                      At Just Tap!, we track data to enhance your experience and ensure the highest level of service.
                       By tracking data such as your ride preferences, location, and interaction patterns, we can offer personalized services,
                        recommend the best routes, and improve the overall app functionality. Additionally, data tracking helps us to keep the
                         app secure and efficient by detecting any unusual activity or issues with your rides. Rest assured, your data is safe, 
                         and we respect your privacy at all times.
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.sectionContentToggleText}>You can Turn on/ off Data tracking if you need</Text>
                      <Switch
                        value={isDataTrackingEnabled}
                        onValueChange={setIsDataTrackingEnabled}
                      />
                    </View>
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <TouchableOpacity onPress={() => handleToggleSection('genderIdentity')} style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>Gender Identity</Text>
                </TouchableOpacity>
                {expandedSections.genderIdentity && (
                  <View style={styles.sectionContent}>
                    <Text style={styles.sectionContentText}>
                      We took your gender for safety features, personalized ads, and more. Our drivers will never see your gender information.
                    </Text>
                    <View style={styles.genderInfo}>
                      <Text>Your Gender: </Text>
                      <Text>{gender}</Text>
                      {isEditingGender ? (
                        <View style={styles.editContainer}>
                          <TextInput
                            value={newGender}
                            onChangeText={setNewGender}
                            style={styles.textInput}
                          />
                          <Button title="Save" onPress={handleSaveGender} />
                        </View>
                      ) : (
                        <TouchableOpacity onPress={() => setIsEditingGender(true)} style={styles.editButton}>
                          <Text>Edit</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <TouchableOpacity onPress={() => handleToggleSection('deviceLocation')} style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>Device Location</Text>
                </TouchableOpacity>
                {expandedSections.deviceLocation && (
                  <View style={styles.sectionContent}>
                    <Text style={styles.sectionContentText}>Why We Track Device Location</Text>
                    <Text style={styles.sectionContentSubText}>
                      We track your device location to provide a seamless and efficient ride experience.
                       By knowing your location, we can accurately match you with nearby drivers, calculate optimal routes,
                        and ensure timely pickups. Device location also allows us to provide real-time updates and better manage 
                        traffic conditions to improve your journey. Your privacy is important to us, and we use this data only to
                         enhance your experience within the app.
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.sectionContentToggleText}>You can Turn on/ off Data tracking if you need</Text>
                      <Switch
                        value={isDeviceLocationEnabled}
                        onValueChange={setIsDeviceLocationEnabled}
                      />
                    </View>
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <TouchableOpacity onPress={() => handleToggleSection('liveLocation')} style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>Live Location</Text>
                </TouchableOpacity>
                {expandedSections.liveLocation && (
                  <View style={styles.sectionContent}>
                    <Text style={styles.sectionContentText}>Why We Track Live Location</Text>
                    <Text style={styles.sectionContentSubText}>
                      We track your live location to ensure a smooth and safe ride experience. By continuously monitoring your real-time location,
                       we can provide accurate ETA updates, ensure that your driver is on the right path, and offer live tracking for both you and the driver.
                        This feature enhances your safety by allowing you to share your live ride status with trusted contacts. We prioritize your privacy, 
                        and the live location is used solely for improving your ride experience within the app.
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.sectionContentToggleText}>You can Turn on/ off Data tracking if you need</Text>
                      <Switch
                        value={isLiveLocationEnabled}
                        onValueChange={setIsLiveLocationEnabled}
                      />
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
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
    width: 450,
    height: 730,
    right: 35,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: width * 0.96,
    height: height * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    left: 35,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
    position: 'relative',
    flexDirection: 'column',
  },
  scrollView: {
    width: '100%',
    marginTop: '10%'
  },

  title:{
    fontSize: 33,
    color: '#0f4a97',
    fontWeight: 'bold',
    textAlign:'center',
  },
  section: {
    marginVertical: 15,
    width: '95%',
    marginHorizontal: 10
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: 'white',
    height: 70,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#0f4a97',
    borderWidth: 2,
    borderRadius: 8,
  },
  sectionHeaderText:{
    fontSize: 18,
    color: 'black',
    
    fontWeight: 'bold',
  },
  sectionContent: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
  },
  sectionContentText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    lineHeight: 22,
    marginVertical: 5,
    textAlign: 'justify',
  },
  sectionContentSubText:{
   textAlign: 'justify'
  },
  sectionContentToggleText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    lineHeight: 22,
    marginVertical: 5,
    textAlign: 'left', 
    flex: 1, 
  },
  
  genderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    padding: 5,
    backgroundColor: '#5b9bd5',
    borderRadius: 5,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginRight: 10,
    width: 100,
  },
});

export default PrivacyAndData;
