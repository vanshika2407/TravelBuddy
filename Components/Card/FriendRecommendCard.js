import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { BASE_URL } from '../../Api/BaseUrl';

function FriendRecommendCard(props) {
    const icon = <FontAwesome5 name={'check'} color="green" />;
    const icon1 = <FontAwesome5 name={'times'} color="red" />;
    const [request, setRequest] = useState(false)
    const sendRequest = () => {
        axios.post(`${BASE_URL}/friend_req_send`, { to: props.toEmail, from: props.fromEmail })
            .then(res => {
                console.log(res.data)
                setRequest(true)
            })
            .catch(error => console.log(error))  
    }
    // console.log(props.image)
    return (
        <View style={styles.friendcard}>
            <View style={styles.parent}>
                <Image source={{ uri: props.image }} style={styles.image}></Image>
                <View style={[styles.line, styles.parent]}>
                    <Text style={styles.username}>{props.username}</Text>
                    {/* <FaCheck /> */}
                    <View style={[styles.icon, styles.parent]}>
                        <Button disabled={request ? true : false} title={request ? "sent" : "send"} onPress={sendRequest} />
                    </View>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create(
    {
        friendcard: {
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
            borderRadius: 5,
            marginTop: 20,
            height: 40,
            width: 40,
        },
        username: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 4,
            alignItems: 'center',
            justifyContent: 'center',
            // paddingLeft:'5%',
            color: "#6199F7",
        },

        parent: {
            //flex: 1,
            flexDirection: "row",
            marginBottom: -10,
        },
        icon: {
            marginLeft: 40,
            marginTop: 5,
            color: 'green',
        },
        icon1: {
            marginLeft: "35%",
        },
        line: {
            marginTop: 30,
            marginLeft: 20,
        }
    }
)

export default FriendRecommendCard;