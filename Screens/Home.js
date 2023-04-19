import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button } from 'react-native'
// import Pic from '../../../assets/background.jpg';
import HomeCard from '../Components/Card/HomePgCard';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../assets/images/TravelBuddy.png';
import axios from 'axios';
import { BASE_URL } from '../Api/BaseUrl';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import * as Location from 'expo-location';

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
    <LinearGradient colors={['#221e59', '#4747cd', '#192f6a']} style={styles.bb}>
      <ScrollView>
        {/* <View style={styles.container}> */}

        <Text style={styles.title}>Welcome To!!</Text>
        <Image source={Logo} style={styles.logo} />
        
        {/* <Image source={Pic} style={styles.image}/> */}
        {!loading && data &&
          <HomeCard
            image={data.profilePhoto || 'https://firebasestorage.googleapis.com/v0/b/travelapp-2a48a.appspot.com/o/profile-pics%2Fprofile.jpg?alt=media&token=cee63649-5f2a-4080-816a-6433e5f2c3e6'}
            username={data.username} />
        }
        {
          loading && <ActivityIndicator animating={true} color={MD2Colors.white} />
        }
        {/* </View> */}
        <Button title="SOS" onPress={SOS} style={{ flex:1, width: 40, height: 40, backgroundColor: "red" , marginTop: 40 }} />
      </ScrollView>
    </LinearGradient>

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
    logo: {
      alignItems: 'center',
      width: '72%',
      height: 60,
      marginTop: 30,
      marginLeft: '14%',
    },
  }
)

export default Home