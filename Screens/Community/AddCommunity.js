import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import Logo from '../../assets/images/profile.jpg';
import CustomInput from '../../Components/CustomInput/CustomInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageFromGallery from '../../Components/ImageUpload/ImageFromGallery';
import { BASE_URL } from '../../Api/BaseUrl';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebaseConfig'
import uuid from 'react-native-uuid';

function AddCommunity(props) {
    const metadata = {
        contentType: 'image/jpeg',
    };
    const [eventName, setEvent] = useState('');
    const [eventDes, setDes] = useState('');
    const [location, setLocation] = useState({ lat: '', long: '' });
    const [place, setPlace] = useState('')
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    // console.log(location, place)
    const handleDate = () => {
        setShow(true)
    };
    // console.log(props)

    const changeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleLocation = () => {
        // console.log(propmt)
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${eventDes.replace(' ', '%20')}.json`, {
            params: {
                access_token: 'pk.eyJ1IjoicHJhcGthciIsImEiOiJjbGdlOWt5ODcwdHVnM2dzeGdmaG51MnZpIn0.71k9qLkI0Za9zLN0SsRi9A',
            }
        })
            .then(res => {
                data = res.data.features[0]
                // console.log(data)

                setDes(data.text)
                setPlace(data.context[1].text)
                setLocation({ lat: data.center[1], long: data.center[0] })
            })
    }

    const OnAddEvent = async () => {
        setLoading(true)
        if (eventName && eventDes && date && img && description) {
            try {

                const url = await GetLinkFromUpload();
                const obj = {
                    title: eventName,
                    desc: description,
                    location: {
                        lat: location.lat,
                        long: location.long,
                        place: eventDes,
                        locality: place
                    },
                    date: date,
                    imageUrl: url,
                    email: props
                }

                axios.post(`${BASE_URL}/create`, obj)
                    .then(res => {
                        data = res.data
                        // console.log(res)
                        if (data.status == 1) {
                            setLoading(false)
                            ToastAndroid.show("Event Added Successfully", ToastAndroid.SHORT)
                            props.navigation.navigate('CommunityTab')

                        }
                        else {
                            ToastAndroid.show(`${data.message}`, ToastAndroid.SHORT)
                        }
                    }
                    )
                setLoading(false)
            }
            catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        else {
            ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT)
        }
        setLoading(false)
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
            const ImageRef = ref(storage, `community-images/${id}.jpg`);

            await uploadBytes(ImageRef, blob, metadata)
                .then((res) => {
                    // console.log(res)
                    // console.log(url)
                    // console.log('Uploaded a blob or file!');
                });

            // We're done with the blob, close and release it
            blob.close();

            await getDownloadURL(ref(storage, `community-images/${id}.jpg`))
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

    return (
        <ScrollView style={{ paddingBottom: 20 }}>
            <View style={styles.container}>
                {/* <Image source={Logo} style={styles.logo}/> */}

                <Text style={styles.title}>Add My Event</Text>
                <View>
                    <Image source={img ? { uri: img } : Logo} style={{ height: 200, width: 300, marginTop: 10 }} />
                    <ImageFromGallery setImage={setImg} aspect="rectangle" />
                </View>
                <View>
                    <TextInput
                        value={eventName}
                        onChangeText={setEvent}
                        label={"Event Name"}
                        style={styles.input}
                        underlineColor='#6199F7'
                        activeUnderlineColor='#6199F8'

                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.input}
                        onPress={handleDate}
                    >
                        <Text style={{ color: '#666', margin: 15 }}>
                            Event Date : {date.toDateString() || 'Date of Birth'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        value={eventDes}
                        onChangeText={setDes}
                        label={"Event Place"}
                        style={styles.input}
                        underlineColor='#6199F7'
                        activeUnderlineColor='#6199F8'

                    />
                    <Button title='submit' onPress={handleLocation} />
                </View>
                <View>
                    <TextInput
                        multiline
                        editable
                        numberOfLines={3}
                        maxLength={40}

                        value={description}
                        onChangeText={setDescription}
                        label={"Description"}
                        style={styles.input}
                        underlineColor='#6199F7'
                        activeUnderlineColor='#6199F8'

                    />
                </View>

                <Button disabled={loading ? true : false} title="Add event" onPress={OnAddEvent} style={{ marginBottom: 20 }} />
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
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create(
    {
        root: {
            alignItems: 'center',
            padding: 10,
            margin: 250,

        },
        logo: {
            alignItems: 'center',
            width: '97%',
            height: 81,
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#6199F7',
            height: '100%',
            width: '100%',
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 32,
            color: 'white',
        },

        SignButton: {
            backgroundColor: 'white',
            padding: 12,
            borderRadius: 4,
            alignItems: 'center',
            width: '80%',
            margin: 15,
        },
        SignbuttonText: {
            color: 'grey',
            fontSize: 18,
        },
        input: {
            width: 300,
            margin: 12,
            padding: 10,
            backgroundColor: 'white',
        },
    }
);
export default AddCommunity;

