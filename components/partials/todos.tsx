import React from 'react';
import Todo from './todo';
import { Stagger } from '@animatereactnative/stagger';
import { View, TouchableOpacity, Text } from 'react-native';
import { _todos, Todo as TodoType } from '@/utils/mock';
import { db } from '@/db/init';
import { todos } from '@/db/schema';
import dayjs from 'dayjs';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { between, eq } from 'drizzle-orm';

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
        className='gap-4 mb-4 mt-2'
        exitDirection={1}
        enterDirection={-1}
      >
        {databaseTodo?.map((todo, index) => (
          <Todo key={index.toString()} todo={todo} />
        ))}
      </Stagger>

      <View className='flex justify-center items-center'>
        <TouchableOpacity
          className=' w-fit'
          onPress={() => {
            db.insert(todos)
              .values({
                date: dayjs(day).toDate(),
                content: `Todo ${localTodos.length + 1}`,
              })
              .run();

            // setLocalTodos([
            //   ...localTodos,
            //   { id: localTodos.length + 1, content: 'New todo', done: false },
            // ]);
          }}
        >
          <Text className='text-blue-500 font-barlow-900 text-lg w-fit'>
            ADD TODO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
