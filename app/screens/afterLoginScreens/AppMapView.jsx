import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const AppMapView = ({ currentLocationCoords, destinationCoords }) => {
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null); // Reference to MapView

    useEffect(() => {
        fetchRoute();
    }, []);

    const fetchRoute = async () => {
        try {
            const apiKey = 'AIzaSyDRWDCH-MCMYS0ohxiCENn4v2NBCw1tZb8';
            const origin = `${currentLocationCoords.latitude},${currentLocationCoords.longitude}`;
            const destination = `${destinationCoords.latitude},${destinationCoords.longitude}`;

            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`);

            if (response.data.routes.length) {
                const points = response.data.routes[0].overview_polyline.points;
                const decodedPoints = decodePolyline(points);
                setRouteCoordinates(decodedPoints);

                // Fit the map to include both pickup and destination markers
                fitToMarkers([currentLocationCoords, destinationCoords]);
            }
        } catch (error) {
            console.error('Error fetching directions:', error);
        } finally {
            setLoading(false);
        }
    };

    const decodePolyline = (t) => {
        let points = [];
        let index = 0,
            len = t.length;
        let lat = 0,
            lng = 0;

        while (index < len) {
            let b, shift = 0,
                result = 0;
            do {
                b = t.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlat = (result & 1) ? ~(result >> 1) : result >> 1;
            lat += dlat;

            shift = result = 0;
            do {
                b = t.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = (result & 1) ? ~(result >> 1) : result >> 1;
            lng += dlng;

            points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
        }
        return points;
    };

    const fitToMarkers = (coordinates) => {
        if (mapRef.current) {
            mapRef.current.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0F4A97" />
            </View>
        );
    }

    return (
        <MapView
            ref={mapRef} // Attach ref to MapView
            style={styles.map}
            onLayout={() => fitToMarkers([currentLocationCoords, destinationCoords])} // Ensure zoom adjustment on initial render
        >
            {/* Marker for Current Location */}
            <Marker coordinate={currentLocationCoords}  pinColor="skyblue"/>

            {/* Marker for Destination */}
            <Marker coordinate={destinationCoords} pinColor="red" />

            {/* Polyline for Route */}
            <Polyline coordinates={routeCoordinates} strokeColor="#0F4A97" strokeWidth={4} />
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AppMapView;