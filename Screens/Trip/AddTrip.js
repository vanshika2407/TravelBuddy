import { View, Text, StatusBar, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native'
import React from 'react'
import MapView, { Geojson } from 'react-native-maps';
import { TextInput, Button } from 'react-native-paper'
import { Marker } from 'react-native-maps';
import axios from 'axios';
import FAB from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BASE_URL } from '../../Api/BaseUrl';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function AddTrip(props) {
    const [location, setLocation] = React.useState({ lat: 19.123198, long: 72.836284 });
    const [propmt, setPrompt] = React.useState('');
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [interests, setInterests] = React.useState('');
    const [noOfDays, setNoOfDays] = React.useState(0);
    const [showDate, setShowDate] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [place, setPlace] = React.useState('')

    const handleLocation = () => {
        // console.log(propmt)
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${propmt.replace(' ', '%20')}.json`, {
            params: {
                access_token: 'pk.eyJ1IjoicHJhcGthciIsImEiOiJjbGdlOWt5ODcwdHVnM2dzeGdmaG51MnZpIn0.71k9qLkI0Za9zLN0SsRi9A',
            }
        })
            .then(res => {
                data = res.data.features[0]

                setPrompt(data.text)
                setPlace(data.context[1].text)
                setLocation({ lat: data.center[1], long: data.center[0] })
            })
    }

    const changeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const handleShow = () => {
        setShow(true)
    }
    const handleBack = () => {
        setShow(false)
    }
    const handleDate = () => {
        setShowDate(true)
    };

    const createTrip = () => {
        setLoading(true)
        if (date && propmt && location && interests && noOfDays) {
            const obj = {
                arrivalDate: date,
                location: location,
                interests: interests.toLowerCase().split(' '),
                noOfDays: parseInt(noOfDays),
                prompt: propmt,
                email: props.email,
                place: place
            }

            console.log(obj)

            axios.post(`${BASE_URL}/add-trip`,
                obj
            )
                .then(res => {
                    data = res.data
                    if (data.status == 1) {
                        ToastAndroid.show("Added Successfulḷy", ToastAndroid.SHORT)
                        // props.setEmail(email)
                        props.setTrip({
                            destination: {
                                lat: location.lat,
                                long: location.long,
                                place: propmt,
                                locality: place
                            },
                            interests: interests.toLowerCase().split(' '),
                            arrivalDate: date,
                            departureDate: new Date(date.getTime() + (noOfDays * 24 * 60 * 60 * 1000)),
                        }
                        )
                        props.navigation.navigate('Home')
                    }
                    else {
                        ToastAndroid.show(`${data.message}`, ToastAndroid.SHORT)
                    }
                })
            setLoading(false)
            // console.log(date, propmt, location, interests, noOfDays)
        }
        else {
            setLoading(false)
            ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT)
        }
    }

    return (
        <>
            {!show &&
                <>

                    <View View style={styles.container} >
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            fetchDetails={true}
                            GooglePlacesDetailsQueery={{
                                fields: 'formatted_address',
                            }}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                // console.log(data, details);
                                str = JSON.stringify(details);
                                str = JSON.stringify(details, null, 4); // (Optional) beautiful indented output.
                                // console.log(str)

                                setLocation(
                                    {
                                        lat: details.geometry.location.lat,
                                        long: details.geometry.location.lng
                                    }
                                    
                                )
                                // setPlace(details.address_components[4].long_name.toLowerCase())
                                setPrompt(details.formatted_address)
                                details.address_components.forEach(element => {
                                    if (element.types[0] == 'locality') {
                                        setPlace(element.long_name.toLowerCase())
                                        console.log(element.long_name.toLowerCase())
                                    }
                                });
                            }}
                            query={{
                                key: 'AIzaSyCx7ABExH2KZgBGtyuUNI7nwoN2JjHjRlw',
                                language: 'en',
                                components: 'country:in',
                                radius: 30000
                            }}
                            styles={
                                {
                                    container: { flex: 0, position: 'absolute', top: 0, left: 0, width: "100%", zIndex: 2 },
                                    listView: { backgroundColor: 'white', },
                                }
                            }
                        />

                        <MapView
                            style={{ flex: 1 }}
                            animateToRegion={{
                                region: {
                                    latitude: location.lat,
                                    longitude: location.long,
                                    latitudeDelta: 0.0222,
                                    longitudeDelta: 0.0121,
                                },
                                duration: 10000
                            }}
                            region={
                                {
                                    latitude: location.lat,
                                    longitude: location.long,
                                    latitudeDelta: 0.0222,
                                    longitudeDelta: 0.0121,
                                }
                            }
                        >
                            <Marker
                                key="1"
                                coordinate={{ latitude: location.lat, longitude: location.long }}
                                title={propmt}
                                description="Your Picked Location"
                            />
                        </MapView>
                        <View style={styles.bottomDiv}>
                            <Text style={{ color: 'white', fontSize: 20, marginTop: 10 }}>Add Trip</Text>
                            <View>
                                <TextInput
                                    value={propmt}
                                    onChangeText={setPrompt}
                                    label={'Destination'}
                                    style={styles.input}
                                    underlineColor='#6199F7'
                                activeUnderlineColor='#6199F8'
                                // disabled={true}
                                />
                            </View>
                            {/* <Button onPress={handleLocation} mode='contained' textColor='#6199F7' style={styles.button}>Submit</Button> */}
                            <Button onPress={handleShow} mode='contained' textColor='#6199F7' style={styles.button}>next</Button>
                        </View>


                    </View >
                </>
            }
            {

                show &&
                <View style={styles.nextPage}>
                    <Text style={{ color: 'white', fontSize: 20, marginTop: 10 }}>Add Trip</Text>
                    <View>
                        <TextInput
                            value={propmt}
                            onChangeText={setPrompt}
                            label={'Destination'}
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
                                Arrival Date : {date.toDateString() || 'Date of Birth'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextInput
                            value={noOfDays}
                            onChangeText={setNoOfDays}
                            label={'No of days to stay'}
                            style={styles.input}
                            underlineColor='#6199F7'
                            activeUnderlineColor='#6199F8'
                        />
                    </View>
                    <View>
                        <TextInput
                            value={interests}
                            onChangeText={setInterests}
                            label={'Interests'}
                            style={styles.input}
                            underlineColor='#6199F7'
                            activeUnderlineColor='#6199F8'
                        />
                    </View>

                    <Button disabled={loading ? true : false} onPress={createTrip} mode='contained' textColor='#6199F7' style={styles.button}>Create Trip</Button>
                    <Button onPress={handleBack} mode='contained' textColor='#6199F7' style={styles.button}>Back</Button>
                    {showDate && (
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

            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        marginTop: StatusBar.currentHeight || 0,
    },
    bottomDiv: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 200,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1,
        backgroundColor: '#6199F7',
        alignItems: 'center',
    },
    input: {
        width: 300,
        margin: 12,
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        marginTop: 15,
        backgroundColor: 'white',
        color: '#6199F7',
    },
    nextPage: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#6199F7',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight || 20,
    }
})