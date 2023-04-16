import React,{useState} from 'react'
import {View,Text,Image,StyleSheet,ScrollView,TouchableOpacity} from 'react-native'
import Logo from 'login/assets/TravelBuddy-blue.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
function AddCommunity() {
    const [eventName, setEvent] = useState('');
    const [eventDes, setDes] = useState('');
    const [eventDate, setDate] = useState('');
    const navigation=useNavigation();

    const OnAddEvent = () => {
        console.warn("Event Added");
        //Validate User

       // navigation.navigate('Home');
    };
    return (
        // <ScrollView>
          <LinearGradient colors={['#221e59', '#4747cd', '#192f6a']} style={styles.container}>
        <View>
            <Image source={Logo} style={styles.logo}/>
            <Text style={styles.title}>Add My Event</Text>
            <View style={styles.input}>
            <CustomInput placeholder="Enter Event Name"
                value={eventName}
                setValue={setEvent}
                secureTextEntry={false} />
            <CustomInput placeholder="Write Description"
                value={eventDes}
                setValue={setDes}
                secureTextEntry={false} />
                <CustomInput placeholder="Enter Event Date"
                value={eventDate}
                setValue={setDate}
                secureTextEntry={false} />
            <CustomButton
                text="Add Event"
                onPress={OnAddEvent} />
                </View>
        </View>
        </LinearGradient>
        // </ScrollView>
    );
}

const styles=StyleSheet.create(
    {
        root:{
            alignItems:'center',
            padding:10,
             margin:250,
        },
        logo:{
            alignItems:'center',
            width:'70%',
            height:57,
            marginLeft:'16%',
        },
         container: {
    flex: 1,
   //alignItems: 'center',
    justifyContent: 'center',
  },
   title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 32,
    marginLeft:'25%',
    color:'white',
  },
  input:{
 //marginLeft:'27%',
 alignItems:'center',
  },
  AddButton:{
  backgroundColor:'white',
  padding: 12,
  borderRadius: 4,
  alignItems: 'center',
  width: 50,
  margin:15,
  },
 AddbuttonText: {
    color: 'grey',
    fontSize: 18,
  },
    }
);
export default AddCommunity;

