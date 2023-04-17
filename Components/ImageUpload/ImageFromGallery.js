import React from 'react'
import { Text, View, Button, Platform } from 'react-native'
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
    <View style={{ margin: 10 }} >
      <Button title='Upload image' onPress={uploadImage}
        style={{ marginBottom: 10 }}
      />
      <Button title='Take image' onPress={takeImage}
      />
    </View >
  )
}
