import React from 'react';
import Lottie from 'lottie-react-native';

export default function Animation() {
  return (
    <Lottie style={{marginTop:50,}} source={require('../../assets/Animation/90724-travel-world-usa.json')} autoPlay loop />
  );
}