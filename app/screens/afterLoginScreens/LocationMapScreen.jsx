import React, { useEffect, useState } from 'react'; 
import { StyleSheet, SafeAreaView, View, TextInput, Alert } from 'react-native';
import AppMapView from '../../../components/AppMapView'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, Text } from 'react-native';

const LocationMapScreen = ({ route, navigation }) => {
    const { currentLocationCoords, destinationCoords, destination } = route.params;
    console.log("current location", currentLocationCoords);
    console.log("destination", destinationCoords);

    const [markerCoords, setMarkerCoords] = useState(currentLocationCoords); 
    const [currentLocationText, setCurrentLocationText] = useState(`${currentLocationCoords.latitude}, ${currentLocationCoords.longitude}`);
    const [destinationText, setDestinationText] = useState(destination);

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleMarkerDragEnd = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerCoords({ latitude, longitude }); 
        setCurrentLocationText(`${latitude}, ${longitude}`); 
    };
    
    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerCoords({ latitude, longitude }); 
        setCurrentLocationText(`${latitude}, ${longitude}`); 
    };

   
    const resetToCurrentLocation = () => {
        setMarkerCoords(currentLocationCoords); 
        setCurrentLocationText(`${currentLocationCoords.latitude}, ${currentLocationCoords.longitude}`); 
    };

    const handleConfirm = () => {
        navigation.navigate('BookingScreen', {
            markerCoords: markerCoords,
            destinationCoords,
            destination 
        });        
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.mapContainer}>
                <AppMapView 
                    destinationCoords={destinationCoords} 
                    markerCoords={markerCoords} 
                    onMarkerDragEnd={handleMarkerDragEnd} 
                    onMapPress={handleMapPress} 
                    onResetLocation={resetToCurrentLocation} 
                />
            </View>
            {/* Confirm Button */}
            <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        justifyContent:'center',
        alignItems:'center'
    },
    header: {
        position: 'absolute',
        top: 2,
        left: 10,
        zIndex: 10,
    },
    backButton: {
        backgroundColor: '#0F4A97',
        padding: 7,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapContainer: {
        width: "90%",
        height: "80%",
        borderRadius: 20,
        overflow: 'hidden',  
        backgroundColor: 'white',
        marginTop: -20, 
    },
    confirmButton: {
        position: 'absolute',
        bottom: 20,
        width: '90%',
        padding: 15,
        borderRadius: 25,
        backgroundColor: '#0F4A97',
        alignItems: 'center',
        zIndex: 1,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LocationMapScreen;
