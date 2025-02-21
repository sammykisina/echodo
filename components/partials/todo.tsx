import { View, Text } from 'react-native';
import React from 'react';
import type { Todo } from '@/utils/mock';

export default function Todo({ todo }: { todo: Todo }) {
  return (
    <View className='flex-row  items-center gap-2'>
      <View
        className={`w-4 h-4 rounded-sm bg-selected border  ${
          todo?.done
            ? 'bg-selected border-selected'
            : 'bg-transparent border-black'
        }`}
      ></View>

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
