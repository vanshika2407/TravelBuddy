import React from 'react'
import {View,Text,StyleSheet, ScrollView,TouchableOpacity,SafeAreaView} from 'react-native'
import Logo from 'login/assets/favicon.png';
import Card from '../../components/Card/Card'
import { useNavigation } from '@react-navigation/native';
const Info=[
    {
imageSource:Logo,
title:"Hello",
description:"Good Event",
date:"26th Jan,2023",
key:1,
    },
    {
imageSource:Logo,
title:"Hel",
description:"Have a Good Day!",
date:"2nd Feb,2023",
key:2,
    },
    {
imageSource:Logo,
title:"Heyyy",
description:"Good Night!",
date:"15th April,202",
key:3,
    }

]
function CommunityTab()
{
    const navigation=useNavigation();
   const  OnAddEvent=()=>
   {
 navigation.navigate('AddCommunity');
   };
    const details=Info.map(detail=>{
return(
        <View>
<Card
key={detail.key}
imageSource={detail.imageSource}
title={detail.title}
description={detail.description}
date={detail.date}
/>
</View>

)
    })
    
    return(
        <ScrollView>
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Community Tab</Text>
            {details}
             <TouchableOpacity style={styles.AddButton} onPress={OnAddEvent} >
        <Text style={styles.AddbuttonText}>Add Trips</Text>
      </TouchableOpacity>
        </SafeAreaView>
        </ScrollView>
    )
}

const styles=StyleSheet.create(
    {
        title:{
         alignItems:'center',
         justifyContent:'center',
         fontSize:30,
         fontWeight:'bold',
         marginTop:50,
         marginLeft:'24%',
         //color:'#2196F3',
         color:'white',
        },
        container:{
            marginTop:10,
            //backgroundColor:'#79c2d0',
            backgroundColor:'#6199F7',
        },
        AddButton:{
  backgroundColor:'white',
  padding: 12,
  borderRadius: 4,
  alignItems: 'center',
  width: '80%',
  margin:35,
  },
 AddbuttonText: {
    color: 'grey',
    fontSize: 18,
  },
    }
);
export default CommunityTab