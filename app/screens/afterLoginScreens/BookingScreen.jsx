import React, { useEffect, useState,useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import AppMapView from '../afterLoginScreens/AppMapView';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../Context/UserContext';

const BookingScreen = ({ route, navigation }) => {
    const { markerCoords, dropoffCoords, pickupName, dropoffName } = route.params;
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [fares, setFares] = useState({});
     const {user} = useContext(UserContext);
    const userId = user._id; // Assuming you have the user ID from context or props
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
        method: 'Cash',
        icon: require('../../../assets/images/cash.png')
    });
   
    useEffect(() => {
        navigation.setOptions({ headerShown: false });

        const fetchVehicles = async () => {
            const vehicleOptions = [
                { id: '1', type: 'Moto', image: require('../../../assets/images/icons/bike.png') },
                { id: '2', type: 'Auto', image: require('../../../assets/images/icons/auto.png') },
                 { id: '3', type: 'Car', image: require('../../../assets/images/icons/mini cab.png') },
                // { id: '4', type: 'Maxi Cab', image: require('../../../assets/images/icons/maxi cab.png') },
                // { id: '5', type: 'XL Cab', image: require('../../../assets/images/icons/XL cab.png') },
                // { id: '6', type: 'Reserved', image: require('../../../assets/images/icons/reserved.png') },
                // { id: '7', type: 'Rentals', image: require('../../../assets/images/icons/rentals.png') },
                { id: '8', type: 'Parcel', image: require('../../../assets/images/icons/parcel.png') },
                // { id: '9', type: 'Intercity', image: require('../../../assets/images/icons/intercity.png') },
            ];
            setVehicles(vehicleOptions);

            // Fetch fares for each vehicle type
            try {
                const response = await fetch(`http://192.168.29.13:5000/api/maps/calculate-fare?pickup=${pickupName}&destination=${dropoffName}`);
                const fareData = await response.json();
                console.log('Fare',fareData)
                setFares(fareData);
                console.log("Fares State", fares)
            } catch (error) {
                console.error("Error fetching fares:", error);
            }
        };

        fetchVehicles();
    }, [navigation, pickupName, dropoffName]);

    const handleBookRide = () => {
        if (selectedVehicle) {
            console.log(`Booking ${selectedVehicle.type} with fare: ${fares[selectedVehicle.type.toLowerCase()]}`);
            // // Pass vehicle type and fare to the next screen
            // navigation.navigate('WaitingForCaptainScreen', {
            //     markerCoords,
            //     destinationCoords,
            //     vehicle: selectedVehicle,
            navigation.navigate('LocationPinScreen', {
                pickup: pickupName,
                destination: dropoffName,
                userId: userId,
                vehicleType: selectedVehicle.type, markerCoords,dropoffCoords,
                fare: fares[selectedVehicle.type.toLowerCase()]
            });
        } else {
            console.log("Please select a vehicle to book.");
        }
    };

//     const handleBookRide = async () => {
//     if (selectedVehicle) {
//         const rideData = {
//             userId: userId, // Replace with actual user ID dynamically later
//             pickup: pickupName,
//             destination: dropoffName,
//             vehicleType: selectedVehicle.type.toLowerCase()
//         };

//         try {
//             const response = await fetch('http://192.168.29.13:5000/rides/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(rideData)
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create ride');
//             }

//             const result = await response.json();
//             console.log('Ride Created:', result);

//             // Navigate after successful ride creation
//             navigation.navigate('LocationPinScreen', {
//                         markerCoords,
//                 dropoffCoords,
//                 fare: fares[selectedVehicle.type.toLowerCase()]
//             });

//         } catch (error) {
//             console.error("Error booking ride:", error);
//         }
//     } else {
//         console.log("Please select a vehicle to book.");
//     }
// };

    

    const handleCashClick = () => {
        if (selectedVehicle) {
            const selectedFare = fares[selectedVehicle.type.toLowerCase().replace(/\s+/g, '')];
    
            navigation.navigate('PaymentMethodSelection', { 
                totalAmount: selectedFare, 
                setPaymentMethod: (method) => {
                    let iconSource = null; // Default: No image for Wallet
    
                    if (method === 'Cash') {
                        iconSource = require('../../../assets/images/cash.png');
                    } else if (method === 'AmazonPay') {
                        iconSource = require('../../../assets/images/amazonPay.png');
                    } else if (method === 'gpay') {
                        iconSource = require('../../../assets/images/gpay.png');
                    } else if (method === 'paytm') {
                        iconSource = require('../../../assets/images/Paytm.png');
                    } else if (method === 'phonepe') {
                        iconSource = require('../../../assets/images/phonepe.png');
                    } 
    
                    setSelectedPaymentMethod({ method, icon: iconSource }); 
                } 
            });
        } else {
            console.log("Please select a vehicle before proceeding to payment.");
        }
    };
    

    

    const renderVehicleItem = ({ item }) => (
        <TouchableOpacity 
            style={[styles.vehicleItem, selectedVehicle?.id === item.id && styles.selectedItem]} 
            onPress={() => setSelectedVehicle(item)}
        >
            <View style={styles.vehicleInfoContainer}>
                <Image source={item.image} style={styles.vehicleImage} />
                <Text style={[styles.vehicleType, selectedVehicle?.id === item.id && styles.selectedVehicleText]}>
{item.type} - ₹{fares[item.type.toLowerCase().replace(/\s+/g, '')] || 'N/A'}

                </Text>
            </View>
        </TouchableOpacity>
    );

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

            <View style={styles.vehiclesAndBookingContainer}>
                <FlatList
                    data={vehicles}
                    keyExtractor={(item) => item.id}
                    renderItem={renderVehicleItem}
                    showsVerticalScrollIndicator={false}
                    style={styles.vehicleList} 
                />
                
                <View style={styles.bookRideContainer}>
                    <TouchableOpacity onPress={handleCashClick} style={styles.cashOptionContainer}>
                    {selectedPaymentMethod.method !== 'Wallet' && selectedPaymentMethod.icon && (
        <Image source={selectedPaymentMethod.icon} style={styles.cashImage} />
    )}
                        <Text style={styles.cashOption}>{selectedPaymentMethod.method}</Text>
                        <View style={styles.triangle} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.bookButton} 
                        onPress={handleBookRide}
                    >
                        <Text style={styles.buttonText}>Book Ride</Text>
                    </TouchableOpacity>
                </View>
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
        marginTop: 20
    },
    vehiclesAndBookingContainer: {
        width: "95%",
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        elevation: 3,
        flex: 1,
    },
    vehicleList: {
        height: 250, 
    },
    vehicleItem: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: '#0F4A97',
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    vehicleInfoContainer: {
        flexDirection: 'row', 
        alignItems: 'center',  
        flex: 1,               
    },
    vehicleImage: {
        width: 70,             
        height: 70,
        backgroundColor: "white",
        borderRadius: 10,            
        marginRight: 10,      
    },
    selectedItem: {
        backgroundColor: '#839AB6',
    },
    vehicleType: {
        fontSize: 16,
        color: 'white', 
        fontWeight: 'bold',
    },
    selectedVehicleText: {
        color: 'black'
    },
    bookRideContainer: {
        padding: 10,
        marginBottom: 0,
    },
    cashOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cashImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 10,
    },
    bookButton: {
        backgroundColor: '#0F4A97',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cashOption: {
        fontSize: 16,
        color: 'green',
        marginLeft: -20,
        marginTop: -10,
        textAlign: 'center',
    },
    triangle: {
        width: 0,
        height: 0,
        marginTop: -10,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'green',
    },
});


export default BookingScreen;