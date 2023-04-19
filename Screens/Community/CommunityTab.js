import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Button } from 'react-native'
import Logo from '../../assets/favicon.png';
import { FAB } from 'react-native-paper';
import Card from '../../Components/Card/Card'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../Api/BaseUrl';

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
        <ScrollView style={{ backgroundColor: "#6199F7", flex: 1 }}>
            <View style={styles.container}>
                {data.length > 0 ? details : <Text>No Communities nearby</Text>}
                <Button title="Add event"  onPress={OnAddEvent} />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        title: {
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 50,
            marginLeft: '24%',
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
            marginTop: 10,
            flex: 1,
            //backgroundColor:'#79c2d0',
            // backgroundColor: '#6199F7',
            // height: 800,
            marginTop: 50,
        },
        AddButton: {
            backgroundColor: 'white',
            padding: 12,
            borderRadius: 4,
            alignItems: 'center',
            width: '80%',
            margin: 35,
            color: 'grey',
        },
        AddbuttonText: {
            color: 'grey',
            fontSize: 18,
        },
    }
);
export default CommunityTab