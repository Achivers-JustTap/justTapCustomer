import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "axios";

const RatingPage = ({ navigation }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [rideId, setRideId] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const [driverId, setDriverId] = useState(null);
     

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get('http://192.168.29.13:5000/rides');

                const { rideId, customerId, driverId } = response.data;  

                setRideId(rideId);
                setCustomerId(customerId);
                setDriverId(driverId);
            } catch (error) {
                console.error("Error fetching ride details:", error);
                Alert.alert("Error", "Failed to fetch ride details.");
            }
        };

        fetchDetails();
    }, []);


    const handleSubmitRating = async () => {
        if (rating === 0) {
            Alert.alert("Please select a rating before submitting.");
            return;
        }

        if (!review) {
            Alert.alert("Please write a review before submitting.");
            return;
        }

        try {
            const response = await axios.post('http://192.168.29.13:5000/rating/rate', {
                rideId,
                customerId,
                driverId,
                rating,
                review,
            });

            Alert.alert("Success", "Rating submitted successfully!");
            navigation.navigate('HomeTabs');
        } catch (error) {
            Alert.alert("Error", "Failed to submit rating. Please try again.");
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rate Your Ride</Text>
            <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <Icon 
                            name={star <= rating ? "star" : "star-outline"} 
                            size={40} 
                            color="gold" 
                            style={styles.star} 
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <TextInput
                style={styles.input}
                placeholder="Write a review..."
                value={review}
                onChangeText={setReview}
                multiline
            />
            <TouchableOpacity onPress={handleSubmitRating} style={styles.submitButton}>
                <Text style={styles.submitText}>Submit Rating</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    star: {
        marginHorizontal: 5,
    },
    submitButton: {
        backgroundColor: '#0F4A97',
        padding: 10,
        borderRadius: 5,
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RatingPage;
