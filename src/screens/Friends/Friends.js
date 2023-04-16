import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Image, ScrollView} from 'react-native'
import Pic from '../../../assets/background.jpg';
import FriendsCard from '../../components/Card/FriendsCard';
import {LinearGradient} from 'expo-linear-gradient';
 const Name=[
    {
        username:'Vanshika',
    },
    {
        username:'Prathamesh',
    },
    {
        username:'Devam',
    },
    {
        username:'hhh',
    },
 ]
const Friends=()=>
{
    // const details=Name.map(de=>{
    //     return(
    //         <FriendsCard
    //         username={de.username} />
    //     )
    // })
      return(
      <ScrollView style={styles.bb}>
        <LinearGradient colors={['#221e59', '#4747cd', '#192f6a']}>
      {/* <View style={styles.container}> */}
      <Text style={styles.title}>Friends</Text>
      <View style={styles.parent}>
          <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>filters</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button]}>
      <Text style={styles.buttonText}>icon</Text>
    </TouchableOpacity>
      </View>
      
    <Image source={Pic} style={styles.image}/>
    <ScrollView>
     {Name.map(de=>{
      return(
          <FriendsCard
         username={de.username} />
      )
   }
     )
     }
     </ScrollView>
      {/* </View> */}
      </LinearGradient>
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
         marginLeft:'37%',
         //color:'#2196F3',
         color:'white',
        },
          button: {
    //backgroundColor: '#0066cc',
    padding:2,
    borderRadius:20,
    alignItems: 'center',
    width:70,
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
  },
  image:{
    width:'70%',
    height:'25%',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:'14%',
    borderRadius:40,
  },
    }
)

export default Friends