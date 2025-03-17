import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, Dimensions, View, ImageBackground, Switch, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const RideCheckPage = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [selectedPreference, setSelectedPreference] = useState('');
  const [contacts, setContacts] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isContactsVisible, setIsContactsVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Trusted Contacts',
    });
  }, [navigation]);

  const requestPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const loadContacts = async () => {
    if (hasPermission) {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      const validContacts = data.filter((contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0);
      setContacts(validContacts);
      setIsContactsVisible(true); 
    } else {
      console.log("Permission denied to access contacts");
    }
  };

  const toggleContactSelection = (contact) => {
    const alreadySelected = selectedContacts.find((item) => item.id === contact.id);
    if (alreadySelected) {
      setSelectedContacts(selectedContacts.filter((item) => item.id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleOkPress = () => {
    setIsContactsVisible(false);
  };

  const handleDeleteContact = (contactId) => {
    const updatedSelectedContacts = selectedContacts.filter((contact) => contact.id !== contactId);
    setSelectedContacts(updatedSelectedContacts);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.contactItem,
        selectedContacts.find((contact) => contact.id === item.id) && styles.selectedContact,
      ]}
      onPress={() => toggleContactSelection(item)}
    >
      <Text style={styles.contactText}>
        {item.name} - {item.phoneNumbers ? item.phoneNumbers[0].number : 'No number'}
      </Text>
    </TouchableOpacity>
  );

  const renderSelectedContactItem = ({ item }) => (
    <View style={styles.selectedContactItem}>
      <Text style={styles.selectedContactText}>
        {item.name} - {item.phoneNumbers ? item.phoneNumbers[0].number : 'No number'}
      </Text>
      <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
        <Ionicons name="trash" size={25} color="white" style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.loadContactsContainer}>
        <TouchableOpacity style={styles.loadContactsButton} onPress={loadContacts}>
          <Text style={styles.loadContactsButtonText}>Add Contacts</Text>
        </TouchableOpacity>
        {isContactsVisible && (
          <View style={styles.contactsListContainer}>
            <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderContactItem}
            />
          </View>
        )}
      </View>
      {selectedContacts.length > 0 && !isContactsVisible && (
        <Text style={styles.selectedContactsHeader}>Selected Contacts:</Text>
      )}
    </View>
  );


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Safety Preferences',
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
              source={require('../../../../assets/images/otherImages/TrustedContacts.jpeg')}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}
            >
      {showOverlay && (
        <LinearGradient
          colors={['rgba(254, 254, 254, 0.75)', 'rgba(199, 221, 249, 0.75)']}
          style={styles.overlay}
        >
        <View style={styles.Maincontainer}>
      <Text style={styles.header}>Manage Trusted Contacts</Text>
      <Text style={styles.description}>
        In our Just Tap!, we use trusted contacts to ensure a safe and secure ride experience. These contacts can be
        notified in case of emergencies, and we will share your live location with them when you are on a trip. Your Safety is our top Priority, and we want you to select the people you trust the most for this feature.
      </Text>
      <FlatList
        data={selectedContacts}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeader}
        renderItem={renderSelectedContactItem}
        contentContainerStyle={styles.flatListContainer}
      />
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
    backgroundColor: '#f0f0f0',
  },
 
  backgroundImage: {
    width: 450,
    height: 750,
    right: 35,
    marginTop:-10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: width * 0.96,
    height: height * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    left: 35,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop:  10,
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
   
  },
  Maincontainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#0F4A97',
  },
  description: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    fontWeight:'bold',
    textAlign: 'center',
  },
  loadContactsContainer: {
    marginBottom: 20,
  },
  contactsListContainer: {
    marginTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 10,
  },
  loadContactsButton: {
    backgroundColor: '#0F4A97',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  loadContactsButtonText: {
    color: 'white',
    fontSize: 16,
  },
  okButton: {
    backgroundColor: '#60af8c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom:20,
  },
  okButtonText: {
    color: 'white',
    fontSize: 16,
  },
  contactItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
  },
  contactText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  selectedContact: {
    backgroundColor: '#b6ceed',
  },
  selectedContactItem: {
    backgroundColor: '#5fa9e0',
    padding: 16,
    height: 80,
    marginBottom: 8,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedContactText: {
    fontSize: 16,
    color: '#ffffff',
    textWrap:'wrap',
  },
  selectedContactsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#34495e',
  },
  deleteIcon: {
    marginLeft: 5,
  
  },
  flatListContainer: {
    flexGrow: 1,
  },
});

export default RideCheckPage;

