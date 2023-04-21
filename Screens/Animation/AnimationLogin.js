import React from 'react';
import Lottie from 'lottie-react-native';

export default function AnimationLogin() {
  return (
    <Lottie style={{height:170,marginTop:20,}}source={require('../../assets/Animation/82445-travelers-walking-using-travelrmap-application.json')} autoPlay loop />
  );
}