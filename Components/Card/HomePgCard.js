import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

function HomeCard(props) {
    // console.log(props.image)
    return (
        <View style={styles.bb}>
        <View style={styles.parent} >
            <Image source={{ uri:  props.image }} style={styles.image}></Image>
            <View>
                <Text style={styles.username}>Hello {props.username} ,</Text>
            </View>
        </View>
        </View>
    )

}

const styles = StyleSheet.create(
    {
        image: {
            borderRadius: 10,
            width: 80,
            height: 80,
            borderRadius:80/2,
            marginLeft: 0,
            //marginTop: '20%',
        },
        username: {
            //width:'100%',
            fontSize:40,
            fontWeight: 'bold',
            marginBottom: 4,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '10%',
            paddingTop: 10
            ,//color:"#6199F7",
            color: 'white',
            
        },

        parent: {
            //flex: 1,
            flexDirection: "row",
            marginBottom:0,
            marginTop:'15%',
            marginLeft:15,
            
        },
        bb:{
       height:'100%',
        }
    }
)

export default HomeCard;