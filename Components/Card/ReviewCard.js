import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'

function ReviewCard(props)
{
    return(
 <View style={styles.Reviewcard}>
     <Text style={styles.re}>{props.review}</Text>
    </View>
    )
    
}
 
const styles=StyleSheet.create(
    {
        Reviewcard: {
     marginTop:50,
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
   re: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:'5%',
    color:"#6199F7",
  },
}
)

export default ReviewCard;