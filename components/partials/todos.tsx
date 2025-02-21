import React from 'react';
import { _todos } from '@/utils/mock';
import Todo from './todo';
import { Stagger } from '@animatereactnative/stagger';

export default function Todos({ day }: { day: string }) {
  return (
    <Stagger className='gap-2 mb-4 mt-2' exitDirection={1}>
      {_todos.map((todo, index) => (
        <Todo key={index.toString()} todo={todo} />
      ))}
    </Stagger>
  );
}
