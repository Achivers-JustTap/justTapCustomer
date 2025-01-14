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
                { subheading: 'Profile Header', type: 'header', iconName: 'person-circle-outline' },
            ],
        },
        {
            title: 'App Settings',
            data: [
                { subheading: 'Add Home', isSimple: true, iconName: 'home-outline', route: 'AddHomePage' },
                { subheading: 'Add Work', isSimple: true, iconName: 'briefcase-outline', route: 'AddWorkPage' },
                { subheading: 'Shortcuts', isSimple: true, iconName: 'flash-outline', route: 'ShortcutsPage' },
                { subheading: 'Privacy', subcontent: ['Manage the data you share with us'], isSimple: true, iconName: 'lock-closed-outline' ,route: 'PrivacyPage'},
                { subheading: 'Appearance', subcontent: ['Use device settings'], isSimple: true, iconName: 'color-palette-outline',route: 'AppearancePage' },
                { subheading: 'Invoice Information', subcontent: ['Manage your tax invoices information'], isSimple: true, iconName: 'document-text-outline',route: 'InvoiceInformationPage' },
                { subheading: 'Communication', subcontent: ['Choose your preferred contact methods', 'Manage your notification settings'], isSimple: true, iconName: 'chatbubble-ellipses-outline',route: 'CommunicationPage' },
            ],
        },
        {
            title: 'Safety',
            data: [
                { subheading: 'Safety Preferences', subcontent: ['Choose and schedule your favorite safety tools'], isSimple: true, iconName: 'shield-outline', route: 'SafetyPreferencePage' },
                { subheading: 'Manage Trusted Contacts', subcontent: ['Share your trip status with family and friends with a single tap'], isSimple: true, iconName: 'people-outline', route: 'ManageTrustedContactsPage' },
                { subheading: 'RideCheck', subcontent: ['Manage your RideCheck notifications'], isSimple: true, iconName: 'alert-outline',route: 'RideCheckPage' },
            ],
        },
        {
            title: 'Ride Preferences',
            data: [
                { subheading: 'Reserve', subcontent: ['Choose how you\'re matched with drivers when you book ahead'], isSimple: true, iconName: 'calendar-outline', route: 'ReservePage' },
                { subheading: 'Driver Nearby Alert', subcontent: ['Manage how you want to be notified during pick-ups with long waits'], isSimple: true, iconName: 'car-outline', route: 'DriverNearbyAlertPage' },
            ],
        },
        {
            title: '',
            data: [
                { subheading: 'Logout', type: 'logout', iconName: 'log-out-outline' },
            ],
        },
    ];

    const renderItem = ({ item }) => {
        if (item.type === 'header') {
            return (
                <View style={styles.profileHeaderContainer}>
                    <Text style={styles.profileHeader}>Profile (add name from backend)</Text>
                    <Icon name={item.iconName} size={60} color="#0F4A97" style={styles.profileIcon} />
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
});

export default Profile;
