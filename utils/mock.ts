export const _todos = [
  { content: 'Buy groceries', done: true, id: 1 },
  { content: 'Pay bills', done: false, id: 2 },
  { content: 'Read a book', done: false, id: 3 },
  { content: 'Go for a walk', done: false, id: 4 },
  { content: 'Watch a movie', done: false, id: 5 },
  { content: 'Cook dinner', done: false, id: 6 },
  { content: 'Do laundry', done: false, id: 7 },
  { content: 'Call mom', done: false, id: 8 },
  { content: 'Take a nap', done: false, id: 9 },
  { content: 'Clean the house', done: false, id: 10 },
] as const;

export type Todo = (typeof _todos)[number];
