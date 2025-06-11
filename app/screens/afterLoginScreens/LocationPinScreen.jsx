import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import AppMapView from '../../../components/AppMapView';

const LocationPinScreen = ({ route, navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
          title: '',
        });
      }, [navigation]);

      
     const {
        pickup,
        destination,
        userId,
        vehicleType,
        markerCoords,
        dropoffCoords,
        fare
    } = route.params;

    if (!route.params) {
        console.error('No route parameters received');
        return <Text>Error: No data provided</Text>;
    }

    if (!markerCoords) {
        console.error('Missing initial marker coordinates');
        return <Text>Error: Missing location data</Text>;
    }

    const handleConfirm = async () => {
    const rideData = {
        userId: userId,
        pickup: pickup,
        destination: destination,
        vehicleType: vehicleType.toLowerCase()

    };

    console.log("Sending Ride Data:", rideData);

    try {
        const response = await fetch('http://192.168.29.13:5000/rides/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rideData)
        });

        const responseText = await response.text();
        console.log("Response Status:", response.status);
        console.log("Raw Response Text:", responseText);

        if (!response.ok) {
            // Show the exact backend error
            throw new Error(`Status ${response.status}: ${responseText}`);
        }

        const result = JSON.parse(responseText);
        console.log('Ride Created Successfully:', result);

        navigation.navigate('WaitingForCaptainScreen', {
            vehicle: vehicleType,
            markerCoords,
            dropoffCoords,
            fare
        });

    } catch (error) {
        console.error("Error booking ride:", error.message);
    }
};


    // const handleConfirm = () => {
    //     navigation.navigate('WaitingForCaptainScreen', {  vehicle, markerCoords,dropoffCoords,
    //         fare});
    // };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <AppMapView initialCoords={markerCoords} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#0f4a97',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LocationPinScreen;
