import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button,ImageBackground } from 'react-native'
// import Pic from '../../../assets/background.jpg';
import HomeCard from '../Components/Card/HomePgCard';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../assets/images/TravelBuddy.png';
import axios from 'axios';
import { BASE_URL } from '../Api/BaseUrl';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import * as Location from 'expo-location';
import Pic from '../assets/images/home.png'
import Animation from './Animation/Animation'
import pic from '.././assets/images/travel.jpg'

const Home = (props) => {
  const [data, setData] = useState({ username: '', profilePhoto: '' });
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState(null);

  useEffect(() => {
    try {
      axios.post(`${BASE_URL}/get-user`, { email: props.email })
        .then(res => {
          // console.log(res.data)
          setData(res.data)
          setLoading(false)
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }
  }, [])

  // console.log("->" + data.profilePhoto)

  const SOS = () => {
    // console.log("SOS")
    console.log(getCurrentLocation())
    axios.post(`${BASE_URL}/sos`, { email: props.email, location: location })
      .then(res => {
        // console.log(res.data)
      }
    )
    .catch(error => console.log(error))
  }

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status !== 'granted') {
      throw new Error('Location permission not granted');
    }
  
    Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
      .then((location) => {
        // console.log(location.coords.latitude, location.coords.longitude)
        setLocation(location);
      })


  };

 return (
    // <LinearGradient colors={['#221e59', '#4747cd', '#192f6a']} style={styles.bb}>
      <ScrollView style={styles.bb} >
        <View style={styles.container}>
        <ImageBackground source={Pic} resizeMode="cover" style={[styles.imagee,styles.bb]}></ImageBackground>
          <View style={styles.circle}>
        <Text style={styles.title}>Welcome To!!</Text>
        <TouchableOpacity style={styles.sos} onPress={SOS}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
        </View>
        <Image source={Logo} style={styles.logo} />
        {/* <Animation></Animation> */}
        <View style={styles.Homecard}>
        <Image  style={styles.pic} source={pic}></Image>
     <Text style={styles.homeText}>Wanderlust!</Text>
    </View>
        {/* <Image source={Pic} style={styles.image}/> */}
        {!loading && data &&
          <HomeCard
            image={data.profilePhoto || 'https://firebasestorage.googleapis.com/v0/b/travelapp-2a48a.appspot.com/o/profile-pics%2Fprofile.jpg?alt=media&token=cee63649-5f2a-4080-816a-6433e5f2c3e6'}
            username={data.username} />
        }
        {
          loading && <ActivityIndicator animating={true} color={MD2Colors.white} />
        }
        </View>
        {/* <Button title="SOS" onPress={SOS} style={{ flex:1, width: 40, height: 40, backgroundColor: "red" , marginTop: 40 }} /> */}
      </ScrollView>
    // </LinearGradient>

  )
}

const styles = StyleSheet.create(
  {
    bb: {
      //backgroundColor:'#6199F7',
      // marginBottom:'100%',
      height: '100%',
    },
    container: {
      backgroundColor: '#6199F7',
      flex: 1,
    },
    title: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 50,
      marginLeft: '30%',
      //color:'#2196F3',
      color: 'white',
    },
     Homecard: {
     marginTop:50,
     marginLeft:55,
    backgroundColor: '#ffff',
    borderRadius: 8,
    padding:15,
    //marginVertical: 8,
    marginHorizontal: 45,
    shadowColor: '#000',
    height:320,
    width:'70%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    opacity:0.8,
  },
  homeText:{
   fontSize:25,
   textAlign:'center',
  fontWeight:'bold',
  fontFamily:'Cochin',
  marginTop:5,
  paddingTop:5,
  color:'#2980B9',
  },
  pic:{
    marginTop:10,
    padding:0,
    flex:1,
    resizeMode:'cover',
    //height:100,
    width:'100%',
    borderRadius: 8,
  },
    logo: {
      alignItems: 'center',
      width: '72%',
      height: 60,
      marginTop: 30,
      marginLeft: '14%',
    },
     sos:{
      borderWidth:2,
      borderColor:"red",
      width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "red",
    marginLeft:50,

    },
    sosText:{
      color:'white',
      marginTop:10,
      marginLeft:7,
    },
    circle:{
     // flex:1,
      flexDirection:'row',
      marginTop:30,
    },
     imagee: {
    flex: 1,
    position:'absolute',
    justifyContent: 'center',
    width:'100%',
    height:'100%',
    opacity:0.7,
  },
}
)

export default Home