import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 

const Icons = {
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
};

const Menu = ({ navigation }) => { 

  const menuItems = [
    { id: '1', title: 'Services', icon: 'view-dashboard-outline', type: 'MaterialCommunityIcons', route: 'ServicesScreen' },
    { id: '2', title: 'Be a JustTap Earner', icon: 'car', type: 'FontAwesome', route: 'DriverRegistration' },
    { id: '3', title: 'Loans', icon: 'money', type: 'FontAwesome', route: 'LoansRegistration' },
    { id: '4', title: 'Payment Methods', icon: 'credit-card', type: 'FontAwesome', route: 'PaymentMethods' },
    { id: '5', title: 'Insurance', icon: 'shield', type: 'FontAwesome', route: 'Insurance' },
    { id: '6', title: 'Messages', icon: 'envelope', type: 'FontAwesome', route: 'Messages' },
    { id: '7', title: 'Manage Account', icon: 'user', type: 'FontAwesome', route: 'Profile' },
    { id: '8', title: 'Refer Friends', icon: 'user-friends', type: 'FontAwesome5', route: 'ReferFriends' },
    { id: '9', title: 'Help', icon: 'question-circle', type: 'FontAwesome', route: 'Help' },
    { id: '10', title: 'Legal', icon: 'gavel', type: 'FontAwesome', route: 'Legal' },
  ];

  const handlePress = (route) => {
    navigation.navigate(route); 
  };

  const renderItem = ({ item }) => {
    const IconComponent = Icons[item.type]; 
    return (
      
      <TouchableOpacity style={styles.item} onPress={() => handlePress(item.route)}>
        <IconComponent name={item.icon} size={24} color="#0F4A97" style={styles.icon} />
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color:"#0F4A97", left: 5}}>Menu</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 50,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 15,
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10, 
  },
  icon: {
    marginRight: 10, 
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F4A97',
  },
});

export default Menu;
