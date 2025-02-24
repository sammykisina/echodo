import React, { useRef } from 'react';
import Todo from './todo';
import { Stagger } from '@animatereactnative/stagger';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
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
import { Plus } from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
    <Animated.View className='gap-2 flex flex-col'>
      <Stagger className='gap-2 mb-4 mt-2' exitDirection={1}>
        {databaseTodo?.map((todo, index) => (
          <Todo key={index.toString()} todo={todo} />
        ))}
      </Stagger>

      <Animated.View
        entering={FadeInDown.duration(400).delay(100)}
        exiting={FadeOutDown.duration(400).delay(100)}
        layout={LinearTransition.duration(400)}
        className='flex flex-row gap-2 mb-4 items-end'
      >
        <TextInput
          ref={inputRef}
          className='border-b border-black/50 rounded-md p-2 flex-1 font-barlow-500'
          placeholder='Add todo'
          defaultValue={content}
          multiline
          onChangeText={(text) => setContent(text.trim())}
        />

        <AnimatedPressable
          disabled={isDisabled}
          onPress={addTodo}
          layout={LinearTransition}
          style={{ opacity: isDisabled ? 0.5 : 1 }}
        >
          <View className='bg-black/50  rounded-lg flex flex-row gap-1  justify-center items-center px-2 py-1'>
            <Plus size={14} className='stroke-white ' />
            <Text className='font-barlow-500 color-white  uppercase '>Add</Text>
          </View>
        </AnimatedPressable>
      </Animated.View>
    </Animated.View>
  );
}
