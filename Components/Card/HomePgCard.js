import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

function HomeCard(props) {
    // console.log(props.image)
    return (
        <View >
            <Image source={{ uri:  props.image }} style={styles.image}></Image>
            <View>
                <Text style={styles.username}>Hello {props.username} ,</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create(
    {
        Homecard: {
            marginTop: 30,
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 15,
            //marginVertical: 8,
            marginHorizontal: 45,
            shadowColor: '#000',
            height: 110,
            width: '75%',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        image: {
            borderRadius: 10,
            width: '50%',
            height: 200,
            marginLeft: '25%',
            marginTop: '20%',
        },
        username: {
            fontSize: 50,
            fontWeight: 'bold',
            marginBottom: 4,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '10%',
            paddingTop: 25
            ,//color:"#6199F7",
            color: 'white',
        },

        parent: {
            //flex: 1,
            flexDirection: "row",
            marginBottom: -10,
        },
    }
)

export default HomeCard;