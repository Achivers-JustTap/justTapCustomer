import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import AppMapView from '../../../components/AppMapView';

const LocationPinScreen = ({ route, navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
          title: '',
        });
      }, [navigation]);

      
    const { markerCoords, dropoffCoords, vehicle,fare } = route.params;
    if (!route.params) {
        console.error('No route parameters received');
        return <Text>Error: No data provided</Text>;
    }

    if (!markerCoords) {
        console.error('Missing initial marker coordinates');
        return <Text>Error: Missing location data</Text>;
    }

    const handleConfirm = () => {
        navigation.navigate('WaitingForCaptainScreen', {  vehicle, markerCoords,dropoffCoords,
            fare});
    };

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
