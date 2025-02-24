import { View, Text } from 'react-native';
import React from 'react';
import type { Todo } from '@/utils/mock';
import { Check } from 'lucide-react-native';
import { todos } from '@/db/schema';
import { db } from '@/db/init';
import { eq } from 'drizzle-orm';

export default function Todo({ todo }: { todo: typeof todos.$inferSelect }) {
  return (
    <View
      className='flex-row gap-2 items-center'
      onTouchStart={() => {
        db.update(todos)
          .set({ done: Boolean(todo.done) ? 0 : 1 })
          .where(eq(todos.id, todo.id))
          .execute();
      }}
    >
      <View
        className={`w-4 h-4 rounded-sm border items-center justify-center  ${
          Boolean(todo?.done)
            ? 'bg-selected border-selected'
            : 'bg-transparent border-black'
        }`}
      >
        {Boolean(todo?.done) && (
          <Check absoluteStrokeWidth size={10} className=' stroke-white  ' />
        )}
      </View>

      <Text
        className={`font-barlow-400 capitalize ${
          Boolean(todo?.done) ? 'line-through decoration-selected ' : ''
        }`}
      >
        {todo.content}
      </Text>
    </View>
  );
}
