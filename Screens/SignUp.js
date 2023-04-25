import axios from 'axios'
import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, ToastAndroid, ScrollView, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { BASE_URL } from '../Api/BaseUrl'
import {LinearGradient} from 'expo-linear-gradient';
import AnimationSignUp from './Animation/AnimationSignUp'
export default function SignUp(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const handleLogin = () => {
        if (email && password && name && phone) {
            try {
                axios.post(`${BASE_URL}/create_acc`, {
                    name: name,
                    phone: phone,
                    email: email,
                    password: password
                })
                    .then(res => {
                        data = res.data
                        if (data.status == 1) {
                            ToastAndroid.show("Account Created", ToastAndroid.SHORT)
                            props.setEmail(email)
                            props.navigation.navigate('CreateProfile')
                        }
                        else {
                            ToastAndroid.show(`${data.message}`, ToastAndroid.SHORT)
                        }
                    }
                    )
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT)
        }
    }
    return (
        <ScrollView>
        <View style={styles.container}>
         <LinearGradient style={styles.container1} colors={['#2980B9', '#6DD5FA', '#FFFFFF']}>
        <AnimationSignUp></AnimationSignUp>
            <Image
                source={require('../assets/images/TravelBuddy.png')}
                style={{ width: 250, height: 100, marginTop: -25, objectFit: 'contain' }}
            />
            <View>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    label={"Name"}
                    style={styles.input}
                    underlineColor='#6199F7'
                    activeUnderlineColor='#6199F8'

                />
            </View>
            <View>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    label={"Phone Number"}
                    style={styles.input}
                    underlineColor='#6199F7'
                    activeUnderlineColor='#6199F8'

                />
            </View>
            <View>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    label={"Email Address"}
                    style={styles.input}
                    underlineColor='#6199F7'
                    activeUnderlineColor='#6199F8'

                />
            </View>
            <View>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    label={'Password'}
                    style={styles.input}
                    underlineColor='#6199F7'
                    activeUnderlineColor='#6199F8'
                    secureTextEntry={true}
                />
            </View>
            {/* <Button onPress={handleLogin} mode='contained' textColor='#2980B9' style={styles.button}>Signup</Button> */}
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.text}>SignUp</Text>
            </TouchableOpacity>
            <Text style={{ color: "#2980B9",paddingTop:10 }} onPress={() => { props.navigation.navigate('Login') }}>
                Already have an account? Login
            </Text>
            </LinearGradient>
        </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6199F7',
        flex: 1,
        flexDirection: "column",
        width: '100%',
        height: '100%',
        marginTop: StatusBar.currentHeight || 0,
        alignItems: 'center',
        justifyContent: 'center',

    },
     container1: {
       // backgroundColor: '#6199F7',
        flex: 1,
        flexDirection: "column",
        width: '100%',
        height: '100%',
        //marginTop: StatusBar.currentHeight || 0,
        alignItems: 'center',
        justifyContent: 'center',

    },
     text:{
        textAlign:'center',
        color: 'white',
        marginTop:5,
        marginBottom:5,
        fontSize:18,
        //fontWeight:'bold',
    },
    input: {
        width: 300,
        margin: 12,
        padding: 7,
        backgroundColor:'white',
    },
    // button: {
    //     marginTop: 15,
    //     backgroundColor: 'white',
    //     color: '#2980B9',
    //     borderRadius:5,
    //     width:150,
    //     height:35,
    //     underlineColor:'#6199F7',
        
    // }
     button: {
        marginTop: 10,
      backgroundColor: '#2980B9',
        // color: '#6199F7',
         color: '#2980B9',
        borderRadius:4,
        borderWidth:2,
        borderColor:'white',
        width:'30%',
    },
})