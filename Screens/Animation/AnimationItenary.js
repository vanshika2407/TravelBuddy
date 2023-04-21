import React from 'react';
import Lottie from 'lottie-react-native';

export default function AnimationItenary() {
  return (
    <Lottie  style={{width:'30%', height:200,marginTop:10}} source={require('../../assets/Animation/42070-travel-is-fun.json')} autoPlay loop />
  );
}