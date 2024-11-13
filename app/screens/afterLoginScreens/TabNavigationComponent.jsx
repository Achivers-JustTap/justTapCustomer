// app/screens/afterLoginScreens/TabNavigation.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomePage from './HomePage'; 
import ParcelScreen from './ParcelScreen'; 
import Activity from './Activity';
import Menu from './Menu'; 
import Profile from './Profile'; 

const iconMapping = {
  Home: { name: 'home', family: 'FontAwesome5' },
  Parcel: { name: 'box', family: 'FontAwesome5' },
  Activity: { name: 'calendar-alt', family: 'FontAwesome5' },
  Menu: { name: 'bars', family: 'FontAwesome5' },
  Profile: { name: 'user', family: 'FontAwesome5' },
};

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const { name } = iconMapping[route.name];
          return <Icon name={name} size={size} color={color} solid={focused} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#ACC3E1',
        tabBarStyle: { 
          backgroundColor: '#0F4A97', 
          height: 60, 
          paddingBottom: 5,
        },
        tabBarLabelStyle: { 
          color: 'white',
          paddingBottom: 0,
        },
        headerShown: false, 
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Parcel" component={ParcelScreen} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default TabNavigation;
