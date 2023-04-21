import React from 'react';
import Lottie from 'lottie-react-native';

export default function AnimationSignUp() {
  return (
    <Lottie style={{height:175,marginTop:20}} source={require('../../assets/Animation/78126-secure-login.json')} autoPlay loop />
  );
}