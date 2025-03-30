import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, SafeAreaView, Animated, Easing } from 'react-native';
import AppMapView from '../afterLoginScreens/AppMapView';
import Icon from 'react-native-vector-icons/Ionicons';

const WaitingForCaptainScreen = ({ route, navigation }) => {
    const { markerCoords, dropoffCoords, vehicle } = route.params;
    const [isRideCancelled, setIsRideCancelled] = useState(false);
    const progress = useState(new Animated.Value(0))[0]; 

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const startLoading = () => {
        progress.setValue(0); 
        Animated.timing(progress, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished && !isRideCancelled) { 
                navigation.navigate('RideConfirmedPage');
            }
        });
    };

    useEffect(() => {
        if (!isRideCancelled) {
            startLoading();
        } else {
            progress.stopAnimation(); 
            progress.setValue(0);     
        }
    }, [isRideCancelled]);

    const cancelRide = () => {
        Alert.alert(
            'Cancel Ride',
            'Are you sure you want to cancel the ride?',
            [
                { text: 'No', style: 'cancel' },
                { 
                    text: 'Yes', 
                    style: 'destructive', 
                    onPress: () => {
                        setIsRideCancelled(true); 
                        setTimeout(() => {
                            navigation.navigate('CancellationReasons'); 
                        }, 100);
                    }
                },
            ],
            { cancelable: true }
        );
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
                    currentLocationCoords={markerCoords}
                    destinationCoords={dropoffCoords}
                />
            </View>

            <View style={styles.loadingBarContainer}>
                <Animated.View
                    style={[ 
                        styles.loadingBar, 
                        { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
                    ]}
                />
            </View>

            <View style={styles.cancelRideContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={cancelRide}>
                    <Text style={styles.cancelButtonText}>Cancel Ride</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    header: {
        position: 'absolute',
        top: 25,
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
        height: "60%",
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 20,
    },
    loadingBarContainer: {
        height: 10,
        width: '90%',
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginTop: 10,
        alignSelf: 'center',
    },
    loadingBar: {
        height: '100%',
        backgroundColor: '#0F4A97',
        borderRadius: 5,
    },
    cancelRideContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#FF6347',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
    },
    cancelConfirmationContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    cancelConfirmationText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WaitingForCaptainScreen;
