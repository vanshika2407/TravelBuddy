import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Logo from 'login/assets/TravelBuddy-blue.png';

function Home()
{
     const navigation=useNavigation();
    const handleCommunity=()=>
    {
      navigation.navigate('CommunityTab');
    }
    const handleReviews=()=>
    {
      navigation.navigate('Reviews');
    }
     const handleviews=()=>
    {
      navigation.navigate('Views');
    }
    return(
    <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
         <Image source={Logo} style={styles.logo} />
         <TouchableOpacity style={styles.button} onPress={handleCommunity}>
        <Text style={styles.buttonText}>Community Tab</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleReviews}>
        <Text style={styles.buttonText}>Reviews</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleviews}>
        <Text style={styles.buttonText}>View Trip</Text>
      </TouchableOpacity>
    </View>
    );
}
 const styles=StyleSheet.create(
    {
        container:{
            marginTop:50,
        },
        title:{
       color:'black',
        },
        logo:{
         alignItems:'center',
            width:'97%',
            height:81,
        },
    }
 );
export default Home;

