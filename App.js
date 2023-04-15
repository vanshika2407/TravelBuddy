import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPg from './src/screens/loginPg/loginPg';
import ConfirmEmail from './src/screens/confirmEmail/confirmEmail';
import SignUp from './src/screens/signUp/signUp';
import Home from './src/screens/Home/Home';
import CommunityTab from './src/screens/CommunityTab/CommunityTab'
import AddCommunity from './src/screens/addCommunity/addCommunity';
import Reviews from './src/screens/Reviews/Reviews'
import ViewTrips  from './src/screens/ViewTrips/ViewTrips';
import Friends from './src/screens/Friends/Friends'
import FriendRequest from './src/screens/FriendRequests/FriendRequests';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="SignIn" component={LoginPg} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="confirmEmail" component={ConfirmEmail} />
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="CommunityTab" component={CommunityTab} />
     <Stack.Screen name="AddCommunity" component={AddCommunity} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="Views" component={ViewTrips} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="FriendRequests" component={FriendRequest} />
    </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F9FBFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
