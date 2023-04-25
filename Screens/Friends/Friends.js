import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ScrollView } from 'react-native'
import Logo from '../../assets/favicon.png';
import FriendRequestsCard from '../../Components/Card/FriendRequests'
import { Chip } from 'react-native-paper';
import { BASE_URL } from '../../Api/BaseUrl';
import axios from 'axios';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import FriendRecommendCard from '../../Components/Card/FriendRecommendCard';
import {LinearGradient} from 'expo-linear-gradient';

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
    // <LinearGradient colors={['#221e59', '#4747cd', '#192f6a']} style={styles.bb}>
    <ScrollView style={styles.scrollContainer}>
      {/* <View style={styles.container}> */}
      <LinearGradient style={styles.bb} colors={['#2980B9', '#6DD5FA', '#FFFFFF']}>
      <Text style={styles.title}>Recommendations</Text>
      <View style={styles.parent}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
          <Text style={styles.buttonText}>Received Requests</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.filter}>Filters</Text>
      <View style={{ marginTop:10, flexDirection: "row" }}>
        <Chip
          onPress={() => setGender('Male')}
          selectedColor='white'
          showSelectedOverlay={true}
          mode='outlined'
          selected={gender === 'Male' ? true : false}
          style={styles.chipStyle}
          //Type='2'
        >
          Male
        </Chip>
        <Chip
          onPress={() => setGender('Female')}
          selectedColor='white'
          showSelectedOverlay={true}
          mode='outlined'
          selected={gender === 'Female' ? true : false}
           style={styles.chipStyle}
        >
          Female
        </Chip>
        <Chip
          onPress={() => setGender('Any')}
          selectedColor='white'
          showSelectedOverlay={true}
          mode='outlined'
          selected={gender === 'Any' ? true : false}
           style={styles.chipStyle}
        >
          Any

        </Chip>
      </View>
      {/* <Button style={styles.find} onPress={findMatch}  title="Find Match" /> */}
      <TouchableOpacity style={styles.find} onPress={findMatch}>
        <Text style={styles.Text}>Find Your Buddy</Text>
      </TouchableOpacity> 

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
      {!loading && data && data.length === 0 && <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 20,color:'white' }}>No Match Found</Text>}
      </LinearGradient>
      {/* </View> */}
    </ScrollView>
      // </LinearGradient>

  )

}

const styles = StyleSheet.create(
  {
    scrollContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
         height: '100%',
         width: '100%',

    },
    bb: {
      //backgroundColor: '#6199F7',
      height:'100%',
      flex: 1,
      // alignItems:'center',
      // justifyContent:"center",
    },
    container: {
      backgroundColor: '#6199F7',
      flex: 1,
      alignItems:'center',
      justifyContent:"center",
    },
    title: {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 50,
      //marginLeft: '27%',
      //color:'#2196F3',
      color: 'white',
    },
    button: {
      //backgroundColor: '#0066cc',
      //padding: 2,
      borderRadius: 10,
      alignItems: 'center',
      //width: '30%',
      margin: 50,
      //borderColor: 'white',
     // borderWidth: 2,
      //height:"30%",
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      //textDecorationLine:"underline",
       paddingBottom:10,
            borderBottomStyle:'solid',
            borderBottomColor:'white',
            borderBottomWidth: 1,
            //borderBottomOpacity:0.8,
           
    },
    parent: {
      //flex: 1,
      flexDirection: "row",
      marginBottom: -10,
      marginLeft: -45,
    },
    image: {
      width: '70%',
      height: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '14%',
      borderRadius: 40,
    },
    chipStyle:{
      marginRight: 10,
      marginBottom:10,
      marginTop:0,
      height:'100%',
      backgroundColor:'#00000000',
       //backgroundColor:'#2980B9',
      borderWidth:0,
    },
    filter:{
    color:'white',
    marginLeft:20,
    fontWeight:'bold',
    fontSize:20,
    marginBottom:-20,
    },
    find:{
     // marginTop:100,
      //borderRadius:10,
     //  padding:2,
      marginLeft:80,
   // alignItems: 'center',
   // width:'70%',
    //margin:50,
    //borderColor:'white',
    //borderWidth:2,
    //backgroundColor:'#2980B9',
        flex:1,
      backgroundColor:'#2980B9',
      borderRadius:4,
      alignItems:'center',
      justifyContent:'center',
      marginTop:'40%',
      width:200,
      height:45,
      borderColor:'white',
      borderWidth:2,
    },
    Text:{
     color:'white',
     fontSize:15,
     padding:5,
     fontWeight:'bold',
    }
  }
)
export default Friends