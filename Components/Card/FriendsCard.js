import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'

function FriendsCard(props)
{
    return(
 <View style={styles.friendcard}>
 <View >
<Image source={props.img} style={styles.image}></Image>
     <Text style={styles.username}>{props.username}</Text>
     </View>
    </View>
    )
    
}
 
const styles=StyleSheet.create(
    {
        friendcard: {
     marginTop:30,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding:15,
    //marginVertical: 8,
    marginHorizontal: 45,
    shadowColor: '#000',
    height:110,
    width:'75%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
 image:{
borderRadius:5,
 },
   username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:'5%',
    color:"#6199F7",
  },

   parent: {
    //flex: 1,
    flexDirection: "row",
    marginBottom:-10,
  },
}
)

export default FriendsCard;