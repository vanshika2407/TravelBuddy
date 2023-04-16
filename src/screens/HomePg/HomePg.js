import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Image, ScrollView} from 'react-native'
import Pic from '../../../assets/background.jpg';
import HomeCard from '../../components/Card/HomePgCard';
import {LinearGradient} from 'expo-linear-gradient';
import Logo from 'login/assets/TravelBuddy-blue.png';
 const Name=[
    {
        image:Pic,
        username:'Vanshika',
    },
 ]
const HomePg=()=>
{
    const name=Name.map(hh=>{
        return(
            <HomeCard
            image={hh.image}
            username={hh.username} />
        )
    })
      return(
        <LinearGradient colors={['#221e59', '#4747cd', '#192f6a']} style={styles.bb}>
      <ScrollView>
      {/* <View style={styles.container}> */}
      <Text style={styles.title}>Welcome To!!</Text>
       <Image source={Logo} style={styles.logo}/>
    {/* <Image source={Pic} style={styles.image}/> */}
    {name}
    {/* </View> */}
      </ScrollView>
      </LinearGradient>

    )
    
}

const styles=StyleSheet.create(
    {
        bb:{
            //backgroundColor:'#6199F7',
        // marginBottom:'100%',
        height:'100%',
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
         marginLeft:'30%',
         //color:'#2196F3',
         color:'white',
        },
   logo:{
            alignItems:'center',
            width:'72%',
            height:60,
            marginTop:30,
            marginLeft:'14%',
        },
    }
)

export default HomePg