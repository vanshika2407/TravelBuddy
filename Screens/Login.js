import React, { useState } from 'react'
import { View, Text, StyleSheet, ToastAndroid, StatusBar, Image } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import axios from 'axios';
import  { BASE_URL } from '../Api/BaseUrl'
import AnimationLogin from './Animation/AnimationLogin';
import Animation from './Animation/Animation'

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = async () => {
        if (email && password) {

            try {
                axios.post(`${BASE_URL}/login`, {
                    email: email,
                    password: password
                })
                    .then(res => {
                        data = res.data
                        if (data.status == 1) {
                            ToastAndroid.show("Login Successful", ToastAndroid.SHORT)
                            props.setEmail(email)
                            props.navigation.navigate('HomeScreen')
                        }
                        else {
                            ToastAndroid.show(`${data.message}`, ToastAndroid.SHORT)
                        }
                    })


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

        <View style={styles.container}>
        <AnimationLogin ></AnimationLogin>
        {/* <Animation></Animation> */}
            <Image
                source={require('../assets/images/TravelBuddy.png')}
                style={{ width: 250, height: 100, marginTop: 50, objectFit: 'contain' }}
            />
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
            <Button onPress={handleLogin} mode='contained' textColor='#6199F7' style={styles.button}>Login</Button>
            <Text style={{ color: "white" }}
                onPress={() => { props.navigation.navigate('SignUp') }}
            >
                Don't have an account? Signup
            </Text>
        </View>

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
    text: {
        color: 'red',
    },
    input: {
        width: 300,
        margin: 12,
        padding: 10,
    },
    button: {
        marginTop: 15,
        backgroundColor: 'white',
        color: '#6199F7',
    },
})