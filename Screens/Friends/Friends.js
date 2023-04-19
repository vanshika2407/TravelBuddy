import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ScrollView } from 'react-native'
import Logo from '../../assets/favicon.png';
import FriendRequestsCard from '../../Components/Card/FriendRequests'
import { LinearGradient } from 'expo-linear-gradient';
import { Chip } from 'react-native-paper';
import { BASE_URL } from '../../Api/BaseUrl';
import axios from 'axios';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import FriendRecommendCard from '../../Components/Card/FriendRecommendCard';

const Friends = (props) => {
  const [gender, setGender] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  // console.log(gender)

  const findMatch = () => {
    setLoading(true)
    try {
      axios.post(`${BASE_URL}/get-nearby`, { email: props.email, gender: gender })
        .then(res => {
          // console.log(res.data)
          setData(res.data.data)
          setLoading(false)
        })
        .catch(error => console.log(error))
    }
    catch (error) {
      setLoading(false)
      console.log(error)
    }

  }

  return (
    <ScrollView style={styles.bb}>
      {/* <LinearGradient colors={['#221e59', '#4747cd', '#192f6a']}> */}
      {/* <View style={styles.container}> */}
      <Text style={styles.title}>Recommendations</Text>
      <View style={styles.parent}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>pending requests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
          <Text style={styles.buttonText}>received requests</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <Chip
          onPress={() => setGender('Male')}
          selectedColor='black'
          showSelectedOverlay={true}
          mode='outlined'
          selected={gender === 'Male' ? true : false}
          style={{ marginRight: 10 }}
        >
          Male
        </Chip>
        <Chip
          onPress={() => setGender('Female')}
          selectedColor='black'
          showSelectedOverlay={true}
          mode='outlined'
          selected={gender === 'Female' ? true : false}
          style={{ marginRight: 10 }}
        >
          Female
        </Chip>
        <Chip
          onPress={() => setGender('Any')}
          selectedColor='black'
          showSelectedOverlay={true}
          mode='outlined'
          selected={gender === 'Any' ? true : false}
        >
          Any

        </Chip>
      </View>
      <Button onPress={findMatch} title="Find Match" />

      {/* <Image source={Pic} style={styles.image}/> */}

      {!loading && data && data.length > 0 && data.map(de => {
        return (
          <FriendRecommendCard
            username={de.name}
            image={de.profilePhoto ? de.profilePhoto : "https://firebasestorage.googleapis.com/v0/b/travelapp-2a48a.appspot.com/o/profile-pics%2Fprofile.jpg?alt=media&token=cee63649-5f2a-4080-816a-6433e5f2c3e6"}
            toEmail={de.email}
            fromEmail={props.email}
          />
        )
      }
      )
      }
      {loading && <ActivityIndicator animating={true} color={MD2Colors.white} />}
      {!loading && data && data.length === 0 && <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 20 }}>No Match Found</Text>}
      {/* </View> */}
      {/* </LinearGradient> */}
    </ScrollView>

  )

}

const styles = StyleSheet.create(
  {
    bb: {
      backgroundColor: '#6199F7',
    },
    container: {
      backgroundColor: '#6199F7',
      flex: 1,
    },
    title: {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 50,
      marginLeft: '27%',
      //color:'#2196F3',
      color: 'white',
    },
    button: {
      backgroundColor: '#0066cc',
      padding: 2,
      borderRadius: 20,
      alignItems: 'center',
      width: '30%',
      margin: 50,
      borderColor: 'white',
      borderWidth: 2,
      //height:4,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    parent: {
      //flex: 1,
      flexDirection: "row",
      marginBottom: -10,
      marginLeft: -37,
    },
    image: {
      width: '70%',
      height: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '14%',
      borderRadius: 40,
    },
  }
)

export default Friends