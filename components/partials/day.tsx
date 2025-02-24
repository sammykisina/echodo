import { View, Text, useWindowDimensions } from 'react-native';
import React from 'react';
import {
  localFormatter,
  weekDayColors,
  weekDayFormatter,
  weekDays,
} from '@/utils/constants';
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
        minHeight: (height - top - bottom) / 7,
      }}
      className='gap-2 pt-4 pr-4 border-t-2 border-black/5 bg-transparent '
    >
      <Accordion.Header>
        <View className='pl-12'>
          <Text className='text-4xl uppercase font-barlow-900'>
            {dayjs(day).format(weekDayFormatter)}
          </Text>

          <Accordion.Expanded>
            <Text className='font-barlow-400 text-gray-600'>
              {dayjs(day).format(localFormatter)} - 14°C
            </Text>
          </Accordion.Expanded>
        </View>
      </Accordion.Header>

      <Accordion.Expanded className='pl-12'>
        <Todos day={day} />
      </Accordion.Expanded>
    </Accordion.Accordion>
  );
}
