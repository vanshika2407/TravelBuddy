import React,{useState} from 'react'
import {View,Text,Image,StyleSheet,ScrollView,TouchableOpacity} from 'react-native'
import Logo from 'login/assets/TravelBuddy-blue.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
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
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo}/>
            <Text style={styles.title}>Add My Event</Text>
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
            width:'97%',
            height:81,
        },
         container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
   title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
 
  SignButton:{
  backgroundColor:'white',
  padding: 12,
  borderRadius: 4,
  alignItems: 'center',
  width: '80%',
  margin:15,
  },
 SignbuttonText: {
    color: 'grey',
    fontSize: 18,
  },
    }
);
export default AddCommunity;

