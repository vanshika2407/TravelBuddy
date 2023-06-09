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
     const handleFriends=()=>
    {
      navigation.navigate('Friends');
    }
      const handleFriendRequests=()=>
    {
      navigation.navigate('FriendRequests');
    }
    const handleHomePg=()=>
    {
      navigation.navigate('Home Page');
    }
      const handleMessage=()=>
    {
      navigation.navigate('Message');
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
      <TouchableOpacity style={styles.button} onPress={handleFriends}>
        <Text style={styles.buttonText}>Friends</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFriendRequests}>
        <Text style={styles.buttonText}>Friend Request</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleHomePg}>
        <Text style={styles.buttonText}>Home Page</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMessage}>
        <Text style={styles.buttonText}>Messaging</Text>
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

