import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import ViewCard from '../../components/Card/ViewCard'
import Logo from 'login/assets/favicon.png';


const view=[
    {
        img:Logo,
        username:'Vanshika',
        source:'Goa',
        destination:'Mumbai',
        date:'20th March, 2023',
    },
    {
        img:Logo,
        username:'Prathamesh',
        source:'Delhi',
        destination:'Kashmir',
        date:'12th April, 2023',
    },
    {
        img:Logo,
        username:'Devam',
        source:'Mumbai',
        destination:'Chennai',
        date:'5th January, 2023',
    },
     {
        img:Logo,
        username:'Devam',
        source:'Mumbai',
        destination:'Chennai',
        date:'5th January, 2023',
    },
]
const ViewTrips=()=>
{
    const views=view.map(vi=>{
        return(
            <ViewCard
           img={vi.img}
        username={vi.username}
        source={vi.source}
        destination={vi.destination}
        date={vi.date}>
           </ViewCard>
        )
    })
    return(
        <ScrollView style={styles.bb}>
<View style={styles.container}>
    <Text style={styles.title}>View People On</Text>
    <Text style={[styles.title,styles.titleS]}>Similar Trips</Text>
    <View style={styles.parent}>
        <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>filters</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button]}>
        <Text style={styles.buttonText}>icon</Text>
      </TouchableOpacity>
    </View>
    {views}
</View>
</ScrollView>
    )
}
const styles=StyleSheet.create(
    {
       bb:{
       backgroundColor:'#6199F7',
       },
        container:{
         backgroundColor:'#6199F7',
         flex:1,
        },
         title:{
         alignItems:'center',
         justifyContent:'center',
         fontSize:30,
         fontWeight:'bold',
         marginTop:50,
         marginLeft:'25%',
         //color:'#2196F3',
         color:'white',
        },
        titleS:{
            marginTop:0,
            marginLeft:'30%',
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
export default ViewTrips;