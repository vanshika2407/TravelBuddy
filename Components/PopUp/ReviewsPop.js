import React from 'react'
import {View,Text,Modal,StyleSheet, TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-paper'
import Unorderedlist from 'react-native-unordered-list';
import { useNavigation } from '@react-navigation/native';
const ReviewPop=()=>{
    const [place,setPlace]=React.useState('')
    const [show,setShow]=React.useState(false)
     const navigation=useNavigation();
    const handleCheck=()=>
    {
        setShow(true)
    }
    const handleBack=()=>{
    navigation.navigate('HomeScreen');
    }
    return(
        <>
       { !show &&
        <>
    <View>
    <Modal 
    transparent={true}
    visible={true}
    >
    <View  style={styles.container}>
        <View style={styles.container2}>
        <Text style={styles.Text}>Reviews</Text>
          <TextInput 
          value={place}
          label={"Enter A Place"} 
          onChangeText={setPlace}
          style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleCheck}>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        </View>
    </View>

    </Modal>
    </View>
    </>
       }
    {
     show &&
      <View>
    <Modal 
    transparent={true}
    visible={true}
    >
    <View  style={styles.container}>
        <View style={styles.container2}>
        <Text style={styles.Text}>Reviews</Text>
         <Unorderedlist>
            <Text>Good</Text>
            <Text>Okay</Text>
            <Text>Bad</Text>
         </Unorderedlist>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
    </View>

    </Modal>
    </View>
    }
    </>
    )
}
const styles=StyleSheet.create(
    {
        container:{
            backgroundColor:"#000000aa",
            flex:1,
        },
        container2:{
            backgroundColor:"#ffffffff",
            margin:50,
            borderRadius:10,
            marginTop:'70%',
            //flex:1,
        },
        Text:{
            marginTop:10,
         fontSize:25,
         color:'#2980B9',
         textAlign:'center',
         fontWeight:'bold',
        },
        input: {
        marginTop:10,
        width: 200,
        marginLeft:30,
        //padding: 5,
        backgroundColor:'#00000000',
    },
     button: {
        marginTop: 15,
          backgroundColor: '#2980B9',
        color: '#6199F7',
        borderRadius:4,
        width:55,
        height:25,
        marginBottom:5,
        marginLeft:100,
         borderRadius:4,
        borderWidth:2,
        borderColor:'white',
    },
    buttonText:{
        color:'white',
        textAlign:'center',
        marginTop:2,
    }
    }
)
export default ReviewPop