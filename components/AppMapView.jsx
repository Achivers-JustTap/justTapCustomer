import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocationContext } from '../app/Context/UserLocationContext';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; 

export default function AppMapView({ 
    destinationCoords, 
    initialMarkerCoords, 
    onMarkerDragEnd, 
    onMapPress,
    onResetLocation = () => {}, 
    onDestinationDragEnd = () => {},
    draggable = true, // Default value for draggable
}) {
    const { location } = useContext(UserLocationContext);
    const [markerCoords, setMarkerCoords] = useState(initialMarkerCoords || location); 
    const [destination, setDestination] = useState(destinationCoords); 

    useEffect(() => {
        // Update marker coords if location changes and marker is not set
        if (location && !markerCoords) {
            setMarkerCoords(location); 
            onResetLocation(location);
        }
    }, [location, markerCoords, onResetLocation]);

    const region = {
        latitude: destination?.latitude || markerCoords?.latitude || location?.latitude,
        longitude: destination?.longitude || markerCoords?.longitude || location?.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
    };

    const handleMarkerDragEnd = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerCoords({ latitude, longitude }); 
        onMarkerDragEnd(e);
    };

    const handleDestinationDragEnd = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setDestination({ latitude, longitude }); 
        onDestinationDragEnd({ latitude, longitude });
    };

    const handleResetLocation = () => {
        if (location) {
            setMarkerCoords(location);
            onResetLocation(location);
        }
    };

    return location?.latitude ? (
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={region}  
                showsUserLocation={false}  
                onPress={onMapPress} 
                showsMyLocationButton={true}
            >
                {/* User Location Marker */}
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    style={styles.userLocationMarker} 
                >
                    <View style={styles.userLocationDot} />
                </Marker>

                {/* Draggable Marker */}
                <Marker
                    coordinate={markerCoords || location}
                    title="Your Location"
                    pinColor="#0F4A97" 
                    draggable={draggable} // Use the draggable prop here
                    onDragEnd={draggable ? handleMarkerDragEnd : undefined}
                />

                {/* Destination Marker */}
                {destination && (
                    <Marker
                        coordinate={destination} 
                        title="Destination"
                        pinColor="red" 
                        draggable={draggable} // Use the draggable prop here
                        onDragEnd={draggable ? handleDestinationDragEnd : undefined} 
                    />
                )}
            </MapView>

            {/* Reset Location Button */}
            <TouchableOpacity style={styles.locationButton} onPress={handleResetLocation}>
                <MaterialIcon name="my-location" size={30} color="#0F4A97" />
            </TouchableOpacity>
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    userLocationMarker: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    userLocationDot: {
        width: 10, 
        height: 10,
        borderRadius: 5, 
        backgroundColor: '#0F4A97',
    },
    locationButton: {
        position: 'absolute',
        bottom: 20,
        right: 20, 
        backgroundColor: 'white', 
        borderRadius: 20, 
        padding: 10,
        elevation: 5, 
    },
});
