import React from 'react';
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Alert } from 'react-native';
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


    const settingsData = [
        {
            title: '',
            data: [
                { subheading: 'Profile Header', type: 'header' },
            ],
        },
        {
            title: 'App Settings',
            data: [
                { subheading: 'Add Home', isSimple: true },
                { subheading: 'Add Work', isSimple: true },
                { subheading: 'Shortcuts', isSimple: true },
                { subheading: 'Privacy', subcontent: ['Manage the data you share with us'], isSimple: true },
                { subheading: 'Appearance', subcontent: ['Use device settings'], isSimple: true },
                { subheading: 'Invoice Information', subcontent: ['Manage your tax invoices information'], isSimple: true },
                { subheading: 'Communication', subcontent: ['Choose your preferred contact methods', 'Manage your notification settings'], isSimple: true },
            ],
        },
        {
            title: 'Safety',
            data: [
                { subheading: 'Safety Preferences', subcontent: ['Choose and schedule your favorite safety tools'], isSimple: true },
                { subheading: 'Manage Trusted Contacts', subcontent: ['Share your trip status with family and friends with a single tap'], isSimple: true },
                { subheading: 'RideCheck', subcontent: ['Manage your RideCheck notifications'], isSimple: true },
            ],
        },
        {
            title: 'Ride Preferences',
            data: [
                { subheading: 'Reserve', subcontent: ['Choose how you\'re matched with drivers when you book ahead'], isSimple: true },
                { subheading: 'Driver Nearby Alert', subcontent: ['Manage how you want to be notified during pick-ups with long waits'], isSimple: true },
            ],
        },
        {
            title: '',
            data: [
                { subheading: 'Logout', type: 'logout' },
            ],
        },
    ];

    const renderItem = ({ item }) => {
        if (item.type === 'header') {
            return (
                <View style={styles.profileHeaderContainer}>
                    <Text style={styles.profileHeader}>Profile (add name from backend)</Text>
                    <Icon name="person-circle-outline" size={60} color="#0F4A97" style={styles.profileIcon} />
                </View>
            );
        }
        if (item.type === 'logout') {
            return (
                <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
                    <Icon name="log-out-outline" size={24} color="red" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.listItem}>
                <View style={styles.row}>
                    <Text style={[styles.subheading, styles.boldText]}>{item.subheading}</Text>
                    <Icon name="chevron-forward-outline" size={18} color="#555" />
                </View>
                {item.subcontent && (
                    <View style={styles.subcontentContainer}>
                        {item.subcontent.map((content, index) => (
                            <Text key={index} style={[styles.subcontent, styles.lightBlueText]}>
                                {content}
                            </Text>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    const renderSectionHeader = ({ section }) => (
        section.title ? <Text style={styles.header}>{section.title}</Text> : null
    );

    return (
        <View style={styles.container}>
            
            <SectionList
                sections={settingsData}
                keyExtractor={(item, index) => `${item.subheading}-${index}`}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    profileHeader: {
        fontSize: 24,
        color: '#0F4A97',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    profileIcon: {
        marginRight: 20,
    },
    list: {
        top: 30,
        padding: 20,
        paddingBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#0F4A97',
    },
    listItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subheading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F4A97',
    },
    subcontentContainer: {
        marginTop: 4,
    },
    subcontent: {
        fontSize: 14,
        color: '#555',
        textAlign: 'left',
        marginLeft: 0,
    },
    lightBlueText: {
        color: '#7590b4',
        fontWeight: 'bold',
    },
    boldText: {
        fontWeight: 'bold',
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        marginVertical: 20,
    },
    logoutText: {
        fontSize: 18,
        color: 'red',
        marginLeft: 8,
    },
});

export default Profile;
