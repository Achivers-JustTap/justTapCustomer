// App.js
import { Provider } from 'react-redux'; 
import customerStore from './storemanagement_customer/customerStore';
import { StatusBar } from 'expo-status-bar';
import SocketProvider from './app/Context/SocketContext';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './app/Context/ThemeContext'
import WelcomeScreens from './app/screens/SignUpScreens/WelcomeScreens';
import SignUpPage from './app/screens/SignUpScreens/SignUpPage';
import Login from './app/screens/SignUpScreens/Login';
import OtpPage from './app/screens/SignUpScreens/OtpPage';
import TabNavigationComponent from './app/screens/afterLoginScreens/TabNavigationComponent';
import { useState} from 'react';
import { UserLocationProvider } from './app/Context/UserLocationContext';
import { UserProvider } from './app/Context/UserContext';
import DisplayScreen from './app/screens/afterLoginScreens/DisplayScreen';
import ServicesScreen from './app/screens/Services/ServicesScreen';
import Intercity from './app/screens/Services/Intercity';
import Rentals from './app/screens/Services/Rentals';
import Reserved from './app/screens/Services/Reserved';
import DriverRegistration from './app/screens/MenuScreens.jsx/DriverRegistration';
import PaymentMethods from './app/screens/MenuScreens.jsx/PaymentMethods';
import Insurance from './app/screens/MenuScreens.jsx/Insurance';
import Messages from './app/screens/MenuScreens.jsx/Messages';
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
import AppearancePage from './app/screens/ProfileScreens/AppSettingsScreens/AppearancePage';
import CommunicationPage from './app/screens/ProfileScreens/AppSettingsScreens/CommunicationPage';
import SafetyPreferencePage from './app/screens/ProfileScreens/SafetyScreens/SafetyPreferencePage';
import ManageTrustedContactsPage from './app/screens/ProfileScreens/SafetyScreens/ManageTrustedContactsPage';
import RideCheckPage from './app/screens/ProfileScreens/SafetyScreens/RideCheckPage';
import DriverNearbyAlertPage from './app/screens/ProfileScreens/RidePreferencesScreens/DriverNearbyAlertPage';
import EditProfilePage from './app/screens/ProfileScreens/EditProfileScreens/EditProfilePage';
import UpdateEmailId from './app/screens/ProfileScreens/EditProfileScreens/UpdateEmailId';
import UpdateMobileNumber from './app/screens/ProfileScreens/EditProfileScreens/UpdateMobileNumber';
import Security from './app/screens/ProfileScreens/EditProfileScreens/Security';
import PrivacyAndData from './app/screens/ProfileScreens/EditProfileScreens/PrivacyAndData';
import ChangePasswordsPage from './app/screens/ProfileScreens/EditProfileScreens/SecurityScreens/ChangePasswordsPage';
import AuthenticationsPage from './app/screens/ProfileScreens/EditProfileScreens/SecurityScreens/AuthenticationsPage';
import TwoStepVerification from './app/screens/ProfileScreens/EditProfileScreens/SecurityScreens/TwoStepVerification';
import FeedbackAndReport from './app/screens/ProfileScreens/EditProfileScreens/SecurityScreens/FeedbackAndReport';
import RatingPage from './app/screens/afterLoginScreens/RatingPage';
import WaitingForCaptainScreen from './app/screens/afterLoginScreens/WaitingForCaptainScreen';
import RideConfirmedPage from './app/screens/afterLoginScreens/RideConfirmedPage';
import DriverArrivingPage from './app/screens/afterLoginScreens/DriverArrivingPage';
import RideTrackingScreen from './app/screens/afterLoginScreens/RideTrackingScreen';
import SendParcel from './app/screens/Services/ParcelScreens/SendParcel';
import ReceiveParcel from './app/screens/Services/ParcelScreens/ReceiveParcel';
import PickFromStore from './app/screens/Services/ParcelScreens/PickFromStore';
import ParcelDetailsPage from './app/screens/Services/ParcelScreens/ParcelDetailsPage';
import ReceiptPage from './app/screens/ActivityScreens/ReceiptPage';
import InvoicePage from './app/screens/ActivityScreens/InvoicePage';
import AddMoneyScreen from './app/screens/PaymentMethodsScreens/AddMoneyScreen';
import AddMoneyEnterUpi from './app/screens/PaymentMethodsScreens/AddMoneyEnterUpi';
import AddMoneyUPI from './app/screens/PaymentMethodsScreens/AddMoneyUPI';
import PaymentMethodSelection from './app/screens/PaymentMethodsScreens/PaymentMethodSelection';
import TransactionRecord from './app/screens/PaymentMethodsScreens/TransactionRecord';
import LoansRegistration from './app/screens/MenuScreens.jsx/LoansRegistration';
import ReferFriends from './app/screens/MenuScreens.jsx/ReferFriends';
import LanguagePreference from './app/screens/ProfileScreens/AppSettingsScreens/LanguagePreference';
import LocationPinScreen from './app/screens/afterLoginScreens/LocationPinScreen';
import CancellationReasons from './app/screens/afterLoginScreens/CancellationReasons';



