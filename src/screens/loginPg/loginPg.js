import React,{useState} from 'react'
import {View,Text,Image,StyleSheet,ScrollView,TouchableOpacity,ImageBackground} from 'react-native'
import Logo from 'login/assets/TravelBuddy-blue.png';
import coverPic from '../../../assets/background1.jpg';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
function LoginPg() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation=useNavigation();

    const onLoginpress = () => {
        console.warn("LogIn");
        //Validate User

        navigation.navigate('Home');
    };
    const OnSignUp = () => {
        console.warn("Sign Up");
        //Validate User

        navigation.navigate('SignUp');
    };
    return (
        // <ScrollView>
        <View style={styles.container}>
        <ImageBackground source={coverPic} resizeMode="cover" style={styles.image}></ImageBackground>
            <Image source={Logo} style={styles.logo}/>
            <Text style={styles.title}>Sign In</Text>
            <CustomInput placeholder="Email"
                value={username}
                setValue={setUsername}
                secureTextEntry={false} />
            <CustomInput placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true} />
            <CustomButton
                text="Sign In"
                onPress={onLoginpress} />
                <TouchableOpacity style={styles.SignButton} onPress={OnSignUp} >
        <Text style={styles.SignbuttonText}>Don't Have An account go to SignUp</Text>
      </TouchableOpacity>
               
        </View>
        // </ScrollView>
    );
}

const styles=StyleSheet.create(
    {
        root:{
            alignItems:'center',
            padding:10,
             margin:250,
        },
        logo:{
            alignItems:'center',
            width:'97%',
            height:81,
        },
         container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor:'#6199F7',
  },
   title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color:"#0066cc",
    marginTop:20,
  },
 
  SignButton:{
  backgroundColor:'white',
  padding: 5,
  borderRadius: 4,
  alignItems: 'center',
  //width: '50%',
  margin:15,
  },
 SignbuttonText: {
    color: 'grey',
    fontSize: 18,
  },
   image: {
    flex: 1,
    position:'absolute',
    justifyContent: 'center',
    width:'100%',
    height:'100%',
    opacity:0.9,
  },
    }
);
export default LoginPg;

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image } from 'react-native';
// import Logo from 'login/assets/favicon.png';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Handle login logic here
//     console.log(`Email: ${email}, Password: ${password}`);
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={Logo}/>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 32,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     marginVertical: 8,
//     width: '80%',
//     borderRadius: 4,
//   },
//   button: {
//     backgroundColor: '#0080ff',
//     padding: 12,
//     borderRadius: 4,
//     marginTop: 24,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });