import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 

const Icons = {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
};

const Menu = ({ navigation }) => { 

  const menuItems = [
    { id: '1', title: 'Services', icon: 'view-dashboard-outline', type: 'MaterialCommunityIcons', route: 'ServicesScreen' },
    { id: '2', title: 'Be a JustTap Earner', icon: 'car', type: 'FontAwesome', route: 'DriverRegistration' },
    { id: '3', title: 'Payment Methods', icon: 'credit-card', type: 'FontAwesome', route: 'PaymentMethods' },
    { id: '4', title: 'Insurance', icon: 'shield', type: 'FontAwesome', route: 'Insurance' },
    { id: '5', title: 'Messages', icon: 'envelope', type: 'FontAwesome', route: 'Messages' },
    { id: '6', title: 'Send a gift', icon: 'gift', type: 'FontAwesome', route: 'SendGift' },
    { id: '7', title: 'Manage Account', icon: 'user', type: 'FontAwesome', route: 'Profile' },
    { id: '8', title: 'Help', icon: 'question-circle', type: 'FontAwesome', route: 'Help' },
    { id: '9', title: 'Legal', icon: 'gavel', type: 'FontAwesome', route: 'Legal' },
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
