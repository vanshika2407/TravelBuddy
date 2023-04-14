import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ImageBackground,Image } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import mailPic from '../../../assets/mail.jpg';
import Logo from 'login/assets/TravelBuddy-blue.png';

export default function ConfirmEmail() {
  const [code, setCode] = useState('');

  const onConfirm = () => {
    // TODO: handle sign-up logic here
    console.warn("Confirmed");
  }

  return (
    <View style={styles.container}>
    <ImageBackground source={mailPic} resizeMode="cover" style={styles.image}></ImageBackground>
    <Image source={Logo} style={styles.logo}/>
      <Text style={styles.title}>Confirm Email</Text>
      <CustomInput
        style={styles.input}
         value={code}
         placeholder="Enter Your Code"
         setValue={setCode}
         secureTextEntry={false}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      /> */}
      
      {/* <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      /> */}
     
       
      <TouchableOpacity style={styles.button} onPress={onConfirm}>
        <Text style={styles.buttonText}>Confirm Email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resendButton} onPress={onConfirm}>
        <Text style={styles.RebuttonText}>Resend Code</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color:"#0066cc",
  },
  logo:{
            alignItems:'center',
            width:'97%',
            height:81,
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
    margin:10,
  },
  resendButton:{
  backgroundColor:'white',
  padding: 12,
  borderRadius: 4,
  alignItems: 'center',
  width: '80%',
  borderColor:'#0066cc',
  borderWidth:2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  RebuttonText: {
    color: 'grey',
    fontSize: 18,
  },
   image: {
    flex: 1,
    position:'absolute',
    justifyContent: 'center',
    width:'100%',
    height:'100%',
    opacity:0.8,
  },
});