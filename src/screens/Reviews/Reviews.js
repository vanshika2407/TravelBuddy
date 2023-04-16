import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import ReviewCard from '../../components/Card/ReviewCard'
import {LinearGradient} from 'expo-linear-gradient';

const reviews=[
    {
        review:"Good",
    },
    {
        review:"Bad",
    },
    {
        review:"Okay",
    },
    {
      review:'Cool',
    },
]
const Reviews=()=>
{
    const writeReview=reviews.map(re=>{
        return(
            <ReviewCard
            review={re.review}></ReviewCard>
        )
    })
    return(
        <ScrollView style={styles.container}>
        <LinearGradient colors={['#221e59', '#4747cd', '#192f6a']}>
<View style={styles.container}>
    <Text style={styles.title}>Reviews</Text>
    <View style={styles.parent}>
        <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>City</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button,styles.buttonPlace]}>
        <Text style={styles.buttonText}>Place</Text>
      </TouchableOpacity>
    </View>
    {writeReview}
</View>
</LinearGradient>
</ScrollView>
    )
}
const styles=StyleSheet.create(
    {
       bb:{
       backgroundColor:'#6199F7',
       },
        container:{
         //backgroundColor:'#6199F7',
         flex:1,
        },
         title:{
         alignItems:'center',
         justifyContent:'center',
         fontSize:30,
         fontWeight:'bold',
         marginTop:50,
         marginLeft:'37%',
         //color:'#2196F3',
         color:'white',
        },
         button: {
    //backgroundColor: '#0066cc',
    padding:2,
    borderRadius:20,
    alignItems: 'center',
    width:70,
    margin:50,
    borderColor:'white',
    borderWidth:2,
    //height:4,
  },
  buttonText: {
    color: '#fff',
    fontSize:18,
  },
  buttonPlace:{
    marginLeft:-10,
  },
  parent: {
    //flex: 1,
    flexDirection: "row",
  },
    }

)
export default Reviews;