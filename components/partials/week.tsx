import { ScrollView, View } from 'react-native';
import React from 'react';
import { weekDays } from '@/utils/constants';
import Day from './day';

export default function Week() {
  return (
    <ScrollView>
      <View>
        {weekDays?.map((day) => (
          <Day day={day} key={`day-${day}`} />
        ))}
      </View>
    </ScrollView>
  );
}
