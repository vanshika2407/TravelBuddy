import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Button } from 'react-native'
import Logo from '../../assets/favicon.png';
import { FAB } from 'react-native-paper';
import Card from '../../Components/Card/Card'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../Api/BaseUrl';
import {LinearGradient} from 'expo-linear-gradient';

function CommunityTab(props) {
    const [data, setData] = useState([]);
    const [arrLength, setArrLength] = useState(0);
    const navigation = useNavigation();
    const OnAddEvent = () => {
        navigation.navigate('AddCommunity');
    };

    useEffect(() => {
        axios.post(`${BASE_URL}/get-comm`, { email: props.email, trip: props.trip })
            .then((res) => {
                setData(res.data.Communities)
            })
            .catch((err) => {
                console.log(err);
            }
            )
    }, []);
    // console.log(data);
    const details = data.map((detail, index) => {
        return (
            <View>
                <Card
                    key={index}
                    imageSource={detail.imageUrl}
                    title={detail.title}
                    description={detail.desc}
                    date={detail.date}
                    status={detail.status}
                    email={props.email}
                />
            </View>

        )
    })

    return (
        <ScrollView style={{ paddingBottom: 20,height:'100%'}}>
            <View style={styles.container}>
             <LinearGradient style={styles.container1} colors={['#2980B9', '#6DD5FA', '#FFFFFF']}>
            <Text style={styles.title}>Community Tab</Text>
                {data.length > 0 ? details : <Text style={styles.sub}>No Communities nearby</Text>}
                {/* <Button title="Add event"  onPress={OnAddEvent} /> */}
                <TouchableOpacity style={styles.AddButton} onPress={OnAddEvent}>
                  <Text style={styles.AddbuttonText}>Add Event</Text>
                </TouchableOpacity>
                </LinearGradient>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        title: {
           textAlign:'center',
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 50,
            //marginLeft: '24%',
            //color:'#2196F3',
            color: 'white',

        },
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
        },
          container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: '#6199F7',
            height: '100%',
            width: '100%',
        },
         container1: {
            height: '100%',
            width: '100%',
        },
        AddButton: {
        
            backgroundColor: 'white',
            padding: 12,
            borderRadius: 4,
            alignItems: 'center',
            marginLeft:55,
            width: '70%',
            margin: 35,
            color: 'grey',
            marginTop:'70%',
        },
        AddbuttonText: {
            color: 'grey',
            fontSize: 18,
        },
        sub:{
            fontSize:20,
            color:'white',
            alignItems:'center',
            marginLeft:50,
            marginTop:'50%',

        }
    }
);
export default CommunityTab