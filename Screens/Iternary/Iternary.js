import { View, Text, StyleSheet, StatusBar, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import IternaryCard from '../../Components/Card/IternaryCard'
import axios from 'axios'
import { BASE_URL } from '../../Api/BaseUrl'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function Iternary(props) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    // console.log(props)
    const generateIternary = () => {
        setLoading(true)
        axios.post(`${BASE_URL}/get-iternary`, {
            arrivalDate: props.trip.arrivalDate,
            departureDate: props.trip.departureDate,
            place: props.trip.destination.place,
            interests: props.trip.interests
        })
            .then(res => {
                // console.log(res.data)
                setData(res.data.result.split("\n"))
                setLoading(false)
            })
            .catch(err => console.log(err)
            )
    }
    return (
        <ScrollView style={styles.scrollContainer}>

            <View style={styles.container}>
                <Text style={{ textAlign: "center", marginTop: 10, fontSize: 25, color: "white" }}>Iternary</Text>
                <Button title="Generate" onPress={generateIternary} style={{ width: 40 }} />
                {!loading && data.length > 0 && data.map((item, index) => {
                    if (item === "") {
                        return null
                    }
                    return (
                        <View>
                            <IternaryCard text={item} />
                        </View>
                    )
                }
                )}
                {/* {!loading && data && <IternaryCard text={data} />} */}
                {loading && <ActivityIndicator style={{marginTop: 10}} animating={true} color={MD2Colors.white} />}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#6199F7',
        marginTop: StatusBar.currentHeight || 0,
        paddingBottom: 20
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#6199F7',

    }
});