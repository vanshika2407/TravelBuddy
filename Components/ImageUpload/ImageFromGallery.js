import React from 'react'
import { Text, View, Button, Platform, TouchableOpacity,StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker';


export default function ImageFromGallery(props) {
  const [hasPermission, setHasPermission] = React.useState({
    camera: false,
    gallery: false
  });

  const uploadImage = () => {
    try {
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // base64: true,
        allowsEditing: true,
        aspect: props.aspect == 'square' ? [1, 1] : [4, 3],
        quality: 1,
      }).then((result) => {
        if (!result.canceled) {
          // console.log(result.assets[0].base64)
          // props.setImage(result.assets[0].uri)
          // props.setImageBase64(result.assets[0].base64)
          // console.log(result.assets)
          const ImageUri = result.path
          props.setImage(result.assets[0].uri)
        }
      })
    }
    catch (error) {
      console.log(error)
    }

  }

  const takeImage = () => {
    console.log("yes")
    try {
      ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: props.aspect == 'square' ? [1, 1] : [4, 3],
        quality: 1,
      }).then((result) => {
        if (!result.canceled) {
          const ImageUri = result.path
          props.setImage(result.assets[0].uri)
        }

      })
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={{ margin: 15}} >
      {/* <Button title='Upload image' onPress={uploadImage}
        style={{ marginBottom: 10,marginTop:15 }}
      /> */}
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.text} > Upload Image</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.button}  onPress={takeImage}>
        <Text style={styles.text}> Take Image</Text>
      </TouchableOpacity>
      {/* <Button title='Take image' onPress={takeImage}
      style={{ marginBottom: 10,marginTop:15 }}
      /> */}
   </View>
  )
}

const styles=StyleSheet.create(
  {
    button: {
      //flex:1,
        marginTop: 15,
        marginLeft:40,
        backgroundColor: '#2980B9',
        // color: '#6199F7',
        borderRadius:2,
        height:'17%',
        width:'70%',
        justifyContent:'center',
        alignItems:'center'

    },
    text:{
      color:'white',
      textAlign:'center',
      paddingTop:5,
    }
  }
)