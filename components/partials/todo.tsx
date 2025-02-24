import { View, Text } from 'react-native';
import React from 'react';
import type { Todo } from '@/utils/mock';
import { Check } from 'lucide-react-native';

export default function Todo({ todo }: { todo: Todo }) {
  return (
    <View className='flex-row gap-2 items-center pl-12'>
      <View
        className={`w-4 h-4 rounded-sm border items-center justify-center  ${
          todo?.done
            ? 'bg-selected border-selected'
            : 'bg-transparent border-black'
        }`}
      >
        {todo?.done && (
          <Check absoluteStrokeWidth size={10} className=' stroke-white  ' />
        )}
      </View>

      <Text
        className={`font-barlow-400 ${
          todo.done ? 'line-through decoration-selected ' : ''
        }`}
      >
        {todo.content}
      </Text>
    </View>
  );
}
