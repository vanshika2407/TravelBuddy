import axios from 'axios';
import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import { BASE_URL } from '../../Api/BaseUrl';

function Card(props) {
  const newDate = new Date(props.date).toDateString();
  const [status, setStatus] = React.useState(props.status);
  // console.log(props.imageSource)
  const handleJoin = () => {
    axios.post(`${BASE_URL}/join`, { email: props.email, title: props.title })
      .then((res) => {
        setStatus("joined")
        ToastAndroid.show("Joined Community", ToastAndroid.SHORT)
      })
      .catch((err) => {
        console.log(err);
      }
      )
  }
  return (
    <View style={styles.card}>
      <Image source={{ uri: props.imageSource }} style={styles.image}></Image>
      <View style={styles.parent}>
        <Text style={styles.title}>{props.title}</Text>
        <TouchableOpacity disabled={status == "joined" || status == "admin" ? true : false} onPress={handleJoin} style={styles.button}>
          <Text style={styles.buttonText}>{status == "admin" ? "admin" : (status == "joined" ? "joined": "join")}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{props.description}</Text>
      <Text style={styles.date}>{newDate}</Text>
    </View>
  )

}

const styles = StyleSheet.create(
  {

    // card:{
    //     width:200,
    //     height:200,
    //     backgroundColor:'grey',
    //     alignItems:'center',
    //     justifyContent:'center',
    //     margin:'50%',

    // },
    card: {
      marginTop: 50,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 15,
      //marginVertical: 8,
      marginHorizontal: 45,
      shadowColor: '#000',
      height: 260,
      width: '75%',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    image: {
      width: '70%',
      height: 50,
      borderRadius: 8,
      marginBottom: 16,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: '50%',
      marginLeft: '30%',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: '5%',
      color: "#6199F7",
    },
    description: {
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: '5%',
      paddingTop: -10,
      color: "#6199F7A6",
    },
    date: {
      paddingTop: 25,
      paddingLeft: '5%',
      color: "#6199F7A6",
    },
    button: {
      backgroundColor: '#2196F3',
      //borderColor:'#64F761',
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 10,
      width: 50,
      height: 25,
    },
    buttonText: {
      color: '#fff',
      fontSize: 10,
      paddingLeft: 2,
    },
    container: {
      flex: 1,
    },
    parent: {
      //flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },

  }
)
export default Card;