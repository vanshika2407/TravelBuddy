import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ImageBackground,Image } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Logo from 'login/assets/TravelBuddy-blue.png';
import coverPic from '../../../assets/signup.jpg';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigation=useNavigation();

  const handleSignUp = () => {
    // TODO: handle sign-up logic here
   // console.warn("Sign Up");
    navigation.navigate('confirmEmail');
  }

  return (
    <View style={styles.container}>
    <ImageBackground source={coverPic} resizeMode="cover" style={styles.image}></ImageBackground>
    <Image source={Logo} style={styles.logo}/>
      <Text style={styles.title}>Sign Up</Text>
      <CustomInput
        style={styles.input}
         value={name}
         placeholder="Name"
         setValue={setName}
         secureTextEntry={false}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      /> */}
      <CustomInput
        style={styles.input}
         value={email}
         placeholder="Email"
         setValue={setEmail}
         secureTextEntry={false}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      /> */}
      <CustomInput
        style={styles.input}
         value={password}
         placeholder="Password"
         setValue={setPassword}
         secureTextEntry={true}
      />
       <CustomInput
        style={styles.input}
         value={repeatPassword}
         placeholder="Repeat Password"
         setValue={setRepeatPassword}
         secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
   logo:{
            alignItems:'center',
            width:'97%',
            height:81,
        },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color:"#0066cc",
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    width: 200,
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
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
});