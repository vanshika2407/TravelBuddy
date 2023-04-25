import React from 'react'
import {View,Text,StyleSheet, ScrollView,TouchableOpacity,SafeAreaView} from 'react-native'
import Taj from '../../assets/images/Taj.jpg';
import HotelCard from '../../Components/Card/HotelCard'
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
const Info=[
    {
imageSource:Taj,
title:"Grand-Hyatt",
budget:"12k-15k",
// date:"26th Jan,2023",
key:1,
    },
    {
imageSource:Taj,
title:"Taj-Hotel",
budget:"12k-15k",
//date:"2nd Feb,2023",
key:2,
    },
    {
imageSource:Taj,
title:"Heyyy",
budget:"12k-15k",
//date:"15th April,202",
key:3,
    }

]
function Hotel()
{
    const navigation=useNavigation();
   const  OnAddEvent=()=>
   {
 navigation.navigate('AddCommunity');
   };
    const details=Info.map(detail=>{
return(
        <View>
<HotelCard
key={detail.key}
imageSource={detail.imageSource}
title={detail.title}
budget={detail.budget}
// date={detail.date}
/>
</View>

)
    })
    
    return(
        <ScrollView>
        <SafeAreaView >
        <LinearGradient colors={['#2980B9', '#6DD5FA', '#FFFFFF']}>
        <Text style={styles.title}>Hotel Recommendations</Text>
            {details}
             <TouchableOpacity style={styles.AddButton} onPress={OnAddEvent} >
        <Text style={styles.AddbuttonText}>Check Hotels</Text>
      </TouchableOpacity>
      </LinearGradient>
        </SafeAreaView>
        </ScrollView>
    )
}

const styles=StyleSheet.create(
    {
        title:{
         alignItems:'center',
         fontSize:30,
         fontWeight:'bold',
         marginTop:50,
         marginLeft:40,
         //color:'#2196F3',
         color:'white',
        },
        container:{
            marginTop:10,
            //backgroundColor:'#79c2d0',
            backgroundColor:'#6199F7',
        },
        AddButton:{
  backgroundColor: '#2980B9',
  padding: 12,
  borderRadius: 4,
  alignItems: 'center',
  width: '80%',
  margin:35,
   borderColor:'white',
            borderWidth:2,
  },
 AddbuttonText: {
    color: 'white',
    fontSize: 18,
  },
    }
);
export default Hotel