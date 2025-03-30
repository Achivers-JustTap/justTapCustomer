import React,{ useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, ImageBackground, Dimensions, View, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useIsFocused, useNavigation } from '@react-navigation/native'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Security = () => {
  
    const [showOverlay, setShowOverlay] = useState(false);

      const isFocused = useIsFocused();
      const navigation = useNavigation();  

       useEffect(() => {
          navigation.setOptions({ headerShown: false });
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
   
     const navigateToService = (service) => {
       navigation.navigate(service);
     };
     const securityOptions = [
      { id: '1', title: 'Change Password', route: 'ChangePasswordsPage' },
      { id: '2', title: 'Authentications', route: 'AuthenticationsPage' },
      { id: '3', title: 'Two-Step Verification', route: 'TwoStepVerification' },
    ];
    



    const handlePress = (option) => {
      if (option.route) {
        navigation.navigate(option.route);
      } else {
        console.log(`${option.title} pressed`);
      }
    };
    
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => handlePress(item)}
      >
        <Text style={styles.optionText}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>
    );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="white"  />
      </TouchableOpacity>
     
          <Text style={styles.heading}>Security</Text>
      <ImageBackground 
        source={require('../../../../assets/images/Security.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle} 
      >
        {showOverlay && (
          <LinearGradient
            colors={['rgba(241, 227, 178, 0.61)', 'rgba(120, 134, 207, 0.61)']} 
            style={styles.overlay}
          >
         
      <FlatList
        data={securityOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    
          
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
    backgroundColor: 'white',
  },
  heading: {
    top: 45,
    left: -100,
    color: '#0F4A97',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    zindex: 1,
  },
  
  backButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: '#0F4A97', 
    padding: 10,
    borderRadius: 50,
  },
  backgroundImage: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
   
  },
  imageStyle: {
    resizeMode: 'stretch',
  },
  overlay: {
    width: width * 0.94, 
    height: height * 0.9, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20, 
    alignSelf: 'center',
    marginTop: height * 0.04,
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-around',
  },
  squareBox: {
    width: 100,  
    height: 100, 
    backgroundColor: '#0F4A97', 
    borderRadius: 10,
    justifyContent: 'center',  
    alignItems: 'center',      
  },
  listContainer: {
    paddingVertical: 10,
    marginTop: 170,
    marginLeft: 27,
  },
  optionContainer: {
    width:'90%',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#0F4A97',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
  },
});
export default Security;