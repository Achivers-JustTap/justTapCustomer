import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import AppMapView from '../afterLoginScreens/AppMapView'; // Import the new AppMapView component
import Icon from 'react-native-vector-icons/Ionicons';

const LocationMapScreen = ({ route, navigation }) => {
    const { pickupCoords, dropoffCoords,pickupName,dropoffName } = route.params;
    const { receiverName, receiverPhone, instructions } = route.params;


    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
   

    const handleConfirm = () => {
        navigation.navigate('BookingScreen', {
            markerCoords: pickupCoords,
            dropoffCoords,
            pickupName,
            dropoffName
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Pass the current location and destination to AppMapView */}
            <View style={styles.mapContainer}>
                <AppMapView
                    currentLocationCoords={pickupCoords}
                    destinationCoords={dropoffCoords}
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
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '90%',
        height: '80%',
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
