import React from 'react';
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

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
                        navigation.replace('WelcomeScreens');
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
                { subheading: 'User Profile', type: 'header', iconName: 'person-circle-outline' },
            ],
        },
        {
            title: 'Account Settings',
            data: [
                { subheading: 'Add Home Address', isSimple: true, iconName: 'home-outline', route: 'AddHomePage' },
                { subheading: 'Add Work Address', isSimple: true, iconName: 'briefcase-outline', route: 'AddWorkPage' },
                { subheading: 'Set Up Shortcuts', isSimple: true, iconName: 'flash-outline', route: 'ShortcutsPage' },
                { subheading: 'Privacy & Data', subcontent: ['Control the information shared with us'], isSimple: true, iconName: 'lock-closed-outline', route: 'PrivacyAndData' },
                { subheading: 'Customize Appearance', subcontent: ['Use device settings to personalize the app'], isSimple: true, iconName: 'color-palette-outline', route: 'AppearancePage' },
                { subheading: 'Communication Preferences', subcontent: ['Select your preferred contact and notification methods'], isSimple: true, iconName: 'chatbubble-ellipses-outline', route: 'CommunicationPage' },
            ],
        },
        {
            title: 'Safety Features',
            data: [
                { subheading: 'Safety Preferences', subcontent: ['Choose and schedule your safety tools for protection'], isSimple: true, iconName: 'shield-outline', route: 'SafetyPreferencePage' },
                { subheading: 'Trusted Contacts', subcontent: ['Share your trip status with family or friends instantly'], isSimple: true, iconName: 'people-outline', route: 'ManageTrustedContactsPage' },
                { subheading: 'RideCheck Alerts', subcontent: ['Manage your RideCheck notifications for added safety'], isSimple: true, iconName: 'alert-outline', route: 'RideCheckPage' },
            ],
        },
        {
            title: 'Ride Preferences',
            data: [
                { subheading: 'Driver Wait Notifications', subcontent: ['Receive notifications when drivers are nearby or waiting too long'], isSimple: true, iconName: 'car-outline', route: 'DriverNearbyAlertPage' },
            ],
        },
        {
            title: '',
            data: [
                { subheading: 'Logout', type: 'logout', iconName: 'log-out-outline' },
            ],
        },
    ];
    

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Icon
                    key={i}
                    name={i <= rating ? 'star' : 'star-outline'}
                    size={20}
                    color="#FFD700"
                    style={styles.starIcon}
                />
            );
        }
        return stars;
    };

    const renderItem = ({ item }) => {
        if (item.type === 'header') {
            return (
                <View style={styles.profileHeaderContainer}>
                <View style={styles.profileInfoContainer}>
                    <Text style={styles.profileHeader}>Charitha</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>0.0</Text>
                        <View style={styles.starsContainer}>
                            {renderStars(0)} 
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfilePage')}
                    style={styles.profileIconTouchable}
                >
                    <Icon name={item.iconName} size={60} color="#0F4A97" style={styles.profileIcon} />
                </TouchableOpacity>
            </View>
            );
        }
        if (item.type === 'logout') {
            return (
                <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
                    <Icon name={item.iconName} size={24} color="red" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                    if (item.route) {
                        navigation.navigate(item.route);
                    }
                }}
            >
                <LinearGradient
                    colors={['#0F4A97', '#1E90FF']}
                    style={styles.gradientItem}
                >
                    <View style={styles.row}>
                        <Icon name={item.iconName} size={18} color="#fff" style={styles.itemIcon} />
                        <Text style={[styles.subheading, styles.boldText]}>{item.subheading}</Text>
                        <View style={{ flex: 1 }} />
                        <Icon name="chevron-forward-outline" size={18} color="#fff" />
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
                </LinearGradient>
            </TouchableOpacity>
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
        top: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    profileInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeader: {
        top: 10,
        fontSize: 24,
        color: '#0F4A97',
        fontWeight: 'bold', 
    },
    
    profileIcon: {
        marginRight: 20,
    },
    list: {
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
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    gradientItem: {
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    subheading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    subcontentContainer: {
        marginTop: 4,
    },
    subcontent: {
        fontSize: 14,
        color: '#ddd',
        textAlign: 'left',
        marginLeft: 0,
    },
    lightBlueText: {
        color: '#B0C4DE',
        fontWeight: 'bold',
    },
    boldText: {
        fontWeight: 'bold',
    },
    itemIcon: {
        marginRight: 10,
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
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    ratingText: {
        top:3.5,
        marginLeft: 5,
        fontSize: 18,
        color: '#0F4A97',
        marginBottom: 5,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    starIcon: {
        marginHorizontal: 2,
    },
});

export default Profile;
