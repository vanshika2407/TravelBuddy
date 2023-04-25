import axios from 'axios'
import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image, ToastAndroid } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { BASE_URL } from '../Api/BaseUrl'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Chip } from 'react-native-paper';
import pp from '../assets/images/profile.jpg'
import { ScrollView } from 'react-native'
import ImageFromGallery from '../Components/ImageUpload/ImageFromGallery'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebaseConfig'
import { decode } from 'base-64';
import uuid from 'react-native-uuid';
import {LinearGradient} from 'expo-linear-gradient';

if (typeof atob === 'undefined') {
    global.atob = decode;
}

export default function SignUp({email, navigation}) {
    const metadata = {
        contentType: 'image/jpeg',
    };
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [gender, setGender] = useState('Male')
    const [city, setCity] = useState('')
    const [emergencyPhone, setEmergencyPhone] = useState('')
    const [interests, setInterests] = useState('')
    const [bio, setBio] = useState('')
    const [img, setImg] = useState('')
    const [loading, setLoading] = useState(false)


    // console.log(imgBase64, img)

    const handleDate = () => {
        setShow(true)
    };

    const changeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    
    const GetLinkFromUpload = async () => {
        try {
            let finalUrl = '';
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', img, true);
                xhr.send(null);
            });
            
            const id = uuid.v4()
            const ImageRef = ref(storage, `profile-pics/${id}.jpg`);
            
            await uploadBytes(ImageRef, blob, metadata)
                .then((res) => {
                    // console.log(res)
                    // console.log(url)
                    // console.log('Uploaded a blob or file!');
                });
            
            // We're done with the blob, close and release it
            blob.close();
            
            await getDownloadURL(ref(storage, `profile-pics/${id}.jpg`))
                .then((url) => {
                    finalUrl = finalUrl + url
                })
                .catch((error) => {
                    console.log(error)
                })
            
            return finalUrl
        }
        catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async () => {
        
        if (bio && interests && date && city && gender && emergencyPhone) {
            setLoading(true)
            const interestsArr = interests.toLowerCase().split(' ')
            const emergencyPhoneArr = emergencyPhone.split(' ')

            
            const url = await GetLinkFromUpload()

            const obj = {
                bio: bio,
                interests: interestsArr,
                dob: date,
                city: city,
                emergency_phone_number: emergencyPhoneArr,
                gender: gender,
                profile_photo: url,
                email: email
            }
            try {
                
                axios.post(`${BASE_URL}/profile`, obj)
                .then((res) => {
                    // console.log(res)
                    ToastAndroid.show("Profile Created", ToastAndroid.SHORT)
                    setLoading(false)
                    setImg('')
                    navigation.navigate('HomeScreen')
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            catch (error) {
                console.log(error)
                ToastAndroid.show(error, ToastAndroid.SHORT)
            }
                // console.log(obj)
            setLoading(false)
        }
        else {
            ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT)
        }
 
    }
    return (
        <ScrollView style={{ paddingBottom: 20 }}>

            <View style={styles.container}>
             <LinearGradient style={styles.bb} colors={['#2980B9', '#6DD5FA', '#FFFFFF']}>
                <View>
                    <Image source={img ? { uri: img } : pp} style={{ height: 150, width: 150, borderRadius: 100, marginTop: 10 }} />
                    <ImageFromGallery setImage={setImg} aspect="square" />
                </View>

                <View>
                    <TextInput
                        multiline
                        editable
                        numberOfLines={3}
                        maxLength={40}

                        value={bio}
                        onChangeText={setBio}
                        label={"Bio"}
                        style={styles.input}
                        underlineColor='#FFFFFF'
                        activeUnderlineColor='#6199F8'

                    />
                </View>
                <View>
                    <TextInput
                        value={interests}
                        onChangeText={setInterests}
                        label={'Interests'}
                        style={styles.input}
                        underlineColor='#FFFFFF'
                        activeUnderlineColor='#6199F8'
                        onPress={handleDate}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.input}
                        onPress={handleDate}
                    >
                        <Text style={{ color: 'black', margin: 15 }}>
                            DOB : {date.toDateString() || 'Date of Birth'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        value={city}
                        onChangeText={setCity}
                        label={'City'}
                        style={styles.inputCity}
                        underlineColor='#FFFFFF'
                        activeUnderlineColor='#6199F8'
                    />
                </View>
                <View style={{ height: 50, with: 100, flexDirection: "row" }}>
                    <Chip
                        onPress={() => setGender('Male')}
                        selectedColor='black'
                        showSelectedOverlay={true}
                        mode='outlined'
                        selected={gender === 'Male' ? true : false}
                       style={styles.chipStyle}
                    >
                        Male
                    </Chip>
                    <Chip
                        onPress={() => setGender('Female')}
                        selectedColor='black'
                        showSelectedOverlay={true}
                        mode='outlined'
                        selected={gender === 'Female' ? true : false}
                        style={styles.chipStyle}
                    >
                        Female
                    </Chip>
                    <Chip
                        onPress={() => setGender('Other')}
                        selectedColor='black'
                        showSelectedOverlay={true}
                        mode='outlined'
                        selected={gender === 'Other' ? true : false}
                         style={styles.chipStyle}
                    >
                        Other
                    </Chip>
                </View>
                <View>
                    <TextInput
                        value={emergencyPhone}
                        onChangeText={setEmergencyPhone}
                        label={'Emergency Phone'}
                        style={styles.inputPhone}
                        underlineColor='#FFFFFF'
                        activeUnderlineColor='#6199F8'
                    />
                </View>

                <Button disabled={loading ? true : false} onPress={onSubmit} mode='contained' textColor='#6199F7' style={styles.button}>Create Profile</Button>
                <Text style={{ color: "white", padding: 10, textAlign: "center" }}>
                    The Emergency contacts will be notified in case of any emergency
                </Text>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={changeDate}
                    />
                )}
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
     bb: {
       // backgroundColor: '#6199F7',
        flex: 1,
        flexDirection: "column",
        width: '100%',
        height: '100%',
        //marginTop: StatusBar.currentHeight || 0,
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: 'red',
    },
    chipStyle:{
      margin: 10,
     // marginLeft:-60,
      marginBottom:10,
      marginTop:0,
      height:'70%',
      backgroundColor:'white',
       //borderColor:'#2980B9',
        //borderWidth:2,
    },
    input: {
        width: 300,
        margin: 12,
        padding: 2,
        height:60,
        backgroundColor: 'white',
        borderRadius:0,
        borderColor:'#2980B9',
        borderWidth:2,
    },
     inputCity: {
        width: 100,
        margin: 10,
        padding:0,
        height:40,
        backgroundColor: 'white',
        borderRadius:0,
        marginLeft:-150,
        borderColor:'#2980B9',
        borderWidth:2,
    },
     inputPhone: {
        width: 200,
        margin: 10,
        padding:0,
        height:40,
        backgroundColor: 'white',
        borderRadius:0,
        marginLeft:-100,
        borderColor:'#2980B9',
        borderWidth:2,
    },
    button: {
        marginTop: 15,
        backgroundColor: 'white',
        color: '#6199F7',
        marginBottom: 10,
    }
})