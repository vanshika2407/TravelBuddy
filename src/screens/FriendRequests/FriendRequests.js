import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Image, ScrollView} from 'react-native'
import Logo from '../../../assets/favicon.png';
import FriendRequestsCard from '../../components/Card/FriendRequests'
 const Name=[
    {
        username:'Vanshika',
        image:Logo,
    },
    {
        username:'Prathamesh',
        image:Logo,
    },
    {
        username:'Devam',
        image:Logo,
    },
    {
        username:'hhh',
        image:Logo,
    },
 ]
const FriendRequest=()=>
{
    // const details=Name.map(de=>{
    //     return(
    //         <FriendsCard
    //         username={de.username} />
    //     )
    // })
      return(
      <ScrollView style={styles.bb}>
    
      {/* <View style={styles.container}> */}
      <Text style={styles.title}>Friend Requets</Text>
      <View style={styles.parent}>
          <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Pending</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button]}>
      <Text style={styles.buttonText}>Accepted</Text>
    </TouchableOpacity>
      </View>
      
    {/* <Image source={Pic} style={styles.image}/> */}
  
     {Name.map(de=>{
      return(
          <FriendRequestsCard
         username={de.username}
         image={de.image} />
      )
   }
     )
     }
      {/* </View> */}
      </ScrollView>

    )
    
}

const styles=StyleSheet.create(
    {
        bb:{
            backgroundColor:'#6199F7',
        },
        container:{
         backgroundColor:'#6199F7',
         flex:1,
        },
        title:{
         alignItems:'center',
         justifyContent:'center',
         fontSize:30,
         fontWeight:'bold',
         marginTop:50,
         marginLeft:'27%',
         //color:'#2196F3',
         color:'white',
        },
          button: {
    //backgroundColor: '#0066cc',
    padding:2,
    borderRadius:20,
    alignItems: 'center',
    width:'30%',
    margin:50,
    borderColor:'white',
    borderWidth:2,
    //height:4,
  },
  buttonText: {
    color: '#fff',
    fontSize:18,
  },
  parent: {
    //flex: 1,
    flexDirection: "row",
    marginBottom:-10,
    marginLeft:-37,
  },
  image:{
    width:'70%',
    height:'30%',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:'14%',
    borderRadius:40,
  },
    }
)

export default FriendRequest