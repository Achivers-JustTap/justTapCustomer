import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation }) => {

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    onPress: () => {
                        navigation.replace('Login');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>

            <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
                <Icon name="log-out-outline" size={24} color="red" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    logoutContainer: {
        flexDirection: 'row', 
        alignItems: 'center',  
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
    logoutText: {
        fontSize: 18,
        color: 'red',
        marginLeft: 8,  
    },
});

export default Profile;
