import React from 'react'
import {View,Text,StyleSheet,Pressable} from 'react-native'
const CustomButton=({onPress,text})=>
{
    return(
        <Pressable 
        onPress={onPress}
        style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );
};
const styles=StyleSheet.create(
    {
      
       button: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    width: '30%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
    }
);
export default CustomButton;