import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Screens/Login';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';
import CreateProfile from './Screens/CreateProfile';
import CommunityTab from './Screens/Community/CommunityTab';
import AddCommunity from './Screens/Community/AddCommunity';
import AddTrip from './Screens/Trip/AddTrip';
import Friends from './Screens/Friends/Friends';
import Iternary from './Screens/Iternary/Iternary';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {

  const [email, setEmail] = useState('par76.pkar@gmail.com')
  const [trip, setTrip] = useState({
    destination: {
      lat: 19.107022,
      long: 72.827527,
      place: 'Juhu',
      locality: 'Mumbai Suburban'
    },
    interests: ['food', 'shopping'],
    arrivalDate: new Date('2023-04-19T01:25:58.323Z'),
    departureDate: new Date('2023-04-21T01:25:58.323Z')
  })
  // console.log(trip)

  const CommunityScreen = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
         <Stack.Screen name="CommunityTab">
          {props => <CommunityTab {...props} email={email} trip={trip} setEmail={setEmail} />}
        </Stack.Screen>
        <Stack.Screen name="AddCommunity">
          {props => <AddCommunity {...props} email={email} setEmail={setEmail} />}
        </Stack.Screen>
       
      </Stack.Navigator>
    )
  }

  const HomeScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}

      >
        <Tab.Screen  name="Home">
          {props => <Home {...props} email={email}  />}
        </Tab.Screen>
        <Tab.Screen name="AddTrip">
          {props => <AddTrip {...props} email={email} setTrip={setTrip} setEmail={setEmail} />}
        </Tab.Screen>
        <Tab.Screen name="Friends">
          {props => <Friends {...props} email={email} trip={trip} setEmail={setEmail} />}
        </Tab.Screen>
        <Tab.Screen name="Iternary">
          {props => <Iternary {...props} trip={trip} />}
        </Tab.Screen>
        <Tab.Screen name="Community" component={CommunityScreen} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen}>
        </Stack.Screen> */}
        <Stack.Screen name="Login">
          {props => <Login {...props} email={email} setEmail={setEmail} />}
        </Stack.Screen>
        <Stack.Screen name="CreateProfile">
          {props => <CreateProfile {...props} email={email} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
          {props => <SignUp {...props} setEmail={setEmail} />}
        </Stack.Screen>
        <Stack.Screen name="HomeScreen" component={HomeScreen}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