const Stack = createStackNavigator();

const AppContent = () => {
  const { isDarkMode } = useTheme(); 


  return (
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
       <Stack.Screen name="LocationPinScreen" component={LocationPinScreen} />
       <Stack.Screen name="WaitingForCaptainScreen" component={WaitingForCaptainScreen} />
       <Stack.Screen name="CancellationReasons" component={CancellationReasons} options={{headerShown:false}} />
       <Stack.Screen name="RideConfirmedPage" component={RideConfirmedPage} />
       <Stack.Screen name="DriverArrivingPage" component={DriverArrivingPage} />
       <Stack.Screen name="RideTrackingScreen" component={RideTrackingScreen} />
       <Stack.Screen name="RatingPage" component={RatingPage} />
       <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
       <Stack.Screen name="Intercity" component={Intercity} />
       <Stack.Screen name="Rentals" component={Rentals} />
       <Stack.Screen name="Reserved" component={Reserved} />

       {/* menu Screens */}
       <Stack.Screen name="DriverRegistration" component={DriverRegistration} />
       <Stack.Screen name="LoansRegistration" component={LoansRegistration} />
       <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
       <Stack.Screen name="Insurance" component={Insurance} />
       <Stack.Screen name="Messages" component={Messages} />
       <Stack.Screen name="ReferFriends" component={ReferFriends} />
       <Stack.Screen name="Help" component={Help} />
       <Stack.Screen name="Legal" component={Legal} />

       {/* parcelsScreens */}
       <Stack.Screen name="SendParcel" component={SendParcel} options={{headerShown:false}} />
       <Stack.Screen name="ReceiveParcel" component={ReceiveParcel} options={{headerShown:false}} />
       <Stack.Screen name="PickFromStore" component={PickFromStore} options={{headerShown:false}} />
       <Stack.Screen name="ParcelDetailsPage" component={ParcelDetailsPage} options={{headerShown:false}} />

       {/* Activity Screens */}
       <Stack.Screen name="YourTrip" component={YourTrip} />
       <Stack.Screen name="YourReserved" component={YourReserved} />
       <Stack.Screen name="RebookScreen" component={RebookScreen} />
       <Stack.Screen name="ReceiptPage" component={ReceiptPage} options={{headerShown:false}} />
       <Stack.Screen name="InvoicePage" component={InvoicePage} options={{headerShown:false}}/>

       {/* Profile Screens */}

       <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
       <Stack.Screen name="AddHomePage" component={AddHomePage} />
       <Stack.Screen name="AddWorkPage" component={AddWorkPage} />
       <Stack.Screen name="ShortcutsPage" component={ShortcutsPage} />

       <Stack.Screen name="LanguagePreference" component={LanguagePreference} />
       <Stack.Screen name="AppearancePage" component={AppearancePage} />
       <Stack.Screen name="CommunicationPage" component={CommunicationPage} />
       <Stack.Screen name="SafetyPreferencePage" component={SafetyPreferencePage} />
       <Stack.Screen name="ManageTrustedContactsPage" component={ManageTrustedContactsPage} />
       <Stack.Screen name="RideCheckPage" component={RideCheckPage} />
       
       <Stack.Screen name="DriverNearbyAlertPage" component={DriverNearbyAlertPage} />
        {/* EditProfileScreens */}
       <Stack.Screen name="UpdateEmailId" component={UpdateEmailId} />
       <Stack.Screen name="UpdateMobileNumber" component={UpdateMobileNumber} />
       <Stack.Screen name="Security" component={Security} />
       <Stack.Screen name="PrivacyAndData" component={PrivacyAndData} />

        {/* SecurityScreens */}
        <Stack.Screen name="ChangePasswordsPage" component={ChangePasswordsPage} />
       <Stack.Screen name="AuthenticationsPage" component={AuthenticationsPage} />
       <Stack.Screen name="TwoStepVerification" component={TwoStepVerification} />
       <Stack.Screen name="FeedbackAndReport" component={FeedbackAndReport} />

       {/* PaymentMethodsScreens */}
       <Stack.Screen name="AddMoneyScreen" component={AddMoneyScreen} />
       <Stack.Screen name="AddMoneyUPI" component={AddMoneyUPI} />
       <Stack.Screen name="AddMoneyEnterUpi" component={AddMoneyEnterUpi} />
       <Stack.Screen name="PaymentMethodSelection" component={PaymentMethodSelection} />
       <Stack.Screen name="TransactionRecord" component={TransactionRecord} />

      </Stack.Navigator>
    </NavigationContainer>
   


  );
}

export default function App() {
  const [location, setLocation] = useState(null);

  return (
    <ThemeProvider>
      <Provider store={customerStore}>
        <UserLocationProvider>
          <UserProvider>
            <SocketProvider>
              <AppContent /> 
            </SocketProvider> 
          </UserProvider>
        </UserLocationProvider>
      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
});
