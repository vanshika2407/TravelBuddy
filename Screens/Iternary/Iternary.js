import { View, Text, StyleSheet, StatusBar, Button, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import IternaryCard from '../../Components/Card/IternaryCard'
import axios from 'axios'
import { BASE_URL } from '../../Api/BaseUrl'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import AnimationItenary from '../Animation/AnimationItenary'
import {LinearGradient} from 'expo-linear-gradient';
import ReviewPop from '../../Components/PopUp/ReviewsPop'

export default function Iternary(props) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pop,setPop]=React.useState(false)
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
    const handlePop=()=>{
        setPop(true)
    }
    return (
        <>
        {!pop &&
        <>
        <ScrollView style={styles.scrollContainer}>

            <View style={styles.container}>
             <LinearGradient style={styles.bb} colors={['#2980B9', '#6DD5FA', '#FFFFFF']}>
                <Text style={{ textAlign: "center", marginTop: 20, fontSize: 25, color: "white" }}>Plan Your Trip!</Text>
                {/* <Button title="Generate" onPress={generateIternary} style={{ width: 40 }} /> */}
                <AnimationItenary></AnimationItenary>
                <TouchableOpacity style={styles.button} onPress={generateIternary}>
                <Text style={styles.buttonText}>Generate Your Itenary</Text>
                </TouchableOpacity>
                {!loading && data.length > 0 && data.map((item, index) => {
                    if (item === "") {
                        return null
                    }
                    return (
                        <View>
                            <IternaryCard text={item} />
                            <TouchableOpacity  onPress={handlePop}>
                            <Text>Check Reviews</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                )}
                {/* {!loading && data && <IternaryCard text={data} />} */}
                {loading && <ActivityIndicator style={{marginTop: 10}} animating={true} color={MD2Colors.white} />}
                </LinearGradient>
            </View>
        </ScrollView>
        </>
        }
        {
        pop &&
        <ReviewPop />
        }
       </>
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
     bb: {
        flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: '#6199F7',
            height: '100%',
            width: '100%',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
         height: '100%',
         width: '100%',

    },
    button:{
        flex:1,
      backgroundColor:'#2980B9',
      borderRadius:4,
      alignItems:'center',
      justifyContent:'center',
      marginTop:'40%',
      width:200,
      height:45,
      borderColor:'white',
      borderWidth:2,
    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
    }
});