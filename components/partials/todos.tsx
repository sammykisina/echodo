import React from 'react';
import Todo from './todo';
import { Stagger } from '@animatereactnative/stagger';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { _todos, Todo as TodoType } from '@/utils/mock';
import { db } from '@/db/init';
import { todos } from '@/db/schema';
import dayjs from 'dayjs';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { between, eq } from 'drizzle-orm';
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutDown,
  LinearTransition,
} from 'react-native-reanimated';

export default function Todos({ day }: { day: string }) {
  /**
   * === STATES ===
   */
  const [localTodos, setLocalTodos] = React.useState<TodoType[]>(_todos);

  const { data: databaseTodo } = useLiveQuery(
    db
      .select()
      .from(todos)
      .where(
        between(
          todos.date,
          dayjs(day).startOf('day').toDate(),
          dayjs(day).endOf('day').toDate()
        )
      )
      .orderBy(todos.created_at)
  );

  return (
    <View>
      <Stagger
        className='gap-2 mb-4 mt-2'
        exitDirection={1}
        // enterDirection={-1}
        // entering={() => FadeInRight}
      >
        {databaseTodo?.map((todo, index) => (
          <Todo key={index.toString()} todo={todo} />
        ))}
      </Stagger>

      <Animated.View
        entering={FadeInDown.duration(400)}
        exiting={FadeOutDown.duration(400)}
        layout={LinearTransition.springify().damping(80).stiffness(200)}
      >
        <TextInput
          className='border border-black/30 rounded-md p-2'
          placeholder='Add todo'
        />

        <View className='flex justify-center items-center'>
          <TouchableOpacity
            className=' w-fit'
            onPress={() => {
              db.insert(todos)
                .values({
                  date: dayjs(day).toDate(),
                  content: `Todo ${databaseTodo?.length + 1}`,
                })
                .run();
            }}
          >
            <Text className='text-blue-500 font-barlow-900 text-lg w-fit'>
              ADD TODO
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
