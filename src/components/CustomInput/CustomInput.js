import React from 'react'
import {View,Text,TextInput,StyleSheet}from 'react-native'
const CustomInput=({value,setValue,placeholder,secureTextEntry})=>
{
    return( 
        <View style={styles.container}>
            <TextInput 
            value={value}
            placeholder={placeholder}
            onChangeText={setValue}
            secureTextEntry={secureTextEntry}>
            </TextInput>
        </View>
    );
};

const styles=StyleSheet.create(
    {
        container:{
            backgroundColor:'white',
            width:'60%',
            borderColor:'#e8e8e8',
            borderWidth:1,
            borderRadius:5,
            paddingHorizontal:5,
            marginVertical:10,
            alignItems:'center',
        },
        // input:{
        //     width:50,
        // },
    }
)
export default CustomInput;