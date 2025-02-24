import React, { useRef } from 'react';
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
  FadeOutDown,
  LinearTransition,
} from 'react-native-reanimated';

export default function Todos({ day }: { day: string }) {
  /**
   * === STATES ===
   */
  const [content, setContent] = React.useState('');
  const inputRef = useRef<TextInput>(null);
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

  /**
   * === FUNCTIONS ===
   */

  /**
   * ADD TODO
   */
  const addTodo = () => {
    inputRef.current?.clear();
    inputRef.current?.blur();

    db.insert(todos)
      .values({
        date: dayjs(day).toDate(),
        content: content,
      })
      .run();

    setContent('');
  };

  /**
   * CHECK IF ADD BTN IS DISABLED
   */
  const isDisabled = !content || content === '';

  return (
    <View>
      <Stagger className='gap-2 mb-4 mt-2' exitDirection={1}>
        {databaseTodo?.map((todo, index) => (
          <Todo key={index.toString()} todo={todo} />
        ))}
      </Stagger>

      <Animated.View
        entering={FadeInDown.duration(400).delay(100)}
        exiting={FadeOutDown.duration(400).delay(100)}
        layout={LinearTransition.duration(400)}
      >
        <TextInput
          ref={inputRef}
          className='border-b border-black/30 rounded-md p-2'
          placeholder='Add todo'
          defaultValue={content}
          onChangeText={(text) => setContent(text.trim())}
          onSubmitEditing={() => {
            if (!isDisabled) {
              addTodo();
            }
          }}
          submitBehavior='blurAndSubmit'
        />

        <View className='flex justify-center items-center'>
          <TouchableOpacity
            disabled={isDisabled}
            className=' w-fit'
            onPress={addTodo}
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
