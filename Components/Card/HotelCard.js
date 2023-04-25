import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
function HotelCard(props)
{
    return(
<View style={styles.card}>
<Image source={props.imageSource} style={styles.image}></Image>
<View style={styles.parent}>
    <Text style={styles.title}>{props.title}</Text>
     {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity> */}
        </View>
    <Text style={styles.budget}>{props.budget}</Text>
    {/* <Text style={styles.date}>{props.date}</Text> */}
</View>
    )
    
}
 
const styles=StyleSheet.create(
    {
      
        // card:{
        //     width:200,
        //     height:200,
        //     backgroundColor:'grey',
        //     alignItems:'center',
        //     justifyContent:'center',
        //     margin:'50%',
            
        // },
        card: {
     marginTop:50,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding:15,
    //marginVertical: 8,
    marginHorizontal: 45,
    shadowColor: '#000',
    height:260,
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
    width:'100%',
    height: '70%',
    borderRadius: 5,
    // marginBottom: 16,
    // justifyContent:'center',
    // alignItems:'center',
    // paddingBottom:'50%',
    // marginLeft:'30%',
    resizeMode:'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop:5,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:'5%',
    color:"#2980B9",
  },
  budget: {
    fontSize: 16,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:'5%',
    paddingTop:-10,
    color:"#2980B9",
  },
  date:{
    paddingTop:25,
    paddingLeft:'5%',
    color:"#6199F7A6",
  },
   button:{
    backgroundColor: '#2196F3',
    //borderColor:'#64F761',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    width:40,
    height:25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
   paddingLeft:2,
  },
  container: {
    flex: 1,
  },
  parent: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

    }
)
export default HotelCard;