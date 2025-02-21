import { View, Text } from 'react-native';
import React from 'react';
import { localFormatter, weekDayFormatter, weekDays } from '@/utils/constants';
import dayjs from 'dayjs';
import Todos from './todos';

export default function Day({ day }: { day: string }) {
  return (
    <View
      style={{
        minHeight: `${100 / weekDays.length}%`,
      }}
      className='h-1/5 p-4 pl-12 border-t-4 border-black/10 gap-2'
    >
      <View>
        <Text className='text-2xl uppercase font-barlow-900'>
          {dayjs(day).format(weekDayFormatter)}
        </Text>
        <Text className='font-barlow-400 text-gray-600'>
          {dayjs(day).format(localFormatter)} - 14°C
        </Text>
      </View>

      <Todos day={day} />
    </View>
  );
}
