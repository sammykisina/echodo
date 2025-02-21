import { View } from 'react-native';
import React from 'react';
import { weekDays } from '@/utils/constants';
import Day from './day';

export default function Week() {
  return (
    <View>
      {weekDays?.map((day) => (
        <Day day={day} key={`day-${day}`} />
      ))}
    </View>
  );
}
