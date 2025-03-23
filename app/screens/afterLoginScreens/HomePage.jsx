import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, LayoutAnimation, FlatList, TextInput, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AppMapView from '../../../components/AppMapView';
import * as Location from 'expo-location';
import { UserLocationContext } from '../../Context/UserLocationContext';

const HomePage = ({ navigation }) => {
    const { location, setLocation } = useContext(UserLocationContext);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mapHeight, setMapHeight] = useState(300);
    const [isExpanded, setIsExpanded] = useState(false);
    const [boxPress, setBoxPress] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [currentLocation, setCurrentLocation] = useState('Loading current location...');
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [mapCenter, setMapCenter] = useState(null);

    let lastTap = null;

    useEffect(() => {
        const getLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location.coords);

                const { latitude, longitude } = location.coords;
                setMapCenter({ latitude, longitude });
                const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });

                if (reverseGeocode.length > 0) {
                    const {
                        name,
                        street,
                        district,
                        city,
                        region,
                        postalCode,
                        country
                    } = reverseGeocode[0];

                    const detailedLocation = `${name ? name + ', ' : ''}${street ? street + ', ' : ''}${district ? district + ', ' : ''}${city ? city + ', ' : ''}${region ? region + ', ' : ''}${postalCode ? postalCode + ', ' : ''}${country}`;

                    setCurrentLocation(detailedLocation);
                }
            } catch (error) {
                console.error(error);
                setErrorMsg('Error fetching location: ' + error.message);
            }
        };

        getLocation();
    }, []);

    const handleSearchLocation = async () => {
        try {
            const geocodedLocation = await Location.geocodeAsync(searchText);
            if (geocodedLocation.length > 0) {
                const { latitude, longitude } = geocodedLocation[0];
                setDestinationCoords({ latitude, longitude });
                setMapCenter({ latitude, longitude });
            } else {
                alert("Location not found");
            }
        } catch (error) {
            console.error('Error fetching destination coordinates: ', error);
            setErrorMsg('Error fetching destination: ' + error.message);
        }
    };

    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            toggleMapSize();
        } else {
            lastTap = now;
        }
    };

    const toggleMapSize = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
        setMapHeight(isExpanded ? 300 : '100%');
    };

    const boxData = [
        { id: '1', title: 'Intercity', navigateTo: 'Intercity', image: require('../../../assets/images/icons/intercity.png') },
        { id: '2', title: 'Parcels', navigateTo: 'Parcel', image: require('../../../assets/images/icons/parcel.png') },
        { id: '3', title: 'Rentals', navigateTo: 'Rentals', image: require('../../../assets/images/icons/rentals.png') },
        { id: '4', title: 'Reserve', navigateTo: 'Reserved', image: require('../../../assets/images/icons/reserved.png') },
        { id: '5', title: 'View More >', navigateTo: 'ServicesScreen', isViewMore: true },
    ];

    const renderBoxItem = ({ item }) => {
        if (item.isViewMore) {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.navigateTo)}  
                    style={styles.viewMoreContainer}
                >
                    <Text style={styles.viewMoreText}>{item.title}</Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={styles.boxWrapper}>
                <TouchableOpacity
                    style={[styles.box, boxPress === item.id && styles.boxPressed]}
                    onPress={() => {
                        item.navigateTo === 'EnterLocation' ? navigation.navigate(item.navigateTo, { currentLocation, searchText }) : navigation.navigate(item.navigateTo);
                    }}
                    onPressIn={() => setBoxPress(item.id)}
                    onPressOut={() => setBoxPress(null)}
                >
                    {item.image && (
                        <Image source={item.image} style={styles.boxImage} />
                    )}
                </TouchableOpacity>
                <Text style={styles.boxTextOutside}>{item.title}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TouchableWithoutFeedback onPress={handleDoubleTap}>
                <View style={[styles.mapContainer, { height: mapHeight }]}>
                    <AppMapView
                        style={styles.map}
                        destinationCoords={destinationCoords}
                        centerCoords={mapCenter}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('EnterLocation', { currentLocation })} style={styles.searchBackground}>
                        <TextInput
                            style={styles.currentLocation}
                            placeholder="Your Current Location"
                            placeholderTextColor="white"
                            value={currentLocation}
                            editable={false}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('EnterLocation', { currentLocation })} style={[styles.searchBackground, { marginTop:57 }]}>
                        <TextInput
                            style={styles.Destination}
                            placeholder="Enter Destination"
                            placeholderTextColor="white"
                            editable={false}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>

            <FlatList
                data={boxData}
                renderItem={renderBoxItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.boxContainer}
            />



            {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
            <View style={styles.PromotionHeaderContainer}>
            <View style={styles.promotionContainer}>
                <Image source={require('../../../assets/images/otherImages/LoansAPP.png')} style={styles.promoImage} />
                <Text style={styles.promoText}>Download our Loan App for easy credit access!</Text>
            </View>
            
            <View style={styles.promotionContainer}>
                <Image source={require('../../../assets/images/otherImages/DriverAPP1.png')} style={styles.promoImage} />
                <Text style={styles.promoText}>Earn by installing Just Tap Earner app!</Text>
            </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white',
        
    },
    
    
    mapContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 5,
    },
    map: {
        flex: 1,
    },
    searchBackground: {
        marginTop:10,
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -150 }],
        backgroundColor: 'white',
        borderColor: '#0F4A97',
        borderWidth: 3,
        borderRadius: 25,
        height: 45,
        width: 300,
        zIndex: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentLocation: {
        height: 35,
        width: 290,
        borderColor: '#0F4A97',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#0F4A97',
        paddingHorizontal: 15,
        color: 'white',
    },
    Destination: {
        height: 35,
        width: 290,
        borderColor: '#0F4A97',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#0F4A97',
        paddingHorizontal: 15,
        color: 'white',
    },
    boxContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    boxWrapper: {
        alignItems: 'center',
        marginRight: 10,
    },
    box: {
        backgroundColor: '#0F4A97',
        borderRadius: 10,
        padding: 20,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    boxImage:{
        width : 80,
        height: 80,
        borderRadius: 10,
        backgroundColor:'white'
    },
    boxPressed: {
        backgroundColor: '#0F4A97',
    },
    boxTextOutside: {
        color: '#0F4A97',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    viewMoreContainer: {
        alignItems: 'center',
        marginLeft: 10,
        marginTop: -25
    },
    viewMoreText: {
        color: '#0F4A97',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    PromotionHeaderContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    promotionContainer: {
       
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#0f4a97',
        borderWidth: 2,
        padding: 15,
        margin: 10,
        alignItems: 'center',
        width: '90%'
    },
    promoImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    promoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});

export default HomePage;
