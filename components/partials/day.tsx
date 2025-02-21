import { View, Text, useWindowDimensions } from 'react-native';
import React from 'react';
import { localFormatter, weekDayFormatter, weekDays } from '@/utils/constants';
import dayjs from 'dayjs';
import Todos from './todos';
import Accordion from '@animatereactnative/accordion';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Day({ day }: { day: string }) {
  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <Accordion.Accordion
      isOpen={dayjs(day).isSame(dayjs(), 'day')}
      style={{
        minHeight: (height - top - bottom) / weekDays.length,
      }}
      className='h-1/5 pt-4 pr-4 pl-12 border-t-2 border-black/10 gap-2'
    >
      <Accordion.Header>
        <Text className='text-4xl uppercase font-barlow-900'>
          {dayjs(day).format(weekDayFormatter)}
        </Text>
        <Text className='font-barlow-400 text-gray-600'>
          {dayjs(day).format(localFormatter)} - 14°C
        </Text>
      </Accordion.Header>

      <Accordion.Expanded>
        <Todos day={day} />
      </Accordion.Expanded>
    </Accordion.Accordion>
  );
}
