import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'

function ViewCard(props)
{
    return(
 <View style={styles.viewcard}>
 <View style={styles.parent}>
 <Image source={props.img} style={styles.image}></Image>
     <Text style={styles.username}>{props.username}</Text>
     </View>
     <View style={styles.parent1}>
     <Text style={[styles.source]}>{props.source}</Text>
     <Text style={[styles.source]}>-----</Text>
     <Text style={styles.destination}>{props.destination}</Text>
     </View>
      <Text style={[styles.date]}>{props.date}</Text>
    </View>
    )
    
}
 
const styles=StyleSheet.create(
    {
        viewcard: {
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
  source:{
    paddingRight:15,
    fontSize: 16,
    color:"#6199F7",
  },
  destination:{
    paddingRight:15,
    fontSize: 16,
    color:"#6199F7",
  },
  date:{
    paddingRight:15,
    paddingTop:5,
    marginLeft:57,
    fontSize: 16,
    color:"#6199F7",
  },
   parent: {
    //flex: 1,
    flexDirection: "row",
    marginBottom:-10,
  },
   parent1: {
    //flex: 1,
    flexDirection:'row',
    marginLeft:57,
  },
}
)

export default ViewCard;