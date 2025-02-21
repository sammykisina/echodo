import { Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function NoiseBackground() {
  return (
    <LinearGradient
      colors={['#D7D7D7', '#ACACAC']}
      start={[0, 0]}
      end={[0, 1]}
      className='flex-1 absolute left-0 top-0 right-0 bottom-0'
    >
      <Image
        source={require('@/assets/todo_bg.png')}
        resizeMode='repeat'
        className='flex-1  absolute left-0 top-0 right-0 bottom-0 w-full h-full'
      />
    </LinearGradient>
  );
}
