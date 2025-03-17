import React, { useState } from 'react';
import { 
  StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, Modal 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
 import Icon from 'react-native-vector-icons/Ionicons';

const ParcelDetailsPage = ({ route }) => {
  const navigation = useNavigation(); 
  const { pickupCoords, dropoffCoords,pickupName,dropoffName } = route.params;

  const isFromReceiveParcel = route.params?.fromReceiveParcel;
  const isFromPickFromStore = route.params?.fromPickFromStore;
  const { currentLocationText, destination } = route.params;
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isReceiverInfoVisible, setIsReceiverInfoVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddReceiverInfo = () => {
    if (!receiverName || !receiverPhone) {
      Alert.alert("Please enter both name and mobile number for the receiver.");
      return;
    }
    setIsReceiverInfoVisible(true);
    setModalVisible(false); // Hide modal after confirming information
  };

  const handleNext = () => {
    if (!isReceiverInfoVisible) {
      Alert.alert("Please add receiver's information before proceeding.");
      return;
    }
    
    
    navigation.navigate('LocationMapScreen', {
            pickupCoords: pickupCoords,  
            dropoffCoords: dropoffCoords, 
            pickupName: pickupName,       
            dropoffName: dropoffName,     
            receiverName: receiverName,   
            receiverPhone: receiverPhone, 
            instructions: instructions,

      
    });

  };
  if (isFromPickFromStore) {
    return(
        <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Icon name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
  
      

     
      <View style={[styles.infoBox, styles.redBox]}>
        <Text style={styles.infoTitle}>Receiver's Information</Text>
        <Text style={styles.infoText}>Location: {currentLocationText}</Text>
        <Text style={styles.infoText}>Name: John Doe</Text> 
        <Text style={styles.infoText}>Mobile: 123-456-7890</Text>
        
       
      </View>

      <View style={[styles.infoBox, styles.greenBox]}>
        <Text style={styles.infoTitle}>Store Information</Text>
        <Text style={styles.infoText}>Location: {destination}</Text>
        {isReceiverInfoVisible ? (
          <>
            <Text style={styles.infoText}>Name: {receiverName}</Text>
            <Text style={styles.infoText}>Mobile: {receiverPhone}</Text>
            {instructions && <Text style={styles.infoText}>Instructions: {instructions}</Text>}
          </>
        ) : (
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginTop: 10, backgroundColor: 'green', padding: 10, borderRadius: 5,alignItems: 'center',}}>
            <Text style={styles.addButtonText}>+ Add Information</Text>
          </TouchableOpacity>
        )}
      </View>

          <View>
                <Text style={{fontSize: 12, textAlign:'justify'}}>1. Make sure that you enter mobile number of the receiver and sender.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>2. If you send or receive package on 2 wheeler the weight should not exceed 5kgs and if 3 wheeler then weight should not exceed 10kgs.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>3. Our Delivery Partners will not buy things on behave of you.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>4. Before Loading parcel into vehicle make sure that it is Packed well beforehand the delivery Partner arrives.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>5. Package should not contain should be ₹5000 or less and it should not be glass items or any delicate items</Text>
         </View>

      {/* Next Button */}
      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Modal for Adding Receiver Info */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Store Information</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Store Name" 
              onChangeText={setReceiverName} 
              value={receiverName}
            />
            <TextInput 
              style={styles.input}
              placeholder="Store's Mobile Number" 
              keyboardType="phone-pad"
              onChangeText={setReceiverPhone} 
              value={receiverPhone}
            />
            <TextInput 
              style={[styles.input, { height: 100 }]} 
              placeholder="Instructions to Delivery Partner (Optional)" 
              onChangeText={setInstructions} 
              value={instructions}
              multiline
            />

            
            <TouchableOpacity onPress={handleAddReceiverInfo} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    );
  };


  

  if (isFromReceiveParcel) {
    return(
        <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Icon name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
  
      

     
      <View style={[styles.infoBox, styles.redBox]}>
        <Text style={styles.infoTitle}>Receiver's Information</Text>
        <Text style={styles.infoText}>Location: {currentLocationText}</Text>
        <Text style={styles.infoText}>Name: John Doe</Text> 
        <Text style={styles.infoText}>Mobile: 123-456-7890</Text>
        
       
      </View>

      <View style={[styles.infoBox, styles.greenBox]}>
        <Text style={styles.infoTitle}>Sender's Information</Text>
        <Text style={styles.infoText}>Location: {destination}</Text>
        {isReceiverInfoVisible ? (
          <>
            <Text style={styles.infoText}>Name: {receiverName}</Text>
            <Text style={styles.infoText}>Mobile: {receiverPhone}</Text>
            {instructions && <Text style={styles.infoText}>Instructions: {instructions}</Text>}
          </>
        ) : (
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginTop: 10, backgroundColor: 'green', padding: 10, borderRadius: 5,alignItems: 'center',}}>
            <Text style={styles.addButtonText}>+ Add Information</Text>
          </TouchableOpacity>
        )}
      </View>

          <View>
                <Text style={{fontSize: 12, textAlign:'justify'}}>1. Make sure that you enter mobile number of the receiver and sender.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>2. If you send or receive package on 2 wheeler the weight should not exceed 5kgs and if 3 wheeler then weight should not exceed 10kgs.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>3. Our Delivery Partners will not buy things on behave of you.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>4. Before Loading parcel into vehicle make sure that it is Packed well beforehand the delivery Partner arrives.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>5. Package should not contain should be ₹5000 or less and it should not be glass items or any delicate items</Text>
         </View>

      {/* Next Button */}
      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Modal for Adding Receiver Info */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Receiver's Information</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Receiver's Name" 
              onChangeText={setReceiverName} 
              value={receiverName}
            />
            <TextInput 
              style={styles.input}
              placeholder="Receiver's Mobile Number" 
              keyboardType="phone-pad"
              onChangeText={setReceiverPhone} 
              value={receiverPhone}
            />
            <TextInput 
              style={[styles.input, { height: 100 }]} 
              placeholder="Instructions to Delivery Partner (Optional)" 
              onChangeText={setInstructions} 
              value={instructions}
              multiline
            />

            
            <TouchableOpacity onPress={handleAddReceiverInfo} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Icon name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
  
      <View style={[styles.infoBox, styles.greenBox]}>
        <Text style={styles.infoTitle}>Sender's Information</Text>
        <Text style={styles.infoText}>Location: {currentLocationText}</Text>
        <Text style={styles.infoText}>Name: John Doe</Text> 
        <Text style={styles.infoText}>Mobile: 123-456-7890</Text>
      </View>

      {/* Receiver Information Box */}
      <View style={[styles.infoBox, styles.redBox]}>
        <Text style={styles.infoTitle}>Receiver's Information</Text>
        <Text style={styles.infoText}>Location: {destination}</Text>
        {isReceiverInfoVisible ? (
          <>
            <Text style={styles.infoText}>Name: {receiverName}</Text>
            <Text style={styles.infoText}>Mobile: {receiverPhone}</Text>
            {instructions && <Text style={styles.infoText}>Instructions: {instructions}</Text>}
          </>
        ) : (
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Information</Text>
          </TouchableOpacity>
        )}
      </View>

          <View>
                <Text style={{fontSize: 12, textAlign:'justify'}}>1. Make sure that you enter mobile number of the receiver and sender.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>2. If you send or receive package on 2 wheeler the weight should not exceed 5kgs and if 3 wheeler then weight should not exceed 10kgs.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>3. Our Delivery Partners will not buy things on behave of you.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>4. Before Loading parcel into vehicle make sure that it is Packed well beforehand the delivery Partner arrives.</Text>
                <Text style={{fontSize: 12,textAlign:'justify'}}>5. Package should not contain should be ₹5000 or less and it should not be glass items or any delicate items</Text>
         </View>

      {/* Next Button */}
      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Modal for Adding Receiver Info */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Receiver's Information</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Receiver's Name" 
              onChangeText={setReceiverName} 
              value={receiverName}
            />
            <TextInput 
              style={styles.input}
              placeholder="Receiver's Mobile Number" 
              keyboardType="phone-pad"
              onChangeText={setReceiverPhone} 
              value={receiverPhone}
            />
            <TextInput 
              style={[styles.input, { height: 100 }]} 
              placeholder="Instructions to Delivery Partner (Optional)" 
              onChangeText={setInstructions} 
              value={instructions}
              multiline
            />

            
            <TouchableOpacity onPress={handleAddReceiverInfo} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginTop: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
},
backButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
},
  infoBox: {
    padding: 10,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20
  },
  greenBox: {
    borderColor: 'green',
    borderWidth: 2,
  },
  redBox: {
    borderColor: 'red',
    borderWidth: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#ff4c4c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '50%',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ParcelDetailsPage;
