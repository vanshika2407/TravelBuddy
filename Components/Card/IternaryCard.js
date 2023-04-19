import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

export default function IternaryCard(props) {
  return (
    <View style={styles.container}>
          <Text style={styles.text}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        padding: 10,
        // height: 100,
        backgroundColor: 'white',
        marginTop: StatusBar.currentHeight || 0,
        borderRadius: 5,
    },
    text: {
        color: '#6199F7',
        fontSize: 17,
    }
});