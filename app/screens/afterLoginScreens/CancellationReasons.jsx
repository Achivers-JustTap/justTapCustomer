import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    TouchableOpacity, 
    TextInput 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CancellationReasons = ({ navigation }) => {
    const reasons = [
        "Driver is taking too long",
        "Change of plans",
        "Found another ride",
        "Price is too high",
        "Safety concerns",
        "Other"
    ];

    const [selectedReason, setSelectedReason] = useState(null);
    const [customReason, setCustomReason] = useState('');

    const handleConfirmCancellation = () => {
        if (selectedReason === "Other" && customReason.trim() === '') {
            alert("Please enter a reason for cancellation.");
            return;
        }

        navigation.navigate('HomeTabs');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Why are you cancelling?</Text>

            <View style={styles.reasonList}>
                {reasons.map((reason, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[
                            styles.reasonButton, 
                            selectedReason === reason && styles.selectedReason
                        ]}
                        onPress={() => setSelectedReason(reason)}
                    >
                        <Text style={styles.reasonText}>{reason}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {selectedReason === "Other" && (
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your reason..."
                    value={customReason}
                    onChangeText={setCustomReason}
                />
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.confirmButton} 
                    onPress={handleConfirmCancellation}
                >
                    <Text style={styles.confirmButtonText}>Unconfirm Trip</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.goBackButton} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.goBackButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CancellationReasons;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
      marginTop:15,
        backgroundColor: '#0F4A97',
        padding: 7,
        borderRadius: 5,
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reasonList: {
        marginBottom: 20,
    },
    reasonButton: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    selectedReason: {
        borderColor: '#0F4A97',
        backgroundColor: '#E6F0FF',
    },
    reasonText: {
        fontSize: 16,
    },
    textInput: {
        backgroundColor: '#FFF',
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    confirmButton: {
        backgroundColor: '#FF6347',
        padding: 15,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    goBackButton: {
        backgroundColor: '#CCC',
        padding: 15,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
    },
    goBackButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
