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
import YourTrip from './app/screens/ActivityScreens/YourTrip';
import YourReserved from './app/screens/ActivityScreens/YourReserved';
import RebookScreen from './app/screens/ActivityScreens/RebookScreen';
import AddHomePage from './app/screens/ProfileScreens/AppSettingsScreens/AddHomePage';
import AddWorkPage from './app/screens/ProfileScreens/AppSettingsScreens/AddWorkPage';
import ShortcutsPage from './app/screens/ProfileScreens/AppSettingsScreens/ShortcutsPage';
import PrivacyPage from './app/screens/ProfileScreens/AppSettingsScreens/PrivacyPage';
import AppearancePage from './app/screens/ProfileScreens/AppSettingsScreens/AppearancePage';
import InvoiceInformationPage from './app/screens/ProfileScreens/AppSettingsScreens/InvoiceInformationPage';
import CommunicationPage from './app/screens/ProfileScreens/AppSettingsScreens/CommunicationPage';
import SafetyPreferencePage from './app/screens/ProfileScreens/SafetyScreens/SafetyPreferencePage';
import ManageTrustedContactsPage from './app/screens/ProfileScreens/SafetyScreens/ManageTrustedContactsPage';
import RideCheckPage from './app/screens/ProfileScreens/SafetyScreens/RideCheckPage';
import ReservePage from './app/screens/ProfileScreens/RidePreferencesScreens/ReservePage';
import DriverNearbyAlertPage from './app/screens/ProfileScreens/RidePreferencesScreens/DriverNearbyAlertPage';
import EditProfilePage from './app/screens/ProfileScreens/EditProfileScreens/EditProfilePage';
import UpdateEmailId from './app/screens/ProfileScreens/EditProfileScreens/UpdateEmailId';
import UpdateMobileNumber from './app/screens/ProfileScreens/EditProfileScreens/UpdateMobileNumber';
import Security from './app/screens/ProfileScreens/EditProfileScreens/Security';
import PrivacyAndData from './app/screens/ProfileScreens/EditProfileScreens/PrivacyAndData';



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

       {/* Activity Screens */}
       <Stack.Screen name="YourTrip" component={YourTrip} />
       <Stack.Screen name="YourReserved" component={YourReserved} />
       <Stack.Screen name="RebookScreen" component={RebookScreen} />

       {/* Profile Screens */}

       <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
       <Stack.Screen name="AddHomePage" component={AddHomePage} />
       <Stack.Screen name="AddWorkPage" component={AddWorkPage} />
       <Stack.Screen name="ShortcutsPage" component={ShortcutsPage} />
       <Stack.Screen name="PrivacyPage" component={PrivacyPage} />
       <Stack.Screen name="AppearancePage" component={AppearancePage} />
       <Stack.Screen name="InvoiceInformationPage" component={InvoiceInformationPage} />
       <Stack.Screen name="CommunicationPage" component={CommunicationPage} />
       <Stack.Screen name="SafetyPreferencePage" component={SafetyPreferencePage} />
       <Stack.Screen name="ManageTrustedContactsPage" component={ManageTrustedContactsPage} />
       <Stack.Screen name="RideCheckPage" component={RideCheckPage} />
       <Stack.Screen name="ReservePage" component={ReservePage} />
       <Stack.Screen name="DriverNearbyAlertPage" component={DriverNearbyAlertPage} />
        {/* EditProfileScreens */}
       <Stack.Screen name="UpdateEmailId" component={UpdateEmailId} />
       <Stack.Screen name="UpdateMobileNumber" component={UpdateMobileNumber} />
       <Stack.Screen name="Security" component={Security} />
       <Stack.Screen name="PrivacyAndData" component={PrivacyAndData} />

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
