import axios from 'axios'
import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, ToastAndroid } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { BASE_URL } from '../Api/BaseUrl'
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

        <View style={styles.container}>
            <Image
                source={require('../assets/images/TravelBuddy.png')}
                style={{ width: 250, height: 100, marginTop: 50, objectFit: 'contain' }}
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
            <Button onPress={handleLogin} mode='contained' textColor='#6199F7' style={styles.button}>Signup</Button>
            <Text style={{ color: "white" }} onPress={() => { props.navigation.navigate('Login') }}>
                Already have an account? Login
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
    }
})