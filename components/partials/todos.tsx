import React from 'react';
import Todo from './todo';
import { Stagger } from '@animatereactnative/stagger';
import { Button, View } from 'react-native';
import { _todos, Todo as TodoType } from '@/utils/mock';

export default function Todos({ day }: { day: string }) {
  /**
   * === STATES ===
   */
  const [todos, setTodos] = React.useState<TodoType[]>(_todos);

  return (
    <View>
      <Stagger
        className='gap-4 mb-4 mt-2'
        exitDirection={1}
        enterDirection={-1}
      >
        {todos.map((todo, index) => (
          <Todo key={index.toString()} todo={todo} />
        ))}
      </Stagger>

      <Button
        title='Add todo'
        onPress={() => {
          setTodos([
            ...todos,
            { id: todos.length + 1, content: 'New todo', done: false },
          ]);
        }}
      />
    </View>
  );
}
