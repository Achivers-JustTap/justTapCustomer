// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreens from './app/screens/SignUpScreens/WelcomeScreens';
import SignUpPage from './app/screens/SignUpScreens/SignUpPage';
import Login from './app/screens/SignUpScreens/Login';
import OtpPage from './app/screens/SignUpScreens/OtpPage';
import TabNavigationComponent from './app/screens/afterLoginScreens/TabNavigationComponent';
import { useState } from 'react';
import { UserLocationProvider } from './app/Context/UserLocationContext';
import DisplayScreen from './app/screens/afterLoginScreens/DisplayScreen';
import ServicesScreen from './app/screens/Services/ServicesScreen';
import Intercity from './app/screens/Services/Intercity';
import Rentals from './app/screens/Services/Rentals';
import Reserved from './app/screens/Services/Reserved';
import DriverRegistration from './app/screens/MenuScreens.jsx/DriverRegistration';
import PaymentMethods from './app/screens/MenuScreens.jsx/PaymentMethods';
import Insurance from './app/screens/MenuScreens.jsx/Insurance';
import Messages from './app/screens/MenuScreens.jsx/Messages';
import SendGift from './app/screens/MenuScreens.jsx/SendGift';
import SetUpDrivingorDelivering from './app/screens/MenuScreens.jsx/SetUpDrivingorDelivering';
import Help from './app/screens/MenuScreens.jsx/Help';
import Legal from './app/screens/MenuScreens.jsx/Legal';
import EnterLocation from './app/screens/afterLoginScreens/EnterLocation';
import LocationMapScreen from './app/screens/afterLoginScreens/LocationMapScreen';
import BookingScreen from './app/screens/afterLoginScreens/BookingScreen';
import screen1 from './app/SplashScreens/screen1';



const Stack = createStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  return (
    <UserLocationProvider>
    <NavigationContainer>
      <Stack.Navigator>
        {/* Screens before authentication */}
        <Stack.Screen name="screen1" component={screen1} options={{headerShown:false}} />
        <Stack.Screen name="WelcomeScreens" component={WelcomeScreens} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OtpPage" component={OtpPage} />
        <Stack.Screen name="DisplayScreen" component={DisplayScreen} />

        {/* After authentication, the user goes to the Tab navigator */}
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigationComponent}
          options={{ headerShown: false }} 
        />
       <Stack.Screen name="EnterLocation" component={EnterLocation} />
       <Stack.Screen name="LocationMapScreen" component={LocationMapScreen} />
       <Stack.Screen name="BookingScreen" component={BookingScreen} />
       <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
       <Stack.Screen name="Intercity" component={Intercity} />
       <Stack.Screen name="Rentals" component={Rentals} />
       <Stack.Screen name="Reserved" component={Reserved} />
       <Stack.Screen name="DriverRegistration" component={DriverRegistration} />
       <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
       <Stack.Screen name="Insurance" component={Insurance} />
       <Stack.Screen name="Messages" component={Messages} />
       <Stack.Screen name="SendGift" component={SendGift} />
       <Stack.Screen name="SetUpDrivingDelivering" component={SetUpDrivingorDelivering} />
       <Stack.Screen name="Help" component={Help} />
       <Stack.Screen name="Legal" component={Legal} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserLocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
